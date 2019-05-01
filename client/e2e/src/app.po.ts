import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getNumberOfResults() {
    return element(by.css('p-table tbody tr')).all.length;
  }

  searchForId() {
    element(by.id('filter-id')).sendKeys(65);
  }

  getLocationForm() {
    return element(by.id('location-form'));
  }

  openLocationForm() {
    element(by.css('p-table tbody tr')).click();
  }

}
