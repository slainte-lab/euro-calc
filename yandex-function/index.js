// Yandex Cloud Function (Node.js 22): proxies Bystrobank rates and adds CORS headers.
// Entry point: index.handler. Function must be public.
const https = require('https');
const U = 'https://www.bystrobank.ru/sitecurrency/data/CurrentExchangeRates_izhevsk.js';
const H = { 'accept': 'application/json, text/javascript, */*; q=0.01', 'x-requested-with': 'XMLHttpRequest', 'referer': 'https://www.bystrobank.ru/' };
module.exports.handler = () => new Promise((resolve, reject) => { const req = https.get(U, { headers: H, timeout: 8000 }, res => { const c = []; res.on('data', d => c.push(d)); res.on('end', () => resolve({ statusCode: res.statusCode, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=60' }, body: Buffer.concat(c).toString('utf8') })); }); req.on('timeout', () => req.destroy(new Error('timeout'))); req.on('error', reject); });
