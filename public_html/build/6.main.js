webpackJsonp([6],{

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reset__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__ = __webpack_require__(376);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommonResetModule", function() { return CommonResetModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CommonResetModule = (function () {
    function CommonResetModule() {
    }
    return CommonResetModule;
}());
CommonResetModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__reset__["a" /* ResetPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__reset__["a" /* ResetPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__reset__["a" /* ResetPage */]
        ]
    })
], CommonResetModule);

//# sourceMappingURL=reset.module.js.map

/***/ }),

/***/ 509:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_auth_auth_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_client_client_store__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_trainer_trainer_store__ = __webpack_require__(42);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ResetPage = (function () {
    function ResetPage(nav, alertCtrl, utils, auth, clientStore, trainerStore) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.utils = utils;
        this.auth = auth;
        this.clientStore = clientStore;
        this.trainerStore = trainerStore;
        this.user = {};
        this.submitted = false;
    }
    ResetPage.prototype.openLoginPage = function () {
        this.nav.push('login');
    };
    ResetPage.prototype.reset = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.valid) {
            this.utils.showLoading('Resetowanie...');
            this.auth.reset(form.value)
                .then(function () { return _this.postReset(); })
                .catch(function () { return _this.errorReset(); });
        }
    };
    ResetPage.prototype.postReset = function () {
        this.utils.stopLoading();
        this.alertCtrl.create({
            title: 'Wysłano',
            message: 'Instrukcje zostały wysłane na adres e-mail.',
            buttons: ['Ok']
        }).present();
    };
    ResetPage.prototype.errorReset = function () {
        this.utils.stopLoading();
        this.alertCtrl.create({
            title: 'Błąd',
            message: 'Nieprawidłowy login.',
            buttons: ['Ok']
        }).present();
    };
    return ResetPage;
}());
ResetPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        name: 'reset',
        segment: 'reset'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({template:/*ion-inline-start:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/common/reset/reset.html"*/'<ion-content class="reset-page box-page">\n  <div class="box-overlay" text-center>\n    <div class="box" center-col padding>\n      <div class="box-header" padding>\n        <img src="/assets/img/planelo-logo.png">\n      </div>\n\n      <form #form="ngForm" novalidate>\n        <div center-col>\n          <ion-list>\n            <ion-list-header>Reset hasła</ion-list-header>\n            <ion-item>\n              <ion-label floating color="primary"><ion-icon name="person"></ion-icon> Adres e-mail</ion-label>\n              <ion-input [(ngModel)]="user.email" name="email" type="text" #email="ngModel" spellcheck="false" autocapitalize="off" required>\n              </ion-input>\n            </ion-item>\n            <p ion-text [hidden]="email.valid || submitted == false" color="danger" padding-left>\n              Nazwa użytkownika jest wymagana\n            </p>\n          </ion-list>\n\n          <button ion-button (click)="reset(form)" type="submit">Zresetuj</button>\n        </div>\n      </form>\n\n      <p padding-top>\n        <button ion-button (click)="openLoginPage()" clear block>Zaloguj się</button>\n      </p>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/common/reset/reset.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_3_app_services_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_4_app_services_client_client_store__["a" /* ClientStore */],
        __WEBPACK_IMPORTED_MODULE_5_app_services_trainer_trainer_store__["a" /* TrainerStore */]])
], ResetPage);

//# sourceMappingURL=reset.js.map

/***/ })

});
//# sourceMappingURL=6.main.js.map