webpackJsonp([11],{

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__client_detail__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__ = __webpack_require__(376);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientDetailModule", function() { return ClientDetailModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ClientDetailModule = (function () {
    function ClientDetailModule() {
    }
    return ClientDetailModule;
}());
ClientDetailModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__client_detail__["a" /* ClientDetailPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__client_detail__["a" /* ClientDetailPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__client_detail__["a" /* ClientDetailPage */]
        ]
    })
], ClientDetailModule);

//# sourceMappingURL=client-detail.module.js.map

/***/ }),

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_client_client_store__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_place_place_store__ = __webpack_require__(57);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientDetailPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ClientDetailPage = (function () {
    function ClientDetailPage(params, viewCtrl, utils, clientStore, placeStore) {
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.utils = utils;
        this.clientStore = clientStore;
        this.placeStore = placeStore;
        this.clientFilter = '';
    }
    ClientDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        this.utils.showLoading('Ładowanie klientów...');
        this.sub = this.clientStore.subscribe(function (loaded) {
            if (!loaded) {
                return;
            }
            _this.model = _this.clientStore.getItem(_this.params.data.id);
            _this.utils.stopLoading();
        });
    };
    ClientDetailPage.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    return ClientDetailPage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", Object)
], ClientDetailPage.prototype, "model", void 0);
ClientDetailPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        name: 'client',
        segment: 'client/:id',
        defaultHistory: ['companies']
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({template:/*ion-inline-start:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/client/client-detail/client-detail.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button icon-only menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Klient</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="detail-page client-detail">\n  <div class="detail-header">\n    <img src="http://www.egobody.pl/wp-content/uploads/2017/02/TreningPersonalny-150x150.jpg">\n    <ion-card text-center>\n      <h2> {{ model?.name }} </h2>\n      <h4> Klient </h4>\n    </ion-card>\n  </div>\n\n  <div padding class="hidden-lg">\n    <ion-segment [(ngModel)]="clientFilter">\n      <ion-segment-button value="sessions">\n        <i class="fa fa-2x fa-handshake-o"></i>\n        <h3>Spotkania</h3>\n      </ion-segment-button>\n      <ion-segment-button value="measurements">\n        <i class="fa fa-2x fa-bar-chart"></i>\n        <h3>Pomiary</h3>\n      </ion-segment-button>\n      <ion-segment-button value="routines">\n        <i class="fa fa-2x fa-book"></i>\n        <h3>Treningi</h3>\n      </ion-segment-button>\n      <ion-segment-button value="diet">\n        <i class="fa fa-2x fa-cutlery"></i>\n        <h3>Dieta</h3>\n      </ion-segment-button>\n      <ion-segment-button value="bills">\n        <i class="fa fa-2x fa-money"></i>\n        <h3>Rachunki</h3>\n      </ion-segment-button>\n      <ion-segment-button value="notes">\n        <i class="fa fa-2x fa-sticky-note-o"></i>\n        <h3>Notatki</h3>\n      </ion-segment-button>\n    </ion-segment>\n  </div>\n\n  <ion-grid no-padding class="hidden-above-lg">\n    <ion-row>\n      <ion-col col-lg-2 col-md-3 col-sm-4 col-6>\n        <ion-card class="button-card card-sessions">\n          <ion-card-header text-center (click)="showPlaceCreate()">\n            <i class="fa fa-handshake-o"></i>\n            <h3>Spotkania</h3>\n          </ion-card-header>\n        </ion-card>\n      </ion-col>\n\n      <ion-col col-lg-2 col-md-3 col-sm-4 col-6>\n        <ion-card class="button-card card-measurements">\n          <ion-card-header text-center (click)="showPlaceCreate()">\n            <i class="fa fa-bar-chart"></i>\n            <h3>Pomiary</h3>\n          </ion-card-header>\n        </ion-card>\n      </ion-col>\n\n      <ion-col col-lg-2 col-md-3 col-sm-4 col-6>\n        <ion-card class="button-card card-routines">\n          <ion-card-header text-center (click)="showPlaceCreate()">\n            <i class="fa fa-book"></i>\n            <h3>Treningi</h3>\n          </ion-card-header>\n        </ion-card>\n      </ion-col>\n\n      <ion-col col-lg-2 col-md-3 col-sm-4 col-6>\n        <ion-card class="button-card card-diet">\n          <ion-card-header text-center (click)="showPlaceCreate()">\n            <i class="fa fa-cutlery"></i>\n            <h3>Dieta</h3>\n          </ion-card-header>\n        </ion-card>\n      </ion-col>\n\n      <ion-col col-lg-2 col-md-3 col-sm-4 col-6>\n        <ion-card class="button-card card-bills">\n          <ion-card-header text-center (click)="showPlaceCreate()">\n            <i class="fa fa-money"></i>\n            <h3>Rachunki</h3>\n          </ion-card-header>\n        </ion-card>\n      </ion-col>\n\n      <ion-col col-lg-2 col-md-3 col-sm-4 col-6>\n        <ion-card class="button-card card-notes">\n          <ion-card-header text-center (click)="showPlaceCreate()">\n            <i class="fa fa-sticky-note-o"></i>\n            <h3>Notatki</h3>\n          </ion-card-header>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/client/client-detail/client-detail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_3_app_services_client_client_store__["a" /* ClientStore */],
        __WEBPACK_IMPORTED_MODULE_4_app_services_place_place_store__["a" /* PlaceStore */]])
], ClientDetailPage);

//# sourceMappingURL=client-detail.js.map

/***/ })

});
//# sourceMappingURL=11.main.js.map