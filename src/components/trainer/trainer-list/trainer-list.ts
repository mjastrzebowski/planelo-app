import { Component, Input, ViewChildren } from '@angular/core';

import { TrainerStore } from 'app/core/trainer/trainer-store';


@Component({
  selector: 'trainer-list',
  templateUrl: 'trainer-list.html'
})
export class TrainerList {
  @Input() filter: any;
  @Input() limit: any;
  @ViewChildren('trainers') trainers: any;

  constructor(
    public trainerStore: TrainerStore
  ) {
    this.trainers = [];
  }

  isEmpty() {
    if (this.trainers.length) {
      let list = this.trainers.filter(trainer => {
        return !trainer.model.hide;
      });
      return list.length === 0;
    }
    return this.trainers.length;
  }
}
