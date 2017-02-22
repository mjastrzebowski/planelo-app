var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { App } from 'ionic-angular';
import { ITrainer } from 'app/core/trainer/trainer';
import { TrainerStore } from 'app/core/trainer/trainer-store';
import { TrainerDetailPage } from 'app/pages/admin/trainer/trainer-detail/trainer-detail';
var TrainerItem = (function () {
    function TrainerItem(app, trainerStore) {
        this.app = app;
        this.trainerStore = trainerStore;
    }
    TrainerItem.prototype.delete = function () {
        this.trainerStore.removeTrainer(this.model);
    };
    TrainerItem.prototype.goToTrainerDetail = function (trainer) {
        this.nav = this.app.getActiveNav();
        this.nav.push(TrainerDetailPage, trainer);
    };
    return TrainerItem;
}());
__decorate([
    Input(),
    __metadata("design:type", ITrainer)
], TrainerItem.prototype, "model", void 0);
TrainerItem = __decorate([
    Component({
        selector: 'trainer-item',
        templateUrl: 'trainer-item.html'
    }),
    __metadata("design:paramtypes", [App,
        TrainerStore])
], TrainerItem);
export { TrainerItem };
//# sourceMappingURL=trainer-item.js.map