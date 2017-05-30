import { Component, Input } from '@angular/core';

import { App } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { IExerciseCategory } from 'app/services/exercise-category/exercise-category';
import { ExerciseCategoryStore } from 'app/services/exercise-category/exercise-category-store';

// import { ExerciseCategoryDetailPage } from 'app/pages/admin/exercise-category/exercise-category-detail/exercise-category-detail';


@Component({
  selector: 'exercise-category-item',
  templateUrl: 'exercise-category-item.html'
})
export class ExerciseCategoryItem {
  @Input() model: IExerciseCategory;
  @Input() filter: any;
  nav: any;

  constructor(
    private app: App,
    private utils: Utils,
    private exerciseCategoryStore: ExerciseCategoryStore
  ) {}

  delete(): void {
    this.exerciseCategoryStore.delete(this.model.id).then(() => {
      this.utils.showMessage('Kategoria ćwiczeń usunięta.');
    });
  }

  goToExerciseCategoryDetail(exerciseCategory) {
    this.filter.category = (this.filter.query || this.filter.category !== exerciseCategory.id) ? exerciseCategory.id : 0;
    this.filter.query = '';

    // this.nav = this.app.getActiveNav();
    // this.nav.push(ExerciseCategoryDetailPage, exerciseCategory);
  }
}
