import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IExercise, Exercise } from './exercise';
import { ExerciseService } from './exercise-service';

import { ExerciseCommentStore } from 'app/services/exercise-comment/exercise-comment-store';
import { ExerciseCategoryStore } from 'app/services/exercise-category/exercise-category-store';
import { ExerciseEquipmentStore } from 'app/services/exercise-equipment/exercise-equipment-store';
import { ExerciseMuscleStore } from 'app/services/exercise-muscle/exercise-muscle-store';

@Injectable()
export class ExerciseStore extends BaseStore {
  constructor(
    private exerciseService: ExerciseService,
    private baseStream: BaseStream,
    private exerciseCommentStore: ExerciseCommentStore,
    private exerciseCategoryStore: ExerciseCategoryStore,
    private exerciseEquipmentStore: ExerciseEquipmentStore,
    private exerciseMuscleStore: ExerciseMuscleStore
  ) {
    super(exerciseService, baseStream);
    this.model = 'Exercise';
    this.init();

    this.exerciseEquipmentStore.subscribe(this.refresh.bind(this));
    this.exerciseMuscleStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item.category = this.exerciseCategoryStore.getItem(item.categoryId);
    item.equipments = this.exerciseEquipmentStore.filterBy({ exerciseId: item.id });
    item.muscles = this.exerciseMuscleStore.filterBy({ exerciseId: item.id, isSecondary: false });
    item.musclesSecondary = this.exerciseMuscleStore.filterBy({ exerciseId: item.id, isSecondary: true });
    return item;
  }

  create(item: any) {
    return super.create(item).then((data) => {
      if (item.equipments) {
        item.equipments.forEach((equipmentId) => {
          this.exerciseEquipmentStore.create({ exerciseId: data.id, equipmentId: equipmentId });
        });
      }
      if (item.muscles) {
        item.muscles.forEach((muscleId) => {
          this.exerciseMuscleStore.create({ exerciseId: data.id, muscleId: muscleId });
        });
      }
      if (item.musclesSecondary) {
        item.musclesSecondary.forEach((muscleId) => {
          this.exerciseMuscleStore.create({ exerciseId: data.id, muscleId: muscleId, isSecondary: true });
        });
      }
    });
  }

  delete(itemId: number) {
    let item = this.getItem(itemId);
    return super.delete(itemId).then(() => {
      if (item.muscles) {
        item.muscles.forEach((muscle) => {
          this.exerciseMuscleStore.delete(muscle.id);
        });
      }
      if (item.musclesSecondary) {
        item.musclesSecondary.forEach((muscle) => {
          this.exerciseMuscleStore.delete(muscle.id);
        });
      }
      if (item.equipments) {
        item.equipments.forEach((equipment) => {
          this.exerciseEquipmentStore.delete(equipment.id);
        });
      }
    });
  }
}
