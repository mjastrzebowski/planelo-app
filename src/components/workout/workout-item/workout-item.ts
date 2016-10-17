import { Component, Input } from '@angular/core';

import { IWorkout } from '../../../core/workout/workout';
import { WorkoutService } from '../../../core/workout/workout-service';

import { PlaceStore } from '../../../core/place/place-store';
import { TrainerStore } from '../../../core/trainer/trainer-store';


@Component({
  selector: 'workout-item',
  templateUrl: 'workout-item.html'
})
export class WorkoutItem {
  @Input() model: IWorkout;

  constructor(
    private workoutService: WorkoutService,
    public placeStore: PlaceStore,
    public trainerStore: TrainerStore
  ) {}

  delete(): void {
    this.workoutService.deleteWorkout(this.model);
  }
}
