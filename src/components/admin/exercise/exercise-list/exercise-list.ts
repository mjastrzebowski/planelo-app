import { Component, Input, ViewChildren, ChangeDetectorRef } from '@angular/core';

import { ExerciseStore } from 'app/services/exercise/exercise-store';


@Component({
  selector: 'exercise-list',
  templateUrl: 'exercise-list.html'
})
export class ExerciseList {
  private sub;
  @Input() filter: any;
  @Input() limit: any;
  @ViewChildren('exercises') exercises: any;

  constructor(
    private cdr: ChangeDetectorRef,
    public exerciseStore: ExerciseStore
  ) {}

  ngOnInit(): void {
    this.sub = this.exerciseStore.subscribe(loaded => {
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
    if (this.exercises && this.exercises.length) {
      let list = this.exercises.filter(exercise => {
        return !exercise.model.hide;
      });
      return list.length === 0;
    }
    return true;
  }
}
