webpackJsonp([5],{

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__ = __webpack_require__(376);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommonSettingsModule", function() { return CommonSettingsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CommonSettingsModule = (function () {
    function CommonSettingsModule() {
    }
    return CommonSettingsModule;
}());
CommonSettingsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */]
        ]
    })
], CommonSettingsModule);

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 510:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_auth_auth_service__ = __webpack_require__(27);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsPage = (function () {
    function SettingsPage(alertCtrl, auth) {
        this.alertCtrl = alertCtrl;
        this.auth = auth;
        this.submitted = false;
        this.settings = {};
    }
    SettingsPage.prototype.ngOnInit = function () {
        this.settings.email = this.auth.email;
    };
    SettingsPage.prototype.changePassword = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.valid) {
            this.auth.changePassword(form.value)
                .then(function () { return _this.postChangePassword(); })
                .catch(function () { return _this.errorChangePassword(); });
        }
    };
    SettingsPage.prototype.postChangePassword = function () {
        var alert = this.alertCtrl.create({
            title: 'Zmieniono',
            message: 'Twoje hasło zostało zmienione.',
            buttons: ['Ok']
        });
        alert.present();
    };
    SettingsPage.prototype.errorChangePassword = function () {
        var alert = this.alertCtrl.create({
            title: 'Błąd',
            message: 'Obecne hasło jest nieprawidłowe.',
            buttons: ['Ok']
        });
        alert.present();
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        name: 'settings',
        segment: 'settings'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({template:/*ion-inline-start:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/common/settings/settings.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button icon-only menuToggle="left">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>Ustawienia</ion-title>\n\n    <ion-buttons end>\n      <notification-counter></notification-counter>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="settings-page">\n  <ion-list>\n    <form #form="ngForm" novalidate>\n      <ion-item>\n        <ion-label floating primary>Użytkownik</ion-label>\n        <ion-input [(ngModel)]="settings.email" name="email" type="email" #email="ngModel" required readonly>\n        </ion-input>\n      </ion-item>\n      <p [hidden]="email.valid || submitted == false" danger padding-left>\n        Nazwa użytkownika jest wymagana\n      </p>\n\n      <ion-item>\n        <ion-label floating primary>Obecne hasło</ion-label>\n        <ion-input [(ngModel)]="settings.oldPassword" name="oldPassword" type="password" #oldPassword="ngModel" required>\n        </ion-input>\n      </ion-item>\n      <p [hidden]="oldPassword.valid || submitted == false" danger padding-left>\n        Obecne hasło jest wymagane\n      </p>\n\n      <ion-item>\n        <ion-label floating primary>Nowe hasło</ion-label>\n        <ion-input [(ngModel)]="settings.newPassword" name="newPassword" type="password" #newPassword="ngModel" required>\n        </ion-input>\n      </ion-item>\n      <p [hidden]="newPassword.valid || submitted == false" danger padding-left>\n        Nowe hasło jest wymagane\n      </p>\n\n      <ion-row responsive-sm>\n        <ion-col>\n          <button ion-button (click)="changePassword(form)" type="submit" color="primary" block>Zapisz</button>\n        </ion-col>\n      </ion-row>\n    </form>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/common/settings/settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2_app_services_auth_auth_service__["a" /* AuthService */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ })

});
//# sourceMappingURL=5.main.js.map