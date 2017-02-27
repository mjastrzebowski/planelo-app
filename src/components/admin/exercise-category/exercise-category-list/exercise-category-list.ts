import { Component, Input, ViewChildren, ChangeDetectorRef } from '@angular/core';

import { ExerciseCategoryStore } from 'app/services/exercise-category/exercise-category-store';


@Component({
  selector: 'exercise-category-list',
  templateUrl: 'exercise-category-list.html'
})
export class ExerciseCategoryList {
  @Input() filter: any;
  private sub;
  @ViewChildren('exerciseCategories') exerciseCategories: any;

  constructor(
    private cdr: ChangeDetectorRef,
    public exerciseCategoryStore: ExerciseCategoryStore
  ) {}

  ngOnInit(): void {
    this.sub = this.exerciseCategoryStore.subscribe(loaded => {
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
    if (this.exerciseCategories && this.exerciseCategories.length) {
      return this.exerciseCategories.length === 0;
    }
    return true;
  }
}
