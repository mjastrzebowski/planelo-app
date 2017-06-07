import { ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TestUtils } from 'app/test';
import { EmployeeDetailHoursPage } from './employee-detail-hours';

import { EmployeeMock } from 'app/services/mocks';

let fixture: ComponentFixture<EmployeeDetailHoursPage>;
let instance: EmployeeDetailHoursPage = null;
let de: DebugElement;
let el: HTMLElement;

describe('Component: EmployeeDetailHoursPage', function () {
  beforeEach(async(() => TestUtils.beforeEachCompiler([EmployeeDetailHoursPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    instance.navParams.data = new EmployeeMock();

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
