webpackJsonp([10],{

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__import__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__ = __webpack_require__(376);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommonImportModule", function() { return CommonImportModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CommonImportModule = (function () {
    function CommonImportModule() {
    }
    return CommonImportModule;
}());
CommonImportModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__import__["a" /* ImportPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__import__["a" /* ImportPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__import__["a" /* ImportPage */]
        ]
    })
], CommonImportModule);

//# sourceMappingURL=import.module.js.map

/***/ }),

/***/ 505:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_auth_auth_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_client_client_store__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_notification_notification_store__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_services_place_place_store__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_services_trainer_trainer_store__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_services_profile_session_profile_session_store__ = __webpack_require__(58);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImportPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ImportPage = (function () {
    function ImportPage(alertCtrl, auth, clientStore, notificationStore, placeStore, trainerStore, profileSessionStore) {
        this.alertCtrl = alertCtrl;
        this.auth = auth;
        this.clientStore = clientStore;
        this.notificationStore = notificationStore;
        this.placeStore = placeStore;
        this.trainerStore = trainerStore;
        this.profileSessionStore = profileSessionStore;
        this.models = ['Notification'];
        this.model = this.models[0];
        this.submitted = false;
        this.import = {};
    }
    ImportPage.prototype.resolveItemByKey = function (item, service) {
        if (typeof item === 'object') {
            return JSON.stringify(item);
        }
        return service.getItemByKey(item);
    };
    ImportPage.prototype.getAdminId = function (key) {
        switch (key) {
            case '-KBN-b7GjsB6FS8Opmx0':
            case '-KNSsNzm8WH_t_lwASAz': {
                return 106;
            }
            case '-KBN-fYLnmIQ_6pSwnV6': {
                return 11;
            }
            default: {
                return 2;
            }
        }
    };
    ImportPage.prototype.importNotificationItem = function (item) {
        item.admin = this.getAdminId(item.owner);
        switch (item.type) {
            case 'clientAdded':
                break;
            case 'clientRemoved':
                break;
            case 'workoutAdded':
                break;
            case 'workoutRemoved':
                break;
            case 'workoutRejected':
                break;
        }
        item.client = this.resolveItemByKey(item.client, this.clientStore);
        item.workout = this.resolveItemByKey(item.workout, this.profileSessionStore);
        this.notificationStore.create(item);
    };
    ImportPage.prototype.save = function (form) {
        var _this = this;
        this.submitted = true;
        var data = __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__["a" /* Utils */].objectToArray(JSON.parse(form.value.db));
        console.log(this.model);
        switch (this.model) {
            case this.notificationStore.model:
                data.forEach(function (item) {
                    _this.importNotificationItem(item);
                });
                break;
        }
    };
    ImportPage.prototype.postChangePassword = function () {
        var alert = this.alertCtrl.create({
            title: 'Zmieniono',
            message: 'Twoje hasło zostało zmienione.',
            buttons: ['Ok']
        });
        alert.present();
    };
    ImportPage.prototype.errorChangePassword = function () {
        var alert = this.alertCtrl.create({
            title: 'Błąd',
            message: 'Obecne hasło jest nieprawidłowe.',
            buttons: ['Ok']
        });
        alert.present();
    };
    return ImportPage;
}());
ImportPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        name: 'import',
        segment: 'import'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({template:/*ion-inline-start:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/common/import/import.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button icon-only menuToggle="left">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>Import danych</ion-title>\n\n    <ion-buttons end>\n      <notification-counter></notification-counter>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="import-page">\n  <ion-list>\n    <form #form="ngForm" novalidate>\n      <ion-item>\n        <ion-label floating>Model danych</ion-label>\n        <ion-select [(ngModel)]="model" name="model">\n          <ion-option *ngFor="let model of models" [value]="model">{{ model }}</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Dane do importu</ion-label>\n        <ion-textarea [(ngModel)]="import.db" name="db" #db="ngModel" required></ion-textarea>\n      </ion-item>\n\n      <ion-row responsive-sm>\n        <ion-col>\n          <button ion-button (click)="save(form)" type="submit" color="primary" block>Import</button>\n        </ion-col>\n      </ion-row>\n    </form>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/common/import/import.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3_app_services_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_4_app_services_client_client_store__["a" /* ClientStore */],
        __WEBPACK_IMPORTED_MODULE_5_app_services_notification_notification_store__["a" /* NotificationStore */],
        __WEBPACK_IMPORTED_MODULE_6_app_services_place_place_store__["a" /* PlaceStore */],
        __WEBPACK_IMPORTED_MODULE_7_app_services_trainer_trainer_store__["a" /* TrainerStore */],
        __WEBPACK_IMPORTED_MODULE_8_app_services_profile_session_profile_session_store__["a" /* ProfileSessionStore */]])
], ImportPage);

//# sourceMappingURL=import.js.map

/***/ })

});
//# sourceMappingURL=10.main.js.map