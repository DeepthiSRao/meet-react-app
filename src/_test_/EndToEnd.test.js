import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser, page;

    beforeAll(async () => {
        jest.setTimeout(50000);
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, // slow down by 250ms
            ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/'); 
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('An event is collapsed by default', async() => {    
        const eventDetails = await page.$('.event .more-details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .more-details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide its details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .more-details');
        expect(eventDetails).toBeNull();
    });
});

/* describe('Filter event by city', () => {
    let browser, page;

    beforeAll(async () => {
        jest.setTimeout(50000);
        browser = await puppeteer.launch({
            headless: true,
            slowMo: 250, // slow down by 250ms
            ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/'); 
        await page.waitForSelector('.event'
        
        );
        await page.waitForSelector('.city');
    });

    test('When user hasn’t searched for a city, show upcoming events from all cities.', async() => {    
        const event = await page.$('.event');
        expect(event).toBeDefined();
    }); 

    test('User should see a list of suggestions when they search for a city', async () => {
        await page.focus('.city');
        await page.keyboard.type('.city', 'Berlin, Germany');
        const suggestionsList = await page.$('.suggestions li');
        expect(suggestionsList).toHaveLength(2);
    });

    afterAll(() => {
        browser.close();
    });
});*/