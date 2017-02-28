import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IExerciseEquipment, ExerciseEquipment } from './exercise-equipment';
import { ExerciseEquipmentService } from './exercise-equipment-service';

import { EquipmentStore } from 'app/services/equipment/equipment-store';

@Injectable()
export class ExerciseEquipmentStore extends BaseStore {
  constructor(
    private exerciseEquipmentService: ExerciseEquipmentService,
    private baseStream: BaseStream,
    private equipmentStore: EquipmentStore
  ) {
    super(exerciseEquipmentService, baseStream);
    this.model = 'ExerciseEquipment';
    this.init();

    this.equipmentStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item.equipment = this.equipmentStore.getItem(item.equipmentId);
    return item;
  }
}
