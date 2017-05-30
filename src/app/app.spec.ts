import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule, MenuController } from 'ionic-angular';
import { PlaneloApp } from './app.component';

import { AuthServiceMock, UtilsMock } from 'app/mocks';

import { AuthService } from 'app/services/auth/auth-service';
import { Utils } from 'app/providers/utils';

// import { CommonLoginModule } from 'app/pages/common/login/login.module';
import { LoginPage } from 'app/pages/common/login/login';

let comp: PlaneloApp;
let fixture: ComponentFixture<PlaneloApp>;

describe('Component: PlaneloApp Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ PlaneloApp ],
      imports: [ IonicModule.forRoot(PlaneloApp) ],
      providers: [
        MenuController,
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Utils, useClass: UtilsMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaneloApp);
    comp = fixture.componentInstance;
    fixture.detectChanges()
  }));

  afterEach(() => {
    fixture.destroy();
    comp = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  xit('initialises with a root page of LoginPage', () => {
    expect(comp['rootPage']).toBe(LoginPage);
  });
});
