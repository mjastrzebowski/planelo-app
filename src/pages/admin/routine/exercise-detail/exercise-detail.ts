import { Component, Input } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { IExercise } from 'app/services/exercise/exercise';
import { ExerciseStore } from 'app/services/exercise/exercise-store';

import { ExerciseCategoryStore } from 'app/services/exercise-category/exercise-category-store';
import { EquipmentStore } from 'app/services/equipment/equipment-store';
import { MuscleStore } from 'app/services/muscle/muscle-store';

@Component({
  templateUrl: 'exercise-detail.html'
})
export class ExerciseDetailPage {
  @Input() model: IExercise;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private utils: Utils,
    private exerciseStore: ExerciseStore,
    private exerciseCategoryStore: ExerciseCategoryStore,
    private equipmentStore: EquipmentStore,
    private muscleStore: MuscleStore
  ) {
    this.model = this.exerciseStore.getItem(this.params.data) || new IExercise();
  }
}
