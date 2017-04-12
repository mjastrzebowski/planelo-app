webpackJsonp([0],{535:function(n,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=o(0),i=o(17),c=o(539),r=o(422);o.d(e,"AdminCompanyDetailModule",function(){return l});var a=this&&this.__decorate||function(n,e,o,t){var i,c=arguments.length,r=c<3?e:null===t?t=Object.getOwnPropertyDescriptor(e,o):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(n,e,o,t);else for(var a=n.length-1;a>=0;a--)(i=n[a])&&(r=(c<3?i(r):c>3?i(e,o,r):i(e,o))||r);return c>3&&r&&Object.defineProperty(e,o,r),r},l=function(){function n(){}return n}();l=a([o.i(t.b)({declarations:[c.a],imports:[r.a,i.d.forChild(c.a)],exports:[c.a]})],l)},537:function(n,e,o){"use strict";o.d(e,"a",function(){return t});var t=function(){function n(){}return n}();!function(){function n(n){this.name=n}n}()},539:function(n,e,o){"use strict";var t=o(0),i=o(17),c=o(21),r=o(537),a=o(423),l=o(60),s=o(131),d=o(61);o.d(e,"a",function(){return p});var m=this&&this.__decorate||function(n,e,o,t){var i,c=arguments.length,r=c<3?e:null===t?t=Object.getOwnPropertyDescriptor(e,o):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(n,e,o,t);else for(var a=n.length-1;a>=0;a--)(i=n[a])&&(r=(c<3?i(r):c>3?i(e,o,r):i(e,o))||r);return c>3&&r&&Object.defineProperty(e,o,r),r},u=this&&this.__metadata||function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)},p=function(){function n(n,e,o,t,i,c,r){this.params=n,this.viewCtrl=e,this.utils=o,this.companyStore=t,this.clientStore=i,this.placeStore=c,this.employeeStore=r,this.employeeFilter="",this.clientFilter=""}return n.prototype.ngOnInit=function(){var n=this;this.utils.showLoading("Ładowanie firm..."),this.sub=this.companyStore.subscribe(function(e){e&&(n.model=n.companyStore.getItem(n.params.data.id)||new r.a,n.utils.stopLoading())})},n.prototype.ngOnDestroy=function(){this.sub&&this.sub.unsubscribe()},n}();m([o.i(t.w)(),u("design:type",r.a)],p.prototype,"model",void 0),p=m([o.i(i.e)({name:"company",segment:"company/:id",defaultHistory:["companies"]}),o.i(t.L)({template:'<ion-header>\n  <ion-navbar>\n    <button ion-button icon-only menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Firma</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="company-detail">\n  <div class="company-header">\n    <img src="http://www.egobody.pl/wp-content/uploads/2017/02/TreningPersonalny-150x150.jpg">\n    <ion-card>\n      <h2 text-center> {{ model?.name }} </h2>\n    </ion-card>\n  </div>\n\n  <ion-grid no-padding>\n    <ion-row>\n      <ion-col col-md-6 col-12>\n        <ion-card class="card-places">\n          <ion-card-header ion-item>\n            <ion-icon name="pin"></ion-icon>\n            <h3>Miejsca</h3>\n            <button item-right ion-button icon-only clear (click)="showPlaceCreate()">\n              <ion-icon name="add"></ion-icon>\n            </button>\n          </ion-card-header>\n          <ion-scroll scrollY="true">\n            <common-item-list class="place-list" [data]="placeStore.get()" [store]="placeStore"></common-item-list>\n          </ion-scroll>\n        </ion-card>\n\n        <ion-card class="card-employees">\n          <ion-card-header ion-item>\n            <ion-icon name="people"></ion-icon>\n            <h3>Pracownicy</h3>\n            <button item-right ion-button icon-only clear (click)="showEmployeeCreate()">\n              <ion-icon name="add"></ion-icon>\n            </button>\n          </ion-card-header>\n          <ion-searchbar color="primary" [(ngModel)]="employeeFilter" placeholder="Szukaj"></ion-searchbar>\n          <ion-scroll scrollY="true">\n            <common-item-list class="employee-list" [data]="model?.employees" [store]="employeeStore" detail="trainer" [filter]="employeeFilter"></common-item-list>\n          </ion-scroll>\n        </ion-card>\n      </ion-col>\n\n      <ion-col col-md-6 col-12>\n        <ion-card class="card-clients">\n          <ion-card-header ion-item>\n            <ion-icon name="contacts"></ion-icon>\n            <h3>Klienci</h3>\n            <button item-right ion-button icon-only clear (click)="showClientCreate()">\n              <ion-icon name="add"></ion-icon>\n            </button>\n          </ion-card-header>\n          <ion-searchbar color="primary" [(ngModel)]="clientFilter" placeholder="Szukaj"></ion-searchbar>\n          <ion-scroll scrollY="true">\n            <common-item-list class="employee-list" [data]="clientStore.get()" [store]="clientStore" detail="client" [filter]="clientFilter"></common-item-list>\n          </ion-scroll>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'}),u("design:paramtypes",[i.h,i.i,c.a,a.a,l.a,d.a,s.a])],p)}});
//# sourceMappingURL=/Users/mjastrzebowski/GitHub/egobody-david-2.0/public_html/build/0.main.js.map