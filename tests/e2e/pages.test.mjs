import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS, getPage } from './helpers.mjs';

test('home page renders with the portfolio owner identity', async () => {
  const { res, html } = await getPage('/');
  assert.equal(res.status, 200);
  assert.match(html, /<title>Mohamed Fayez - Front-End Developer<\/title>/);
  assert.match(html, /aria-label="Mohamed Fayez"/);
});

test('home page lists every project with a link to its detail page', async () => {
  const { html } = await getPage('/');
  for (const p of PROJECTS) {
    assert.ok(html.includes(`href="/projects/${p.slug}"`), `missing link to ${p.slug}`);
    assert.ok(html.includes(p.title), `missing title ${p.title}`);
  }
});

for (const p of PROJECTS) {
  test(`project page /projects/${p.slug} shows the right title and links`, async () => {
    const { res, html } = await getPage(`/projects/${p.slug}`);
    assert.equal(res.status, 200);
    assert.ok(html.includes(`aria-label="${p.title}"`), 'h1 should carry the project title');
    assert.match(html, new RegExp(`<title>${p.title} \\| Mohamed Fayez</title>`));
    assert.ok(html.includes(`href="${p.github}"`), 'GitHub link');

    const externalLinks = [...html.matchAll(/<a[^>]*href="(https?:\/\/[^"]+)"[^>]*target="_blank"/g)].map((m) => m[1]);
    if (p.liveUrl) {
      assert.ok(externalLinks.includes(p.liveUrl), 'live demo link');
    } else {
      assert.deepEqual(
        externalLinks.filter((href) => href !== p.github),
        [],
        'a project without a demo must not render any other external link',
      );
      assert.doesNotMatch(html, /\.apk\b/i, 'no APK download link');
    }
    for (const [, rel] of html.matchAll(/<a[^>]*target="_blank"[^>]*rel="([^"]+)"/g)) {
      assert.match(rel, /noopener/, 'external links use rel="noopener"');
    }
  });
}

test('unknown project slugs render the not-found page', async () => {
  const { html } = await getPage('/projects/does-not-exist');
  assert.match(html, /This page could not be found/);
  assert.match(html, /<meta name="robots" content="noindex"\/>/);
});

test('sitemap lists the home page and all project pages', async () => {
  const { res, html } = await getPage('/sitemap.xml');
  assert.equal(res.status, 200);
  for (const p of PROJECTS) {
    assert.match(html, new RegExp(`<loc>[^<]*/projects/${p.slug}</loc>`));
  }
});
