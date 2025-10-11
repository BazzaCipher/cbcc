import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import { sanityConfig } from './src/utils/sanity-client';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	site: 'https://collimatedbeam.com',
    image: {
        domains: ['cdn.sanity.io']
    },
    integrations: [sanity(sanityConfig), icon()],
    vite: {
        plugins: [tailwindcss()],
        server: {
            hmr: { path: '/vite-hmr/' },
            allowedHosts: ['.netlify.app']
        }
    },
    server: {
        port: 3000
    }
});
