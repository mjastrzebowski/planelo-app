webpackJsonp([1],{534:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e(0),i=e(17),a=e(538),r=e(422);e.d(t,"AdminCompanyCreateModule",function(){return c});var s=this&&this.__decorate||function(n,t,e,o){var i,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,e):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(n,t,e,o);else for(var s=n.length-1;s>=0;s--)(i=n[s])&&(r=(a<3?i(r):a>3?i(t,e,r):i(t,e))||r);return a>3&&r&&Object.defineProperty(t,e,r),r},c=function(){function n(){}return n}();c=s([e.i(o.b)({declarations:[a.a],imports:[r.a,i.d.forChild(a.a)],exports:[a.a]})],c)},537:function(n,t,e){"use strict";e.d(t,"a",function(){return o});var o=function(){function n(){}return n}();!function(){function n(n){this.name=n}n}()},538:function(n,t,e){"use strict";var o=e(0),i=e(17),a=e(21),r=e(537),s=e(423);e.d(t,"a",function(){return u});var c=this&&this.__decorate||function(n,t,e,o){var i,a=arguments.length,r=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,e):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(n,t,e,o);else for(var s=n.length-1;s>=0;s--)(i=n[s])&&(r=(a<3?i(r):a>3?i(t,e,r):i(t,e))||r);return a>3&&r&&Object.defineProperty(t,e,r),r},l=this&&this.__metadata||function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)},u=function(){function n(n,t,e,o,i){this.params=n,this.viewCtrl=t,this.renderer=e,this.utils=o,this.companyStore=i,this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement,"my-popup",!0)}return n.prototype.ngOnInit=function(){this.model=this.companyStore.getItem(this.params.data)||new r.a},n.prototype.save=function(){var n=this;this.utils.showLoading("Zapisywanie firmy..."),this.companyStore.create(this.model).then(function(){n.utils.stopLoading(),n.utils.showMessage("Firma dodana."),n.dismiss()})},n.prototype.dismiss=function(){this.viewCtrl.dismiss()},n}();c([e.i(o.w)(),l("design:type",r.a)],u.prototype,"model",void 0),u=c([e.i(i.e)({name:"companies/create",segment:"companies/create"}),e.i(o.L)({template:'<ion-header>\n  <ion-navbar>\n    <ion-title>Nowa firma</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span color="primary" showWhen="ios">Zamknij</span>\n        <ion-icon name="close" hideWhen="ios"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="has-header">\n  <form #form="ngForm" novalidate>\n    <ion-list>\n      <ion-item>\n        <ion-label floating>Nazwa</ion-label>\n        <ion-input type="text" [(ngModel)]="model.name" name="name"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Opis</ion-label>\n        <ion-textarea [(ngModel)]="model.description" name="description"></ion-textarea>\n      </ion-item>\n    </ion-list>\n    <ion-row responsive-sm>\n      <ion-col>\n        <button ion-button color="primary" block type="submit" (click)="save()">Zapisz</button>\n      </ion-col>\n      <ion-col>\n        <button ion-button color="light" block (click)="dismiss()">Anuluj</button>\n      </ion-col>\n    </ion-row>\n  </form>\n</ion-content>\n'}),l("design:paramtypes",[i.h,i.i,o.v,a.a,s.a])],u)}});
//# sourceMappingURL=/Users/mjastrzebowski/GitHub/egobody-david-2.0/public_html/build/1.main.js.map