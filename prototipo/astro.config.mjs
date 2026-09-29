// Prototipo estático (HTML puro) para revisión con el Centro y despliegue en Vercel.
import { defineConfig } from 'astro/config';
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  server: { port: 4321 },
  devToolbar: { enabled: false },
});
