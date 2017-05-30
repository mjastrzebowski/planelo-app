import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IonicModule } from 'ionic-angular';
import { PlaneloApp } from '../../../app/app.component';

import { UtilsMock } from 'app/mocks';

import { Utils } from 'app/providers/utils';
import { CommonItem } from './common-item';


let comp: CommonItem;
let fixture: ComponentFixture<CommonItem>;
let de: DebugElement;
let el: HTMLElement;

let modelStub;

describe('Component: CommonItem Component', () => {
  beforeEach(async(() => {
    modelStub = {
      id: 1,
      name: 'Test name',
      hide: true
    };

    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ PlaneloApp, CommonItem ],
      imports: [ IonicModule.forRoot(PlaneloApp) ],
      providers: [
        { provide: Utils, useClass: UtilsMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonItem);
    comp = fixture.componentInstance;
    comp.model = modelStub;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('h3'));
    el = de.nativeElement;
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    de = null;
    el = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should show model name', () => {
    let content = el.textContent;
    expect(content).toContain('Test name');
  });

  it('should show "test"', () => {
    modelStub.name = 'test';
    fixture.detectChanges();
    let content = el.textContent;
    expect(content).toContain("test");
  });
});
