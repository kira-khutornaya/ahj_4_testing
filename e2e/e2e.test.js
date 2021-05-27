import puppetteer from 'puppeteer';

jest.setTimeout(50000); // default puppeteer timeout

describe('Validate form', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'https://kira-khutornaya.github.io/ahj_4_testing/';

  beforeAll(async () => {
    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should add .modal_success class for valid card number', async () => {
    await page.goto(baseUrl);
    const form = await page.$('[class=form-group]');
    const input = await form.$('[class=field-group__input]');
    await input.type('5333 4881 4939 6412');
    const validateBtn = await form.$('[class=form-group__button]');
    validateBtn.click();
    await page.waitForSelector('div.modal_success');
  });

  test('should add .modal_error class for invalid card number', async () => {
    await page.goto(baseUrl);
    const form = await page.$('[class=form-group]');
    const input = await form.$('[class=field-group__input]');
    await input.type('6016059918019947');
    const validateBtn = await form.$('[class=form-group__button]');
    validateBtn.click();
    await page.waitForSelector('div.modal_error');
  });

  test('should add .modal_error class for short card number', async () => {
    await page.goto(baseUrl);
    const form = await page.$('[class=form-group]');
    const input = await form.$('[class=field-group__input]');
    await input.type('456789');
    const validateBtn = await form.$('[class=form-group__button]');
    validateBtn.click();
    await page.waitForSelector('div.modal_error');
  });

  test('should add .modal_error class for card number with letters', async () => {
    await page.goto(baseUrl);
    const form = await page.$('[class=form-group]');
    const input = await form.$('[class=field-group__input]');
    await input.type('472v 5555 6546 5321');
    const validateBtn = await form.$('[class=form-group__button]');
    validateBtn.click();
    await page.waitForSelector('div.modal_error');
  });
});
