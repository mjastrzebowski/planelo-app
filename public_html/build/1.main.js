webpackJsonp([1],{

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__company_create__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__ = __webpack_require__(376);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanyCreateModule", function() { return CompanyCreateModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CompanyCreateModule = (function () {
    function CompanyCreateModule() {
    }
    return CompanyCreateModule;
}());
CompanyCreateModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__company_create__["a" /* CompanyCreateModal */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__company_create__["a" /* CompanyCreateModal */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__company_create__["a" /* CompanyCreateModal */]
        ]
    })
], CompanyCreateModule);

//# sourceMappingURL=company-create.module.js.map

/***/ }),

/***/ 502:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ICompany; });
/* unused harmony export Company */
var ICompany = (function () {
    function ICompany() {
    }
    return ICompany;
}());

var Company = (function () {
    function Company(name) {
        this.name = name;
    }
    return Company;
}());

//# sourceMappingURL=company.js.map

/***/ }),

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_company_company__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_company_company_store__ = __webpack_require__(377);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyCreateModal; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CompanyCreateModal = (function () {
    function CompanyCreateModal(params, viewCtrl, renderer, utils, companyStore) {
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.renderer = renderer;
        this.utils = utils;
        this.companyStore = companyStore;
        this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement, 'my-popup', true);
    }
    CompanyCreateModal.prototype.ngOnInit = function () {
        this.model = this.companyStore.getItem(this.params.data) || new __WEBPACK_IMPORTED_MODULE_3_app_services_company_company__["a" /* ICompany */]();
    };
    CompanyCreateModal.prototype.save = function () {
        var _this = this;
        this.utils.showLoading('Zapisywanie firmy...');
        this.companyStore.create(this.model).then(function () {
            _this.utils.stopLoading();
            _this.utils.showMessage('Firma dodana.');
            _this.dismiss();
        });
    };
    CompanyCreateModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return CompanyCreateModal;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_app_services_company_company__["a" /* ICompany */])
], CompanyCreateModal.prototype, "model", void 0);
CompanyCreateModal = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        name: 'companies/create',
        segment: 'companies/create'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({template:/*ion-inline-start:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/company/company-create/company-create.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Nowa firma</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span color="primary" showWhen="ios">Zamknij</span>\n        <ion-icon name="close" hideWhen="ios"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="has-header">\n  <form #form="ngForm" novalidate>\n    <ion-list>\n      <ion-item>\n        <ion-label floating>Nazwa</ion-label>\n        <ion-input type="text" [(ngModel)]="model.name" name="name"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Opis</ion-label>\n        <ion-textarea [(ngModel)]="model.description" name="description"></ion-textarea>\n      </ion-item>\n    </ion-list>\n    <ion-row responsive-sm>\n      <ion-col>\n        <button ion-button color="primary" block type="submit" (click)="save()">Zapisz</button>\n      </ion-col>\n      <ion-col>\n        <button ion-button color="light" block (click)="dismiss()">Anuluj</button>\n      </ion-col>\n    </ion-row>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/company/company-create/company-create.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Renderer */],
        __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_4_app_services_company_company_store__["a" /* CompanyStore */]])
], CompanyCreateModal);

//# sourceMappingURL=company-create.js.map

/***/ })

});
//# sourceMappingURL=1.main.js.map