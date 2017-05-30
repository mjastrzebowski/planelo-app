import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IRoutine, Routine } from './routine';
import { RoutineService } from './routine-service';

import { RoutineDayStore } from 'app/services/routine-day/routine-day-store';

@Injectable()
export class RoutineStore extends BaseStore {
  constructor(
    private routineService: RoutineService,
    private baseStream: BaseStream,
    private routineDayStore: RoutineDayStore
  ) {
    super(routineService, baseStream);
    this.model = 'Routine';
    this.init();

    this.routineDayStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item = super.convertItem(item);
    item.days = this.routineDayStore.filterBy({ routineId: item.id });
    return item;
  }
}
