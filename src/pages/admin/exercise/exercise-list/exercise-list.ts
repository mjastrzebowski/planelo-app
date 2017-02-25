import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { AuthService } from 'app/services/auth/auth-service';
import { ExerciseStore } from 'app/services/exercise/exercise-store';

// import { ExerciseCreateModal } from '../exercise-create/exercise-create';

@Component({
  templateUrl: 'exercise-list.html'
})
export class ExerciseListPage {
  private modal;
  public filter;

  constructor(
    private modalCtrl: ModalController,
    private auth: AuthService,
    private exerciseStore: ExerciseStore
  ) {
    this.filter = '';
  }

  showExerciseCreate() {
  //   this.modal = this.modalCtrl.create(ExerciseCreateModal);

  //   this.modal.onDidDismiss(data => {
  //     if (data) {
  //       this.exerciseStore.createExercise(
  //         data.name || '',
  //         data.lastname || '',
  //         data.email || '',
  //         data.phone || '',
  //         data.comment || '')
  //         .then((res) => {
  //           this.notificationStore.createNotification('exerciseAdded', {
  //             exercise: {
  //               // key: res.getKey(),
  //               gender: data.gender || '',
  //               name: data.name || '',
  //               lastname: data.lastname || ''
  //             },
  //             admin: this.auth.key || true
  //           });
  //         });
  //     }
  //   });
  //   this.modal.present();
  }
}
