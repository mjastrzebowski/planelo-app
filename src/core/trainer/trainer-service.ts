import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ITrainer, Trainer } from './trainer';

@Injectable()
export class TrainerService {
  constructor(private af: AngularFire) {}

  createTrainer(title: string, email: string, hours: any): void {
    this.ref.push(new Trainer(title, email, hours), (error: Error) => {
      if (error) {
        console.error('ERROR @ createTrainer :', error);
      }
    });
  }

  deleteTrainer(trainer: ITrainer): void {
    this.ref.child(trainer.key).remove((error: Error) => {
      if (error) {
        console.error('ERROR @ deleteTrainer :', error);
      }
    });
  }

  updateTrainer(trainer: ITrainer, changes: any): void {
    this.ref.child(trainer.key).update(changes, (error: Error) => {
      if (error) {
        console.error('ERROR @ updateTrainer :', error);
      }
    });
  }
}
