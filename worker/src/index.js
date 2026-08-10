// Reverse proxy: serves the Upptime status page at status.arbium.ai.
// The site is built for the domain root (.upptimerc.yml has no baseUrl)
// but GitHub Pages hosts it under the /status repo subpath, so every
// incoming path maps onto that prefix.
const UPSTREAM = 'https://try-caret.github.io/status';

export default {
  async fetch(request) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405 });
    }
    const url = new URL(request.url);
    const resp = await fetch(UPSTREAM + url.pathname + url.search, { redirect: 'follow' });
    return new Response(resp.body, { status: resp.status, headers: resp.headers });
  },
};
