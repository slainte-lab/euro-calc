// Cloudflare Worker: proxies Bystrobank rates and adds CORS headers.
// Deploy: dash.cloudflare.com → Workers & Pages → Create → paste this → Deploy.
const TARGET = 'https://www.bystrobank.ru/sitecurrency/data/CurrentExchangeRates_izhevsk.js';

export default {
  async fetch() {
    const res = await fetch(TARGET, {
      headers: {
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'x-requested-with': 'XMLHttpRequest',
        'referer': 'https://www.bystrobank.ru/',
      },
      cf: { cacheTtl: 60, cacheEverything: true },
    });
    return new Response(res.body, {
      status: res.status,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'access-control-allow-origin': '*',
        'cache-control': 'public, max-age=60',
      },
    });
  },
};
