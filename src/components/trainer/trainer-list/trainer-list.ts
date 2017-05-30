import { Component, Input, ViewChildren, ChangeDetectorRef } from '@angular/core';

import { TrainerStore } from 'app/services/trainer/trainer-store';


@Component({
  selector: 'trainer-list',
  templateUrl: 'trainer-list.html'
})
export class TrainerList {
  private sub;
  @Input() filter: any;
  @Input() limit: any;
  @ViewChildren('trainers') trainers: any;

  constructor(
    private cdr: ChangeDetectorRef,
    public trainerStore: TrainerStore
  ) {}

  ngOnInit(): void {
    this.sub = this.trainerStore.subscribe(loaded => {
      if (loaded) {
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  isEmpty() {
    if (this.trainers && this.trainers.length) {
      let list = this.trainers.filter(trainer => {
        return !trainer.model.hide;
      });
      return list.length === 0;
    }
    return true;
  }
}
