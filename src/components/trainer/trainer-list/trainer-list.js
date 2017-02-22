var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChildren } from '@angular/core';
import { TrainerStore } from 'app/core/trainer/trainer-store';
var TrainerList = (function () {
    function TrainerList(trainerStore) {
        this.trainerStore = trainerStore;
        this.trainers = [];
    }
    TrainerList.prototype.isEmpty = function () {
        if (this.trainers.length) {
            var list = this.trainers.filter(function (trainer) {
                return !trainer.model.hide;
            });
            return list.length === 0;
        }
        return this.trainers.length;
    };
    return TrainerList;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], TrainerList.prototype, "filter", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TrainerList.prototype, "limit", void 0);
__decorate([
    ViewChildren('trainers'),
    __metadata("design:type", Object)
], TrainerList.prototype, "trainers", void 0);
TrainerList = __decorate([
    Component({
        selector: 'trainer-list',
        templateUrl: 'trainer-list.html'
    }),
    __metadata("design:paramtypes", [TrainerStore])
], TrainerList);
export { TrainerList };
//# sourceMappingURL=trainer-list.js.map