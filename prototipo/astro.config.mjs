// Prototipo estático (HTML puro) para revisión con el Centro y despliegue en Vercel.
import { defineConfig } from 'astro/config';
import { writeFileSync } from 'node:fs';

// Dominio del prototipo: URL canónica, Open Graph y sitemap. En WordPress, el dominio del Centro.
const SITE = 'https://prototipo-jade-sigma.vercel.app';

// sitemap.xml al terminar el build, con todas las páginas menos la búsqueda y la 404 (pedido de la DED, 24-11).
const sitemap = {
  name: 'cgc-sitemap',
  hooks: {
    'astro:build:done': ({ dir, pages }) => {
      const urls = pages
        .map((p) => '/' + p.pathname)
        .filter((u) => !/^\/(busqueda|404)\/?$/.test(u))
        .sort();
      const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n') + '\n</urlset>\n';
      writeFileSync(new URL('sitemap.xml', dir), xml);
    },
  },
};

export default defineConfig({
  site: SITE,
  integrations: [sitemap],
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  server: { port: 4321 },
  devToolbar: { enabled: false },
});
