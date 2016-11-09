import { Component, Input } from '@angular/core';

import { IWorkout } from '../../../core/workout/workout';
import { WorkoutStore } from '../../../core/workout/workout-store';

import { PlaceStore } from '../../../core/place/place-store';
import { TrainerStore } from '../../../core/trainer/trainer-store';


@Component({
  selector: 'workout-item',
  templateUrl: 'workout-item.html'
})
export class WorkoutItem {
  @Input() model: IWorkout;
  @Input() changeDate: any;

  constructor(
    private workoutStore: WorkoutStore,
    public placeStore: PlaceStore,
    public trainerStore: TrainerStore
  ) {}

  delete(): void {
    this.workoutStore.removeWorkout(this.model);
  }
}
