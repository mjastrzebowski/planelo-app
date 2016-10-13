import { Component, Input, Pipe } from '@angular/core';

import { IWorkout } from '../../../core/workout/workout';
import { WorkoutService } from '../../../core/workout/workout-service';

import { PlaceStore } from '../../../core/place/place-store';
import { ClientStore } from '../../../core/client/client-store';
import { TrainerStore } from '../../../core/trainer/trainer-store';

// import { ClientDetailPage } from './pages/client/client-detail/client-detail';


@Component({
  selector: 'workout-item',
  templateUrl: 'workout-item.html'
})
export class WorkoutItem {
  @Input() model: IWorkout;

  editing: boolean = false;
  // title: string = '';

  constructor(workoutService: WorkoutService, public placeStore: PlaceStore, public clientStore: ClientStore, public trainerStore: TrainerStore) {
  }

  delete(): void {
    this.workoutService.deleteWorkout(this.model);
  }

  editTitle(): void {
    this.editing = true;
    // this.title = this.model.title;
  }

  // saveTitle(): void {
  //   if (this.editing) {
  //     const title: string = this.title.trim();
  //     if (title.length && title !== this.model.title) {
  //       this.workoutService.updateWorkout(this.model, {title});
  //     }
  //     this.stopEditing();
  //   }
  // }

  stopEditing(): void {
    this.editing = false;
  }

  toggleStatus(): void {
    this.workoutService.updateWorkout(this.model, {
      completed: !this.model.completed
    });
  }
}
