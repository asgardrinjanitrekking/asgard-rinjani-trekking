// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig(({ command }) => ({
  // Keystatic adds server-rendered admin/API routes, so keep it available in
  // local development and leave it out of the static GitHub Pages build.
  integrations: [react(), ...(command === 'dev' ? [keystatic()] : [])],
  output: 'static',
  site: 'https://asgardrinjanitrekking.github.io',
  base: '/asgard-rinjani-trekking',
}));
