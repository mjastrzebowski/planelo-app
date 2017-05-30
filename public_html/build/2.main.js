webpackJsonp([2],{

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__employee_detail__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__ = __webpack_require__(376);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmployeeDetailModule", function() { return EmployeeDetailModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var EmployeeDetailModule = (function () {
    function EmployeeDetailModule() {
    }
    return EmployeeDetailModule;
}());
EmployeeDetailModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__employee_detail__["a" /* EmployeeDetailPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__employee_detail__["a" /* EmployeeDetailPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__employee_detail__["a" /* EmployeeDetailPage */]
        ]
    })
], EmployeeDetailModule);

//# sourceMappingURL=employee-detail.module.js.map

/***/ }),

/***/ 515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_employee_employee_store__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_client_client_store__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_place_place_store__ = __webpack_require__(57);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeDetailPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EmployeeDetailPage = (function () {
    function EmployeeDetailPage(params, viewCtrl, utils, employeeStore, clientStore, placeStore) {
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.utils = utils;
        this.employeeStore = employeeStore;
        this.clientStore = clientStore;
        this.placeStore = placeStore;
        this.employeeFilter = '';
        this.clientFilter = '';
    }
    EmployeeDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        this.utils.showLoading('Ładowanie firm...');
        this.sub = this.employeeStore.subscribe(function (loaded) {
            if (!loaded) {
                return;
            }
            _this.model = _this.employeeStore.getItem(_this.params.data.id);
            _this.utils.stopLoading();
        });
    };
    EmployeeDetailPage.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    return EmployeeDetailPage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", Object)
], EmployeeDetailPage.prototype, "model", void 0);
EmployeeDetailPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        name: 'employee',
        segment: 'employee/:id',
        defaultHistory: ['companies']
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({template:/*ion-inline-start:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/employee/employee-detail/employee-detail.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button icon-only menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Pracownik</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="detail-page employee-detail">\n  <div class="detail-header">\n    <img src="http://www.egobody.pl/wp-content/uploads/2017/02/TreningPersonalny-150x150.jpg">\n    <ion-card text-center>\n      <h2> {{ model?.name }} </h2>\n      <h4> Pracownik </h4>\n    </ion-card>\n  </div>\n\n  <ion-card class="list-card card-sessions">\n    <ion-card-header ion-item>\n      <i item-left class="fa fa-handshake-o"></i>\n      <h3>Spotkania</h3>\n      <button item-right ion-button icon-only clear (click)="showPlaceCreate()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-card-header>\n    <ion-card-content no-padding>\n      <ion-scroll scrollY="true">\n        <common-item-list class="place-list" [data]="placeStore.get()" [store]="placeStore"></common-item-list>\n      </ion-scroll>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/employee/employee-detail/employee-detail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_3_app_services_employee_employee_store__["a" /* EmployeeStore */],
        __WEBPACK_IMPORTED_MODULE_4_app_services_client_client_store__["a" /* ClientStore */],
        __WEBPACK_IMPORTED_MODULE_5_app_services_place_place_store__["a" /* PlaceStore */]])
], EmployeeDetailPage);

//# sourceMappingURL=employee-detail.js.map

/***/ })

});
//# sourceMappingURL=2.main.js.map