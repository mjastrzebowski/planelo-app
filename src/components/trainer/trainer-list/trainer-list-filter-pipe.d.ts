import { PipeTransform } from '@angular/core';
import { ITrainer } from 'app/core/trainer/trainer';
export declare class TrainerListFilterPipe implements PipeTransform {
    transform(list: ITrainer[], filter?: any, limit?: any): ITrainer[];
}
