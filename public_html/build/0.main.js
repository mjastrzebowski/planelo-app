webpackJsonp([0],{

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__company_detail__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__ = __webpack_require__(376);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanyDetailModule", function() { return CompanyDetailModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CompanyDetailModule = (function () {
    function CompanyDetailModule() {
    }
    return CompanyDetailModule;
}());
CompanyDetailModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__company_detail__["a" /* CompanyDetailPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__company_detail__["a" /* CompanyDetailPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__company_detail__["a" /* CompanyDetailPage */]
        ]
    })
], CompanyDetailModule);

//# sourceMappingURL=company-detail.module.js.map

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

/***/ 512:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_company_company__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_company_company_store__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_client_client_store__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_services_employee_employee_store__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_services_place_place_store__ = __webpack_require__(57);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyDetailPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CompanyDetailPage = (function () {
    function CompanyDetailPage(params, viewCtrl, utils, companyStore, clientStore, placeStore, employeeStore) {
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.utils = utils;
        this.companyStore = companyStore;
        this.clientStore = clientStore;
        this.placeStore = placeStore;
        this.employeeStore = employeeStore;
        this.employeeFilter = '';
        this.clientFilter = '';
    }
    CompanyDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        this.utils.showLoading('Ładowanie firm...');
        this.sub = this.companyStore.subscribe(function (loaded) {
            if (!loaded) {
                return;
            }
            _this.model = _this.companyStore.getItem(_this.params.data.id) || new __WEBPACK_IMPORTED_MODULE_3_app_services_company_company__["a" /* ICompany */]();
            _this.utils.stopLoading();
        });
    };
    CompanyDetailPage.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    return CompanyDetailPage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_app_services_company_company__["a" /* ICompany */])
], CompanyDetailPage.prototype, "model", void 0);
CompanyDetailPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        name: 'company',
        segment: 'company/:id',
        defaultHistory: ['companies']
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({template:/*ion-inline-start:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/company/company-detail/company-detail.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button icon-only menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Firma</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="detail-page company-detail">\n  <div class="detail-header">\n    <img src="http://www.egobody.pl/wp-content/uploads/2017/02/TreningPersonalny-150x150.jpg">\n    <ion-card text-center>\n      <h2> {{ model?.name }} </h2>\n      <h4> Firma </h4>\n    </ion-card>\n  </div>\n\n  <ion-grid no-padding>\n    <ion-row>\n      <ion-col col-md-6 col-12>\n        <ion-card class="list-card card-places">\n          <ion-card-header ion-item>\n            <i item-left class="fa fa-globe"></i>\n            <h3>Miejsca</h3>\n            <button item-right ion-button icon-only clear (click)="showPlaceCreate()">\n              <ion-icon name="add"></ion-icon>\n            </button>\n          </ion-card-header>\n          <ion-card-content no-padding>\n            <ion-scroll scrollY="true">\n              <common-item-list class="place-list" [data]="placeStore.get()" [store]="placeStore"></common-item-list>\n            </ion-scroll>\n          </ion-card-content>\n        </ion-card>\n\n        <ion-card class="list-card card-employees">\n          <ion-card-header ion-item>\n            <i item-left class="fa fa-users"></i>\n            <h3>Pracownicy</h3>\n            <button item-right ion-button icon-only clear (click)="showEmployeeCreate()">\n              <ion-icon name="add"></ion-icon>\n            </button>\n          </ion-card-header>\n          <ion-card-content no-padding>\n            <ion-searchbar color="primary" [(ngModel)]="employeeFilter" placeholder="Szukaj"></ion-searchbar>\n            <ion-scroll scrollY="true">\n              <common-item-list class="employee-list" [data]="model?.employees" [store]="employeeStore" detail="employee" [filter]="employeeFilter"></common-item-list>\n            </ion-scroll>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n\n      <ion-col col-md-6 col-12>\n        <ion-card class="list-card card-clients">\n          <ion-card-header ion-item>\n            <i item-left class="fa fa-address-book-o"></i>\n            <h3>Klienci</h3>\n            <button item-right ion-button icon-only clear (click)="showClientCreate()">\n              <ion-icon name="add"></ion-icon>\n            </button>\n          </ion-card-header>\n          <ion-card-content no-padding>\n            <ion-searchbar color="primary" [(ngModel)]="clientFilter" placeholder="Szukaj"></ion-searchbar>\n            <ion-scroll scrollY="true">\n              <common-item-list class="employee-list" [data]="clientStore.get()" [store]="clientStore" detail="client" [filter]="clientFilter"></common-item-list>\n            </ion-scroll>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/company/company-detail/company-detail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_4_app_services_company_company_store__["a" /* CompanyStore */],
        __WEBPACK_IMPORTED_MODULE_5_app_services_client_client_store__["a" /* ClientStore */],
        __WEBPACK_IMPORTED_MODULE_7_app_services_place_place_store__["a" /* PlaceStore */],
        __WEBPACK_IMPORTED_MODULE_6_app_services_employee_employee_store__["a" /* EmployeeStore */]])
], CompanyDetailPage);

//# sourceMappingURL=company-detail.js.map

/***/ })

});
//# sourceMappingURL=0.main.js.map