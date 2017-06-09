import { ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TestUtils } from 'app/test';

import { PlaneloApp } from './app.component';
// import { CommonLoginModule } from 'app/pages/common/login/login.module';
import { LoginPage } from 'app/pages/common/login/login';

let instance: PlaneloApp;
let fixture: ComponentFixture<PlaneloApp>;

describe('Component: PlaneloApp Component', () => {
  beforeEach(async(() => TestUtils.beforeEachCompiler([PlaneloApp]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;

    // fixture.detectChanges()
  })));

  afterEach(() => {
    fixture.destroy();
    instance = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(instance).toBeTruthy();
  });

  xit('initialises with a root page of LoginPage', () => {
    expect(instance['rootPage']).toBe(LoginPage);
  });
});
