import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { site } from '@/lib/site';

interface ContactRequestBody {
  name?: string;
  email?: string;
  message?: string;
}

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

const ipCache = new Map<string, { count: number; expires: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (ipCache.size > 500) {
    for (const [key, val] of ipCache.entries()) {
      if (now > val.expires) {
        ipCache.delete(key);
      }
    }
  }
  const record = ipCache.get(ip);
  if (!record || now > record.expires) {
    ipCache.set(ip, { count: 1, expires: now + 15 * 60 * 1000 });
    return false;
  }
  if (record.count >= 5) {
    return true;
  }
  record.count += 1;
  return false;
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function cleanHeader(input: string): string {
  return input.replace(/[\r\n]/g, '').trim();
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many requests. Please try again later.',
      },
      { status: 429 }
    );
  }

  let name = '';
  let email = '';
  let message = '';

  try {
    const body = (await request.json()) as ContactRequestBody;
    // Ignore non-string values so they fail validation (400) instead of throwing later (500).
    name = typeof body?.name === 'string' ? body.name : '';
    email = typeof body?.email === 'string' ? body.email.trim() : '';
    message = typeof body?.message === 'string' ? body.message : '';
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid JSON request body',
      },
      {
        status: 400,
      },
    );
  }

  try {
    if (!name || !email || !message)
      return NextResponse.json(
        {
          success: false,
          error: 'All fields are required',
        },
        {
          status: 400,
        },
      );

    if (name.length > MAX_NAME_LENGTH || email.length > MAX_EMAIL_LENGTH || message.length > MAX_MESSAGE_LENGTH)
      return NextResponse.json(
        { success: false, error: 'One or more fields are too long' },
        { status: 400 }
      );

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
        },
        {
          status: 400,
        },
      );

    const disposableDomains = [
      'tempmail.com',
      'guerrillamail.com',
      '10minutemail.com',
      'mailinator.com',
      'yopmail.com',
      'throwaway.email',
      'fakeinbox.com',
      'maildrop.cc',
      'temp-mail.org',
      'getnada.com',
      'trashmail.com',
      'sharklasers.com',
      'grr.la',
      'mintemail.com',
      'test.com',
      'example.com',
      'fake.com',
      'spam4.me',
      'emailondeck.com',
    ];

    const parts = email.split('@');
    if (parts.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const domain = parts[1].toLowerCase();
    if (disposableDomains.includes(domain))
      return NextResponse.json(
        {
          success: false,
          error: 'Disposable emails are not allowed',
        },
        {
          status: 400,
        },
      );

    const username = parts[0];
    if (username.length < 1 || username.length > 64)
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
        },
        {
          status: 400,
        },
      );

    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }
    // Any script's letters count, so Arabic and other non-Latin names are accepted.
    if (!/\p{L}/u.test(trimmedName)) {
      return NextResponse.json(
        { success: false, error: 'Name must contain at least one letter' },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 30) {
      return NextResponse.json(
        { success: false, error: 'Please enter a meaningful message (at least 30 characters)' },
        { status: 400 }
      );
    }

    const escapedName = escapeHtml(trimmedName);
    const cleanReplyEmail = cleanHeader(email.trim());
    const escapedMessage = escapeHtml(trimmedMessage).replace(/\n/g, '<br>');
    const recipientEmail = process.env.CONTACT_EMAIL || site.email;

    const isDev = process.env.NODE_ENV === 'development';
    const saveLocally = () => {
      const timestamp = new Date().toLocaleString('en-US', { timeZone: site.timeZone });
      const logEntry = `\n======================================\nDate: ${timestamp} (${site.timeZone})\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n======================================\n`;
      fs.appendFileSync(path.join(process.cwd(), 'messages.txt'), logEntry, 'utf8');
    };

    if (!process.env.RESEND_API_KEY && !process.env.GMAIL_APP_PASSWORD) {
      if (isDev) {
        saveLocally();
        // Say so plainly: nothing was emailed, so the UI must not claim it was.
        return NextResponse.json({
          success: true,
          message:
            'Development mode: email is not configured, so the message was saved to messages.txt instead of being sent.',
        });
      }
      console.error('Contact form: neither RESEND_API_KEY nor GMAIL_APP_PASSWORD is set.');
      return NextResponse.json(
        { success: false, error: 'Server email configuration error.' },
        { status: 500 },
      );
    }

    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [recipientEmail],
          reply_to: cleanReplyEmail,
          subject: `New message from ${cleanHeader(trimmedName)}`,
          html: `<p><strong>Name:</strong> ${escapedName}</p><p><strong>Email:</strong> ${escapeHtml(cleanReplyEmail)}</p><p><strong>Message:</strong></p><p>${escapedMessage}</p>`,
        }),
      });

      if (resendRes.ok) {
        return NextResponse.json({
          success: true,
          message: 'Thank you! Your message has been sent successfully.',
        });
      }

      // Without a verified domain, Resend only delivers to the account owner's own address.
      console.error('Contact form: Resend rejected the message', resendRes.status, await resendRes.text());
      if (!process.env.GMAIL_APP_PASSWORD) {
        throw new Error(`Resend responded with HTTP ${resendRes.status}`);
      }
    }

    const cleanAppPassword = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: recipientEmail,
        pass: cleanAppPassword,
      },
      connectionTimeout: 4000,
      greetingTimeout: 4000,
      socketTimeout: 4000,
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${recipientEmail}>`,
      to: recipientEmail,
      replyTo: cleanReplyEmail,
      subject: `New message from ${cleanHeader(trimmedName)}`,
      html: `<p><strong>Name:</strong> ${escapedName}</p><p><strong>Email:</strong> ${escapeHtml(cleanReplyEmail)}</p><p><strong>Message:</strong></p><p>${escapedMessage}</p>`,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    });
  } catch (error: any) {
    console.error('Contact form delivery error:', error);

    let detail = '';
    if (process.env.NODE_ENV === 'development') {
      // Keep a copy so the message is not lost, but report the real failure instead of claiming success.
      try {
        const timestamp = new Date().toLocaleString('en-US', { timeZone: site.timeZone });
        const logEntry = `\n======================================\nDate: ${timestamp} (${site.timeZone})\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n======================================\n`;
        fs.appendFileSync(path.join(process.cwd(), 'messages.txt'), logEntry, 'utf8');
      } catch (fsError) {
        console.error('Failed to write message to fallback file:', fsError);
      }
      // e.g. EAUTH for a wrong Gmail app password; only shown in development.
      detail = ` (${error?.code ?? error?.responseCode ?? error?.message ?? 'unknown error'})`;
    }

    return NextResponse.json(
      {
        success: false,
        error: `Failed to send message. Please try again later.${detail}`,
      },
      {
        status: 500,
      },
    );
  }
}
