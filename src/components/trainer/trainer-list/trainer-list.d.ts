import { TrainerStore } from 'app/core/trainer/trainer-store';
export declare class TrainerList {
    trainerStore: TrainerStore;
    filter: any;
    limit: any;
    trainers: any;
    constructor(trainerStore: TrainerStore);
    isEmpty(): any;
}
