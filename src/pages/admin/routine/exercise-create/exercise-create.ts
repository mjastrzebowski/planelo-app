import { Component, Input, Renderer } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { IExercise } from 'app/services/exercise/exercise';
import { ExerciseStore } from 'app/services/exercise/exercise-store';

import { ExerciseCategoryStore } from 'app/services/exercise-category/exercise-category-store';
import { EquipmentStore } from 'app/services/equipment/equipment-store';
import { MuscleStore } from 'app/services/muscle/muscle-store';

@Component({
  templateUrl: 'exercise-create.html'
})
export class ExerciseCreateModal {
  @Input() model: IExercise;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private renderer: Renderer,
    private utils: Utils,
    private exerciseStore: ExerciseStore,
    private exerciseCategoryStore: ExerciseCategoryStore,
    private equipmentStore: EquipmentStore,
    private muscleStore: MuscleStore
  ) {
    this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement, 'my-popup', true);
  }

  ngOnInit(): void {
    this.model = this.exerciseStore.getItem(this.params.data) || new IExercise();
  }

  save(): void {
    this.utils.showLoading('Zapisywanie ćwiczenia...');
    this.exerciseStore.create(this.model).then(() => {
      this.utils.stopLoading();
      this.utils.showMessage('Ćwiczenie dodane.');
      this.dismiss();
    });
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
