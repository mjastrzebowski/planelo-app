webpackJsonp([9],{

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__ = __webpack_require__(376);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommonLoginModule", function() { return CommonLoginModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CommonLoginModule = (function () {
    function CommonLoginModule() {
    }
    return CommonLoginModule;
}());
CommonLoginModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]
        ]
    })
], CommonLoginModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_auth_auth_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_client_client_store__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_trainer_trainer_store__ = __webpack_require__(42);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = (function () {
    function LoginPage(nav, alertCtrl, utils, auth, clientStore, trainerStore) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.utils = utils;
        this.auth = auth;
        this.clientStore = clientStore;
        this.trainerStore = trainerStore;
        this.user = {};
        this.submitted = false;
    }
    LoginPage.prototype.openResetPage = function () {
        this.nav.push('reset');
    };
    LoginPage.prototype.openRegisterPage = function () {
        this.nav.push('register');
    };
    LoginPage.prototype.login = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.valid) {
            this.utils.showLoading('Logowanie...');
            this.auth.login(form.value)
                .then(function () { return _this.postLogin(); })
                .catch(function () { return _this.errorLogin(); });
        }
    };
    LoginPage.prototype.logout = function () {
        this.auth.logout();
    };
    LoginPage.prototype.postLogin = function () {
        this.utils.stopLoading();
        // this.router.navigate(['/Workouts']);
        // this.nav.setRoot(TrainingListPage);
    };
    LoginPage.prototype.errorLogin = function () {
        this.utils.stopLoading();
        this.alertCtrl.create({
            title: 'Błąd',
            message: 'Nieprawidłowy login lub hasło.',
            buttons: ['Ok']
        }).present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        name: 'login',
        segment: 'login'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({template:/*ion-inline-start:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/common/login/login.html"*/'<ion-content class="login-page box-page">\n  <div class="box-overlay" text-center>\n    <div class="box" center-col padding>\n      <div class="box-header" padding>\n        <img src="/assets/img/planelo-logo.png">\n      </div>\n\n      <form #form="ngForm" novalidate>\n        <div center-col>\n          <ion-list>\n            <ion-list-header>Logowanie</ion-list-header>\n            <ion-item>\n              <ion-label floating color="primary"><ion-icon name="person"></ion-icon> Użytkownik</ion-label>\n              <ion-input [(ngModel)]="user.username" name="username" type="text" #username="ngModel" spellcheck="false" autocapitalize="off" autofocus required>\n              </ion-input>\n            </ion-item>\n            <p ion-text [hidden]="username.valid || submitted == false" color="danger" padding-left>\n              Nazwa użytkownika jest wymagana\n            </p>\n\n            <ion-item>\n              <ion-label floating color="primary"><ion-icon name="lock"></ion-icon> Hasło</ion-label>\n              <ion-input [(ngModel)]="user.password" name="password" type="password" #password="ngModel" required>\n              </ion-input>\n            </ion-item>\n            <p ion-text [hidden]="password.valid || submitted == false" color="danger" padding-left>\n              Hasło jest wymagane\n            </p>\n          </ion-list>\n\n          <button ion-button (click)="login(form)" type="submit">Zaloguj</button>\n        </div>\n      </form>\n\n      <p padding-top>\n        Nie masz konta?\n        <button ion-button (click)="openRegisterPage()" clear block>Zarejestruj się</button>\n      </p>\n\n      <p>\n        Zapomniałeś hasła?\n        <button ion-button (click)="openResetPage()" clear block>Reset hasła</button>\n      </p>\n    </div>\n    <p color="light">© 2017 planelo.com • Wszelkie prawa zastrzeżone.</p>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/common/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_3_app_services_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_4_app_services_client_client_store__["a" /* ClientStore */],
        __WEBPACK_IMPORTED_MODULE_5_app_services_trainer_trainer_store__["a" /* TrainerStore */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=9.main.js.map