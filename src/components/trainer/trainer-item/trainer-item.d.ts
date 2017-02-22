import { App } from 'ionic-angular';
import { ITrainer } from 'app/core/trainer/trainer';
import { TrainerStore } from 'app/core/trainer/trainer-store';
export declare class TrainerItem {
    private app;
    private trainerStore;
    model: ITrainer;
    nav: any;
    constructor(app: App, trainerStore: TrainerStore);
    delete(): void;
    goToTrainerDetail(trainer: any): void;
}
