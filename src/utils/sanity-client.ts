import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadEnv } from 'vite';
import { createClient, type ClientConfig, type SanityClient } from '@sanity/client';

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_TOKEN, STACKBIT_PREVIEW, SANITY_PREVIEW_DRAFTS } = loadEnv(process.env.NODE_ENV || '', process.cwd(), '');
const isDev = import.meta.env.DEV;
const isDeployPreview = process.env.CONTEXT === 'deploy-preview';
const previewDrafts = STACKBIT_PREVIEW?.toLowerCase() === 'true' || SANITY_PREVIEW_DRAFTS?.toLowerCase() === 'true';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Drafts require an authenticated token. Without one we can still read the
// public dataset, but only the published perspective — asking for
// previewDrafts with no token errors out ("permission ... requires auth").
const hasToken = !!SANITY_TOKEN;
const wantsDrafts = isDev || isDeployPreview || previewDrafts;

export const sanityConfig: ClientConfig = {
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET || 'production',
    useCdn: false,
    apiVersion: '2024-01-31',
    token: SANITY_TOKEN,
    perspective: wantsDrafts && hasToken ? 'previewDrafts' : 'published'
};

export const client = createClient(sanityConfig);

/**
 * @param {SanityClient} client The Sanity client to add the listener to
 * @param {Array<String>} types An array of types the listener should take an action on
 * Creating Sanity listener to subscribe to whenever a new document is created or deleted to refresh the list in Create
 */
// Only open the live content listener when a real project is configured. With
// no/placeholder credentials the EventSource emits an uncaught ChannelError
// ("Dataset not found") that crashes the dev server, so skip it entirely.
const hasRealProject = !!SANITY_PROJECT_ID && SANITY_PROJECT_ID !== 'placeholder';

(hasRealProject ? [{ client: client, types: ['page'] }] : []).forEach(({ client, types }: { client: SanityClient; types: Array<String> }) =>
    client.listen(`*[_type in ${JSON.stringify(types)}]`, {}, { visibility: 'query' }).subscribe({
        next: async (event: any) => {
            // only refresh when pages are deleted or created
            if (event.transition === 'appear' || event.transition === 'disappear') {
                const filePath = path.join(__dirname, '../layouts/Layout.astro');
                const time = new Date();

                // update the updatedat stamp for the layout file, triggering astro to refresh the data in getStaticPaths
                await fs.promises.utimes(filePath, time, time);
            }
        },
        // Without an error handler the observable rethrows (e.g. "Dataset not
        // found" when SANITY_* env is unset), which crashes the dev server.
        // Warn and keep running so the site can still build/render.
        error: (err: any) => {
            console.warn('[sanity] page listener disabled:', err?.message || err);
        }
    })
);
