// Contact API validation. No test sends a fully valid message, so nothing is ever emailed,
// even when real email credentials are configured.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { postContact } from './helpers.mjs';

const MESSAGE = 'Hello, I would like to discuss a front-end project with you soon.';

const expectRejected = async (body, ip, error) => {
  const res = await postContact(body, ip);
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.success, false);
  if (error) assert.equal(data.error, error);
  return data;
};

test('rejects a body that is not JSON', async () => {
  await expectRejected('not json', '10.10.0.1', 'Invalid JSON request body');
});

test('rejects missing fields', async () => {
  await expectRejected({ name: 'Ali', email: '', message: MESSAGE }, '10.10.0.2', 'All fields are required');
});

test('rejects non-string fields instead of failing with a server error', async () => {
  await expectRejected({ name: 123, email: 'visitor@gmail.com', message: MESSAGE }, '10.10.0.3', 'All fields are required');
});

test('rejects an invalid email address', async () => {
  await expectRejected({ name: 'Ali', email: 'not-an-email', message: MESSAGE }, '10.10.0.4', 'Invalid email format');
});

test('rejects disposable email domains', async () => {
  await expectRejected({ name: 'Ali', email: 'a@mailinator.com', message: MESSAGE }, '10.10.0.5', 'Disposable emails are not allowed');
});

test('rejects fields over the length limits', async () => {
  await expectRejected(
    { name: 'Ali', email: 'visitor@gmail.com', message: 'word '.repeat(1100) },
    '10.10.0.6',
    'One or more fields are too long',
  );
});

test('rejects names without letters', async () => {
  await expectRejected({ name: '12345', email: 'visitor@gmail.com', message: MESSAGE }, '10.10.0.7', 'Name must contain at least one letter');
});

test('accepts Arabic names (fails later, on the short message, not on the name)', async () => {
  await expectRejected(
    { name: 'محمد فايز', email: 'visitor@gmail.com', message: 'Short note' },
    '10.10.0.8',
    'Please enter a meaningful message (at least 30 characters)',
  );
});

test('rate-limits repeated requests from one IP', async () => {
  const ip = '10.10.0.9';
  const statuses = [];
  for (let i = 0; i < 6; i++) {
    const res = await postContact({ name: 'Ali', email: 'bad', message: MESSAGE }, ip);
    statuses.push(res.status);
  }
  assert.deepEqual(statuses, [400, 400, 400, 400, 400, 429]);
});
