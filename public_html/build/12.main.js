webpackJsonp([12],{

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__client_create__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__ = __webpack_require__(376);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientCreateModule", function() { return ClientCreateModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ClientCreateModule = (function () {
    function ClientCreateModule() {
    }
    return ClientCreateModule;
}());
ClientCreateModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__client_create__["a" /* ClientCreateModal */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__client_create__["a" /* ClientCreateModal */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__client_create__["a" /* ClientCreateModal */]
        ]
    })
], ClientCreateModule);

//# sourceMappingURL=client-create.module.js.map

/***/ }),

/***/ 503:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_client_client_store__ = __webpack_require__(56);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientCreateModal; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ClientCreateModal = (function () {
    function ClientCreateModal(params, viewCtrl, renderer, utils, clientStore) {
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.renderer = renderer;
        this.utils = utils;
        this.clientStore = clientStore;
        this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement, 'my-popup', true);
    }
    ClientCreateModal.prototype.ngOnInit = function () {
        this.model = this.clientStore.getItem(this.params.data);
    };
    ClientCreateModal.prototype.save = function () {
        var _this = this;
        this.utils.showLoading('Zapisywanie klienta...');
        this.clientStore.create(this.model).then(function () {
            _this.utils.stopLoading();
            _this.utils.showMessage('Klient dodany.');
            _this.dismiss();
        });
    };
    ClientCreateModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return ClientCreateModal;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", Object)
], ClientCreateModal.prototype, "model", void 0);
ClientCreateModal = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        name: 'clients/create',
        segment: 'clients/create'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({template:/*ion-inline-start:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/client/client-create/client-create.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Nowy klient</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span color="primary" showWhen="ios">Zamknij</span>\n        <ion-icon name="close" hideWhen="ios"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="has-header">\n  <form #form="ngForm" novalidate>\n    <ion-list>\n      <ion-item>\n        <ion-label floating>Nazwa</ion-label>\n        <ion-input type="text" [(ngModel)]="model.name" name="name"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Opis</ion-label>\n        <ion-textarea [(ngModel)]="model.description" name="description"></ion-textarea>\n      </ion-item>\n    </ion-list>\n    <ion-row responsive-sm>\n      <ion-col>\n        <button ion-button color="primary" block type="submit" (click)="save()">Zapisz</button>\n      </ion-col>\n      <ion-col>\n        <button ion-button color="light" block (click)="dismiss()">Anuluj</button>\n      </ion-col>\n    </ion-row>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/client/client-create/client-create.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Renderer */],
        __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_3_app_services_client_client_store__["a" /* ClientStore */]])
], ClientCreateModal);

//# sourceMappingURL=client-create.js.map

/***/ })

});
//# sourceMappingURL=12.main.js.map