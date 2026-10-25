'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import ScrollWordReveal from '@/components/ui/ScrollWordReveal';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import Image from 'next/image';
import { site } from '@/lib/site';
import FlowField from '@/components/canvas/FlowField';

const CREDENTIALS: Array<{
  year?: string;
  title: string;
  organization: string;
  stat?: string;
  type: string;
}> = [
  {
    year: 'In progress',
    title: 'Computer Science Student',
    organization: 'Faculty of Computers and Information, Arish University',
    stat: "Bachelor's Degree in Computers and Information",
    type: 'Education',
  },
  {
    title: 'Front-End Development',
    organization: 'HTML5, CSS3, JavaScript (ES6+), React.js, Bootstrap, Tailwind CSS, jQuery',
    stat: 'Sinai Guide, Wesal & PlayStation Management System',
    type: 'Web',
  },
  {
    title: 'Mobile Development',
    organization: 'Dart & Flutter',
    stat: 'Personal Expense Tracker',
    type: 'Mobile',
  },
  {
    title: 'Independent Projects',
    organization: 'Four applications designed and built on my own',
    stat: 'Turning ideas into practical web and mobile products',
    type: 'Projects',
  },
];

const About = () => {
  const headingWords = [
    { t: 'WHO' },
    { t: 'am', serif: true },
    { t: 'i?' },
  ];
  const descriptionText =
    'I enjoy turning ideas into practical digital experiences, from interactive web applications to mobile products.';
  const aboutMeText = `I'm Mohamed Fayez, a Computer Science student at Arish University with a strong interest in front-end development and modern web technologies. I enjoy building responsive interfaces that combine visual quality, usability, and smooth interactions.\n\nMy development experience includes HTML, CSS, JavaScript, React, Bootstrap, and Tailwind CSS. My programming background also includes Python, C++, and object-oriented programming, and I work with Dart and Flutter to build mobile applications.\n\nThrough independent projects such as Sinai Guide, Wesal, PlayStation Management System, and Personal Expense Tracker, I keep strengthening my skills and turning ideas into practical applications. I'm eager to collaborate with other developers, learn from real-world challenges, and keep growing as a developer.`;

  const sectionRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.about-image-wrapper',
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: '.about-image-wrapper',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(
        '.about-label',
        { opacity: 0, letterSpacing: '0.45em' },
        {
          opacity: 1,
          letterSpacing: '0.3em',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-label',
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      const rows = gsap.utils.toArray<HTMLElement>('.cred-row');
      rows.forEach((row, i) => {
        const side = row.dataset.side === 'left' ? -1 : 1;
        const dot = row.querySelector('.timeline-dot');
        const connector = row.querySelector('.timeline-connector');
        const content = row.querySelector('.timeline-content');
        gsap.fromTo(
          row,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            delay: i * 0.07,
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              once: true,
            },
          },
        );
        if (content) {
          gsap.fromTo(
            content,
            { x: side * 42, y: 18 },
            {
              x: 0,
              y: 0,
              duration: 0.8,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 87%',
                once: true,
              },
            },
          );
        }
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.45,
              ease: 'back.out(2.5)',
              delay: 0.18,
              scrollTrigger: {
                trigger: row,
                start: 'top 87%',
                once: true,
              },
            },
          );
        }
        if (connector) {
          gsap.fromTo(
            connector,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.55,
              delay: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 87%',
                once: true,
              },
            },
          );
        }
      });

      gsap.fromTo(
        '.cred-section-label',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 92%',
            once: true,
          },
        },
      );

      const experienceWords = gsap.utils.toArray<HTMLElement>('.experience-word > span');
      if (experienceWords.length) {
        gsap.fromTo(
          experienceWords,
          { yPercent: 120, rotate: 3 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: tableRef.current,
              start: 'top 82%',
              once: true,
            },
          },
        );
      }

      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 75%',
            once: true,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <div className="bg-cream">
      <section
        ref={sectionRef}
        id="about"
        className="min-h-screen bg-ink text-light pt-24 pb-20 md:pt-32 md:pb-28 rounded-t-4xl overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="mb-10 md:mb-20">
            <AnimatedHeading
              words={headingWords}
              className="text-[clamp(2.5rem,7vw,6.5rem)] tracking-tight mb-4"
            />
            <ScrollWordReveal
              text={descriptionText}
              offset={['start 0.95', 'end 0.7']}
              className="text-base sm:text-lg md:text-xl text-gray-soft font-sans leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8 pb-16 md:pb-24 items-center">
            <div className="col-span-12 md:col-span-5 lg:col-span-5 flex items-center justify-center">
              <div className="about-image-wrapper relative group w-full max-w-[350px] md:max-w-[380px] h-[380px] md:h-[490px] bg-elevated-dark rounded-2xl overflow-hidden border border-border-subtle/50 shadow-2xl shadow-black/50">
                <Image
                  src="/me/me.jpeg"
                  alt={site.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 350px, 380px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Kinetic interactive flow lines overlay with screen blend */}
                <FlowField
                  overlay
                  className="opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                {/* Subtle bottom vignette to blend naturally into dark section aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent pointer-events-none" />
                {/* Glow border highlight on hover */}
                <div className="absolute inset-0 rounded-2xl border border-accent/0 group-hover:border-accent/40 transition-colors duration-500 pointer-events-none" />
              </div>
            </div>

            <div className="col-span-12 md:col-span-7 lg:col-span-6 md:col-start-6 lg:col-start-7 flex flex-col justify-center space-y-8">
              <span className="about-label font-mono text-sm sm:text-base md:text-base text-sand uppercase tracking-[0.3em] font-medium text-center md:text-left inline-block">
                (About Me)
              </span>
              <div className="space-y-6">
                {aboutMeText.split('\n\n').map((p, i) => (
                  <ScrollWordReveal
                    key={i}
                    text={p}
                    offset={['start 0.92', 'end 0.65']}
                    className="text-base sm:text-lg md:text-lg leading-relaxed font-sans"
                  />
                ))}
              </div>
            </div>
          </div>

          <div ref={tableRef} className="pt-12 md:pt-20 border-t border-white/10">
            <div className="mb-12 text-center md:mb-20">
              <span className="cred-section-label font-mono text-sm sm:text-base md:text-base text-sand uppercase tracking-[0.3em] font-medium inline-block opacity-0">
                (Background)
              </span>
              <h3 className="mt-5 font-display text-[clamp(2.5rem,7vw,6.5rem)] font-black uppercase tracking-tight leading-none text-light">
                <span className="experience-word inline-block overflow-hidden align-top"><span className="block">The</span></span>{' '}
                <span className="experience-word inline-block overflow-hidden align-top"><span className="serif-accent block normal-case tracking-[-0.05em] text-accent">path</span></span>{' '}
                <span className="experience-word inline-block overflow-hidden align-top"><span className="block">so far.</span></span>
              </h3>
            </div>

            <div className="relative mx-auto max-w-6xl">
              <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-white/15 md:hidden" />
              <svg aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 hidden h-full w-16 -translate-x-1/2 md:block" viewBox="0 0 64 1000" preserveAspectRatio="none">
                <path
                  ref={pathRef}
                  d="M32 0 C25 84 39 164 32 250 C25 334 39 416 32 500 C25 584 39 666 32 750 C25 834 39 916 32 1000"
                  fill="none"
                  stroke="rgba(232, 228, 222, 0.28)"
                  strokeWidth="1.5"
                />
              </svg>
              <div className="flex flex-col gap-12 md:gap-20">
                {CREDENTIALS.map((item, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <article key={item.title} data-side={isLeft ? 'left' : 'right'} className="cred-row relative grid grid-cols-[32px_1fr] gap-x-5 opacity-0 md:grid-cols-[1fr_96px_1fr] md:gap-x-0">
                      <div className="relative order-1 md:col-start-2 md:row-start-1 md:justify-self-center">
                        <span className="timeline-dot relative z-10 block h-[15px] w-[15px] rounded-full border-[3px] border-ink bg-cream" />
                        <span aria-hidden="true" className={`timeline-connector absolute top-[7px] hidden h-px w-14 bg-white/25 md:block ${isLeft ? 'right-full origin-right' : 'left-full origin-left'}`} />
                        {item.year && (
                          <span className={`absolute top-7 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-warm-light ${isLeft ? 'left-0 md:right-7 md:left-auto md:text-right' : 'left-0 md:left-7'}`}>
                            {item.year}
                          </span>
                        )}
                      </div>

                      <div className={`timeline-content order-2 pt-8 md:row-start-1 md:pt-0 ${isLeft ? 'md:col-start-1 md:pr-14 md:text-right' : 'md:col-start-3 md:pl-14'}`}>
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">{item.type}</span>
                        <h4 className="mt-4 font-display text-[clamp(2.15rem,4.4vw,4.5rem)] font-bold uppercase tracking-[-0.065em] leading-[0.86] text-cream">
                          {item.title}
                        </h4>
                        <div className={`mt-6 border-t border-white/10 pt-4 ${isLeft ? 'md:ml-auto md:max-w-md' : 'md:max-w-md'}`}>
                          <p className="font-mono text-xs leading-relaxed text-gray-soft">{item.organization}</p>
                          {item.stat && <p className="mt-3 font-sans text-sm leading-relaxed text-warm-light">{item.stat}</p>}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default About;
