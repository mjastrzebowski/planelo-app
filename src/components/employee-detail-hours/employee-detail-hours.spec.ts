import { ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
// import { By } from '@angular/platform-browser';

import { TestUtils } from 'app/test';

import { EmployeeDetailHours } from './employee-detail-hours';

let fixture: ComponentFixture<EmployeeDetailHours>;
let instance: EmployeeDetailHours = null;
let de: DebugElement;
let el: HTMLElement;

describe('Component: EmployeeDetailHours', function () {
  beforeEach(async(() => TestUtils.beforeEachCompiler([EmployeeDetailHours]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    // instance.model = new EmployeeMock();
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });
});
