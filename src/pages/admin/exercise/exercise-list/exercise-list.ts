import { Component, Input } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Utils } from 'app/providers/utils';

import { AuthService } from 'app/services/auth/auth-service';
import { ExerciseStore } from 'app/services/exercise/exercise-store';
import { EquipmentStore } from 'app/services/equipment/equipment-store';
import { MuscleStore } from 'app/services/muscle/muscle-store';

import { ExerciseCreateModal } from '../exercise-create/exercise-create'
// import { ExerciseDetailPage } from '../exercise-detail/exercise-detail'

@Component({
  templateUrl: 'exercise-list.html'
})
export class ExerciseListPage {
  private sub;
  filter = {
    category: 0,
    query: ''
  };

  constructor(
    private nav: NavController,
    private modalCtrl: ModalController,
    private utils: Utils,
    private auth: AuthService,
    private exerciseStore: ExerciseStore,
    private equipmentStore: EquipmentStore,
    private muscleStore: MuscleStore
  ) {}

  ngOnInit(): void {
    this.utils.showLoading('Ładowanie ćwiczeń...');
    this.sub = this.exerciseStore.subscribe(loaded => {
      if (!loaded) {
        return;
      }
      this.utils.stopLoading();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  goToExerciseDetail(exercise): void {
    // this.nav.push(ExerciseDetailPage, exercise);
  }

  showExerciseCreate(): void {
    let modal = this.modalCtrl.create(ExerciseCreateModal);
    modal.present();
  }
}
