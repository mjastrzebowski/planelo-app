webpackJsonp([4],{

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__company_list__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__ = __webpack_require__(376);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanyListModule", function() { return CompanyListModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CompanyListModule = (function () {
    function CompanyListModule() {
    }
    return CompanyListModule;
}());
CompanyListModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__company_list__["a" /* CompanyListPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__company_list__["a" /* CompanyListPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__company_list__["a" /* CompanyListPage */]
        ]
    })
], CompanyListModule);

//# sourceMappingURL=company-list.module.js.map

/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_auth_auth_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_company_company_store__ = __webpack_require__(377);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyListPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CompanyListPage = (function () {
    function CompanyListPage(nav, modalCtrl, utils, auth, companyStore) {
        this.nav = nav;
        this.modalCtrl = modalCtrl;
        this.utils = utils;
        this.auth = auth;
        this.companyStore = companyStore;
        this.filter = '';
    }
    CompanyListPage.prototype.ngOnInit = function () {
        var _this = this;
        this.utils.showLoading('Ładowanie firm...');
        this.sub = this.companyStore.subscribe(function (loaded) {
            if (!loaded) {
                return;
            }
            _this.utils.stopLoading();
        });
    };
    CompanyListPage.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    CompanyListPage.prototype.showCreateModal = function () {
        this.modalCtrl.create('companies/create').present();
    };
    return CompanyListPage;
}());
CompanyListPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        name: 'companies',
        segment: 'companies'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({template:/*ion-inline-start:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/company/company-list/company-list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button icon-only menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Firmy</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="showCreateModal()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n      <notification-counter></notification-counter>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="trainer-list">\n  <ion-searchbar color="primary" [(ngModel)]="filter" placeholder="Szukaj"></ion-searchbar>\n\n  <common-item-list class="company-list" [data]="companyStore.get()" [store]="companyStore" detail="company" [filter]="filter"></common-item-list>\n</ion-content>\n'/*ion-inline-end:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/company/company-list/company-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_3_app_services_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_4_app_services_company_company_store__["a" /* CompanyStore */]])
], CompanyListPage);

//# sourceMappingURL=company-list.js.map

/***/ })

});
//# sourceMappingURL=4.main.js.map