webpackJsonp([3],{543:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),i=n(17),r=n(555),a=n(422);n.d(t,"EmployeeCreateModule",function(){return l});var s=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},l=function(){function e(){}return e}();l=s([n.i(o.b)({declarations:[r.a],imports:[a.a,i.d.forChild(r.a)],exports:[r.a]})],l)},555:function(e,t,n){"use strict";var o=n(0),i=n(17),r=n(21),a=n(131);n.d(t,"a",function(){return c});var s=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},l=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},c=function(){function e(e,t,n,o,i){this.params=e,this.viewCtrl=t,this.renderer=n,this.utils=o,this.employeeStore=i,this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement,"my-popup",!0)}return e.prototype.ngOnInit=function(){this.model=this.employeeStore.getItem(this.params.data)},e.prototype.save=function(){var e=this;this.utils.showLoading("Zapisywanie firmy..."),this.employeeStore.create(this.model).then(function(){e.utils.stopLoading(),e.utils.showMessage("Firma dodana."),e.dismiss()})},e.prototype.dismiss=function(){this.viewCtrl.dismiss()},e}();s([n.i(o.w)(),l("design:type",Object)],c.prototype,"model",void 0),c=s([n.i(i.e)({name:"employees/create",segment:"employees/create"}),n.i(o.L)({template:'<ion-header>\n  <ion-navbar>\n    <ion-title>Nowa firma</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span color="primary" showWhen="ios">Zamknij</span>\n        <ion-icon name="close" hideWhen="ios"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="has-header">\n  <form #form="ngForm" novalidate>\n    <ion-list>\n      <ion-item>\n        <ion-label floating>Nazwa</ion-label>\n        <ion-input type="text" [(ngModel)]="model.name" name="name"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Opis</ion-label>\n        <ion-textarea [(ngModel)]="model.description" name="description"></ion-textarea>\n      </ion-item>\n    </ion-list>\n    <ion-row responsive-sm>\n      <ion-col>\n        <button ion-button color="primary" block type="submit" (click)="save()">Zapisz</button>\n      </ion-col>\n      <ion-col>\n        <button ion-button color="light" block (click)="dismiss()">Anuluj</button>\n      </ion-col>\n    </ion-row>\n  </form>\n</ion-content>\n'}),l("design:paramtypes",[i.f,i.g,o.v,r.a,a.a])],c)}});
//# sourceMappingURL=/Users/mjastrzebowski/GitHub/egobody-david-2.0/public_html/build/3.main.js.map