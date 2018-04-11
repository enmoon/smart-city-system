const puppeteer = require('puppeteer');

class Fire {
    async init(options) {
        const { url, handler } = options,
            browser = await puppeteer.launch({ headless: true }),
            page = await browser.newPage();

        await page.goto(url);


        page.on('console', msg => {
            const type = msg.type(),
                text = msg.text(),
                bool = type === 'log' && text === 'FireAlarm';

            bool && handler();
        });
    }
}

module.exports = Fire;