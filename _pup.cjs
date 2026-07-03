const puppeteer = require('puppeteer-core');

(async () => {
  const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const URL = 'https://fortune-web-pdyr.onrender.com/meihua';

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  const logs = [];

  page.on('console', (msg) => {
    logs.push(`[${msg.type()}] ${msg.text()}`);
  });
  page.on('pageerror', (err) => {
    logs.push(`[pageerror] ${err.message}\n${err.stack}`);
  });
  page.on('requestfailed', (req) => {
    logs.push(`[reqfail] ${req.url()} · ${req.failure()?.errorText}`);
  });

  try {
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 4000));

    const state = await page.evaluate(() => {
      return {
        hydrated: typeof window.__HYDRATED__ === 'boolean' ? window.__HYDRATED__ : 'undefined',
        buttonExists: !!document.querySelector('button'),
        bodyText: document.body.innerText.slice(0, 200),
      };
    });

    console.log('=== State ===');
    console.log(JSON.stringify(state, null, 2));

    console.log('\n=== Logs (' + logs.length + ') ===');
    for (const l of logs) console.log(l);

  } catch (e) {
    console.error('goto failed:', e.message);
  }

  await browser.close();
})();
