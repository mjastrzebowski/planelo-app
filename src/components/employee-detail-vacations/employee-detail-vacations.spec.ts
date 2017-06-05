import { ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TestUtils } from 'app/test';

import { EmployeeDetailVacations } from './employee-detail-vacations';

let fixture: ComponentFixture<EmployeeDetailVacations>;
let instance: EmployeeDetailVacations = null;
let de: DebugElement;
let el: HTMLElement;

describe('Component: EmployeeDetailVacations', function () {
  beforeEach(async(() => TestUtils.beforeEachCompiler([EmployeeDetailVacations]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    // instance.model = new EmployeeMock();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('p'));
    el = de.nativeElement;
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
