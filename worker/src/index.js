// Reverse proxy: serves the Upptime status page (GitHub Pages,
// try-caret.github.io/status) at status.arbium.ai. Exists because the
// site's HTML links assets under the /status base path — both /x and
// /status/x must resolve to the same upstream file.
const UPSTREAM = 'https://try-caret.github.io/status';

export default {
  async fetch(request) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405 });
    }
    const url = new URL(request.url);
    let path = url.pathname;
    if (path === '/status' || path.startsWith('/status/')) {
      path = path.slice('/status'.length) || '/';
    }
    const resp = await fetch(UPSTREAM + path + url.search, { redirect: 'follow' });
    return new Response(resp.body, { status: resp.status, headers: resp.headers });
  },
};
