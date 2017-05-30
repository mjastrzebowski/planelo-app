import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IEquipment, Equipment } from './equipment';
import { EquipmentService } from './equipment-service';

@Injectable()
export class EquipmentStore extends BaseStore {
  constructor(
    private equipmentService: EquipmentService,
    private baseStream: BaseStream
  ) {
    super(equipmentService, baseStream);
    this.model = 'Equipment';
    this.init();
  }
}
