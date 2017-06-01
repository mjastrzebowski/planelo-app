// import { TestBed, ComponentFixture, async } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
// import { By } from '@angular/platform-browser';

// import { IonicModule } from 'ionic-angular';
// import { PlaneloApp } from '../../../app/app.component';

// import { UtilsMock } from 'app/mocks';

// import { Utils } from 'app/providers/utils';
// import { CommonItem } from './common-item';


// let comp: CommonItem;
// let fixture: ComponentFixture<CommonItem>;
// let de: DebugElement;
// let el: HTMLElement;

// let modelStub;
// let storeStub;

// describe('Component: CommonItem', () => {
//   beforeEach(async(() => {
//     modelStub = {
//       id: 1,
//       name: 'Test name',
//       hide: null
//     };

//     TestBed.configureTestingModule({
//       schemas: [ NO_ERRORS_SCHEMA ],
//       declarations: [ PlaneloApp, CommonItem ],
//       imports: [ IonicModule.forRoot(PlaneloApp) ],
//       providers: [
//         { provide: Utils, useClass: UtilsMock }
//       ]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CommonItem);
//     comp = fixture.componentInstance;
//     comp.model = modelStub;
//     fixture.detectChanges();
//     de = fixture.debugElement.query(By.css('button'));
//     el = de.nativeElement;
//   });

//   afterEach(() => {
//     fixture.destroy();
//     comp = null;
//     de = null;
//     el = null;
//   });

//   it('is created', () => {
//     expect(fixture).toBeTruthy();
//     expect(comp).toBeTruthy();
//   });

//   describe('element', function () {
//     it('should be visible by default', () => {
//       expect(el.hidden).toBeFalsy();
//     });

//     it('should be hidden when filtered', () => {
//       modelStub.hide = true;
//       fixture.detectChanges();
//       expect(el.hidden).toBeTruthy();
//     });

//     it('should show model name', () => {
//       de = de.query(By.css('h3'));
//       el = de.nativeElement;
//       let content = el.textContent;
//       expect(content).toContain('Test name');
//     });

//     it('should show "test"', () => {
//       modelStub.name = 'test';
//       fixture.detectChanges();
//       de = de.query(By.css('h3'));
//       el = de.nativeElement;
//       let content = el.textContent;
//       expect(content).toContain("test");
//     });

//     it('should call goToDetail() method when has been clicked', () => {
//       const spy = spyOn(comp, 'goToDetail');
//       de.triggerEventHandler('click', null);
//       expect(spy).toHaveBeenCalled();
//     });

//     it('should call goToDetail() method with item id on click', () => {
//       const spy = spyOn(comp, 'goToDetail');
//       de.triggerEventHandler('click', null);
//       expect(spy).toHaveBeenCalledWith(1);
//     });
//   });

//   describe('behaviour', function() {
//     beforeEach(() => {
//       modelStub.store = storeStub;
//     });

//     xit('should call goToDetail() method when has been clicked', () => {
//       const spy = spyOn(comp, 'goToDetail');
//       de.triggerEventHandler('click', null);
//       expect(spy).toHaveBeenCalled();
//     });

//     xit('should call goToDetail() method with item id on click', () => {
//       const spy = spyOn(comp, 'goToDetail');
//       de.triggerEventHandler('click', null);
//       expect(spy).toHaveBeenCalledWith(1);
//     });
//   });
// });
