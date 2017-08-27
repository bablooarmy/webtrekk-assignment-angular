'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /customers when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/customers");
  });


  describe('customers', function() {

    beforeEach(function() {
      browser.get('#!/customers');
    });


    it('should render customers when user navigates to /customers', function() {
      expect(element.all(by.css('[ng-view] h2')).first().getText()).
        toMatch(/Customers overview/);
    });

  });


  describe('Customer Details', function() {

    beforeEach(function() {
      browser.get('#!/details/3');
    });


    it('should render details when user navigates to /details/3', function() {
      expect(element.all(by.css('[ng-view] h2')).first().getText()).
        toMatch(/Customer Details/);
    });

  });

  describe('Navigation Details', function() {

    beforeEach(function() {
      browser.get('#!/navigation/3');
    });


    it('should render customer navigation when user navigates to /navigation/3', function() {
      expect(element.all(by.css('[ng-view] h2')).first().getText()).
        toMatch(/Navigation data for/);
    });

  });
});
