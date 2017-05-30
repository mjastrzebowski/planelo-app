import { Component, Input, ViewChildren, ChangeDetectorRef } from '@angular/core';

import { RoutineStore } from 'app/services/routine/routine-store';


@Component({
  selector: 'routine-list',
  templateUrl: 'routine-list.html'
})
export class RoutineList {
  private sub;
  @Input() filter: any;
  @Input() limit: any;
  @ViewChildren('routines') routines: any;

  constructor(
    private cdr: ChangeDetectorRef,
    public routineStore: RoutineStore
  ) {}

  ngOnInit(): void {
    this.sub = this.routineStore.subscribe(loaded => {
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
    if (this.routines && this.routines.length) {
      let list = this.routines.filter(routine => {
        return !routine.model.hide;
      });
      return list.length === 0;
    }
    return true;
  }
}
