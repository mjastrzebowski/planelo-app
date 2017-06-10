import { browser, element, by } from 'protractor';

describe('PlaneloApp', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toBe('Planelo - Personal Trainings Management');
  });
})
