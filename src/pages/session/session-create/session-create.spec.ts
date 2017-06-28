import { ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TestUtils } from 'app/test';
import { SessionCreatePage } from './employee-detail-hours';

let fixture: ComponentFixture<SessionCreatePage>;
let instance: SessionCreatePage = null;
let de: DebugElement;
let el: HTMLElement;

describe('Component: SessionCreatePage', function () {
  beforeEach(async(() => TestUtils.beforeEachCompiler([SessionCreatePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;

    // fixture.detectChanges();
    // de = fixture.debugElement.query(By.css('p'));
    // el = de.nativeElement;
  })));

  afterEach(() => {
    fixture.destroy();
    instance = null;
    de = null;
    el = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(instance).toBeTruthy();
  });
});
