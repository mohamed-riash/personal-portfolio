import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { BASE_URL, CV_PATH, PROJECTS, getPage, localAssetUrls } from './helpers.mjs';

test('CV button points to the PDF and the PDF downloads', async () => {
  const { html } = await getPage('/');
  assert.match(html, new RegExp(`href="${CV_PATH}"[^>]*download="Mohamed_Fayez_CV.pdf"|download="Mohamed_Fayez_CV.pdf"[^>]*href="${CV_PATH}"`));

  const res = await fetch(BASE_URL + CV_PATH);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('content-type'), 'application/pdf');
  const bytes = Buffer.from(await res.arrayBuffer());
  assert.equal(bytes.subarray(0, 5).toString('latin1'), '%PDF-');
  assert.ok(bytes.subarray(-32).toString('latin1').includes('%%EOF'), 'PDF is complete');
});

test('every image path in project data exists in public/', () => {
  const source = readFileSync(new URL('../../src/lib/projects.ts', import.meta.url), 'utf8');
  const paths = [...new Set([...source.matchAll(/'(\/Projects\/[^']+)'/g)].map((m) => m[1]))];
  assert.ok(paths.length >= PROJECTS.length, 'each project has at least one image');
  for (const p of paths) {
    assert.ok(existsSync(new URL(`../../public${p}`, import.meta.url)), `missing file public${p}`);
  }
});

const pages = ['/', ...PROJECTS.map((p) => `/projects/${p.slug}`)];
for (const pathname of pages) {
  test(`no broken images on ${pathname}`, async () => {
    const { html } = await getPage(pathname);
    const urls = localAssetUrls(html);
    assert.ok(urls.length > 0, 'page references images');
    const broken = [];
    for (const url of urls) {
      const res = await fetch(BASE_URL + url);
      const type = res.headers.get('content-type') ?? '';
      if (!res.ok || !type.startsWith('image/')) broken.push(`${res.status} ${type} ${url}`);
      await res.arrayBuffer();
    }
    assert.deepEqual(broken, []);
  });
}
