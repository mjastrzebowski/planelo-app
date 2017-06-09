import { PlaneloApp } from './app.component';

import { MenuMock, NavMock, UtilsMock, TranslateServiceMock, AuthServiceMock } from 'app/mocks';

let instance: PlaneloApp;

describe('App: PlaneloApp', () => {
  beforeEach(() => {
    instance = new PlaneloApp((<any>new TranslateServiceMock()), (<any> new UtilsMock), (<any> new MenuMock), (<any>new AuthServiceMock()));
    instance['nav'] = (<any>new NavMock());
  });

  it('initialises with two possible common pages', () => {
    expect(instance['commonPages'].length).toEqual(2);
  });

  it('initialises with a root page', () => {
    expect(instance['rootPage']).not.toBe(null);
  });

  it('opens a settings page', () => {
    spyOn(instance['menu'], 'close');
    spyOn(instance['nav'], 'setRoot');
    instance.openPage(instance['commonPages'][0]);
    expect(instance['menu']['close']).toHaveBeenCalled();
    expect(instance['nav'].setRoot).toHaveBeenCalledWith('settings');
  });
});
