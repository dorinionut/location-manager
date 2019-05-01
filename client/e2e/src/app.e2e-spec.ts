import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Location manager');
  });

  it('should search by ID', () => {
    page.navigateTo();
    page.searchForId();
    expect(page.getNumberOfResults()).toBe(1);
  });

  it('should open the location edit form', () => {
    page.navigateTo();
    page.searchForId();
    page.openLocationForm();
    expect(page.getLocationForm()).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);

    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
