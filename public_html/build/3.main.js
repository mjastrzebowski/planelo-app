webpackJsonp([3],{

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__employee_create__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__ = __webpack_require__(376);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmployeeCreateModule", function() { return EmployeeCreateModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var EmployeeCreateModule = (function () {
    function EmployeeCreateModule() {
    }
    return EmployeeCreateModule;
}());
EmployeeCreateModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__employee_create__["a" /* EmployeeCreateModal */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_app_components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__employee_create__["a" /* EmployeeCreateModal */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__employee_create__["a" /* EmployeeCreateModal */]
        ]
    })
], EmployeeCreateModule);

//# sourceMappingURL=employee-create.module.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_employee_employee_store__ = __webpack_require__(128);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeCreateModal; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EmployeeCreateModal = (function () {
    function EmployeeCreateModal(params, viewCtrl, renderer, utils, employeeStore) {
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.renderer = renderer;
        this.utils = utils;
        this.employeeStore = employeeStore;
        this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement, 'my-popup', true);
    }
    EmployeeCreateModal.prototype.ngOnInit = function () {
        this.model = this.employeeStore.getItem(this.params.data);
    };
    EmployeeCreateModal.prototype.save = function () {
        var _this = this;
        this.utils.showLoading('Zapisywanie firmy...');
        this.employeeStore.create(this.model).then(function () {
            _this.utils.stopLoading();
            _this.utils.showMessage('Firma dodana.');
            _this.dismiss();
        });
    };
    EmployeeCreateModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return EmployeeCreateModal;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", Object)
], EmployeeCreateModal.prototype, "model", void 0);
EmployeeCreateModal = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        name: 'employees/create',
        segment: 'employees/create'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({template:/*ion-inline-start:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/employee/employee-create/employee-create.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Nowa firma</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span color="primary" showWhen="ios">Zamknij</span>\n        <ion-icon name="close" hideWhen="ios"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="has-header">\n  <form #form="ngForm" novalidate>\n    <ion-list>\n      <ion-item>\n        <ion-label floating>Nazwa</ion-label>\n        <ion-input type="text" [(ngModel)]="model.name" name="name"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Opis</ion-label>\n        <ion-textarea [(ngModel)]="model.description" name="description"></ion-textarea>\n      </ion-item>\n    </ion-list>\n    <ion-row responsive-sm>\n      <ion-col>\n        <button ion-button color="primary" block type="submit" (click)="save()">Zapisz</button>\n      </ion-col>\n      <ion-col>\n        <button ion-button color="light" block (click)="dismiss()">Anuluj</button>\n      </ion-col>\n    </ion-row>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/mjastrzebowski/GitHub/egobody-david-2.0/src/pages/employee/employee-create/employee-create.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Renderer */],
        __WEBPACK_IMPORTED_MODULE_2_app_providers_utils__["a" /* Utils */],
        __WEBPACK_IMPORTED_MODULE_3_app_services_employee_employee_store__["a" /* EmployeeStore */]])
], EmployeeCreateModal);

//# sourceMappingURL=employee-create.js.map

/***/ })

});
//# sourceMappingURL=3.main.js.map