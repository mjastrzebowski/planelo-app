import { Component, Input } from '@angular/core';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';

import { AuthService } from 'app/services/auth/auth-service';

import { ISession } from 'app/services/session/session';
import { SessionStore } from 'app/services/session/session-store';

import { NotificationStore } from 'app/services/notification/notification-store';


@Component({
  selector: 'workout-item',
  templateUrl: 'workout-item.html'
})
export class WorkoutItem {
  @Input() model: ISession;
  @Input() changeDate: any;
  currentDate: any;

  constructor(
    private alertCtrl: AlertController,
    private sessionStore: SessionStore,
    private notificationStore: NotificationStore,
    public auth: AuthService
  ) {
    this.currentDate = new Date();
  }

  removeWorkout(workout): void {
    this.sessionStore.delete(workout)
      .then((res) => {
        let notification = {
          type: 'workoutRemoved',
          workout: {
            key: workout.key,
            trainer: workout.trainerKey || '',
            client: workout.clientKey || '',
            date: workout.date.date || workout.date || '',
            dateTime: workout.date.dateTime || workout.dateTime || '',
            timeStart: workout.date.timeStart || workout.timeStart || '',
            timeEnd: workout.date.timeEnd || workout.timeEnd || '',
            place: workout.place || ''
          },
          client: this.auth.key
        };
        this.notificationStore.create(notification);
        this.removeWorkoutAlert();
      });
  }

  removeWorkoutAlert(): void {
    let alert = this.alertCtrl.create({
      title: 'Odwołano',
      message: 'Twój trening został odwołany.',
      buttons: ['Ok']
    });
    alert.present();
  }

  rejectWorkout(workout): void {
    let prompt = this.alertCtrl.create({
      title: 'Podaj powód',
      message: 'Trening można odwołać do godz. 21:00 dnia poprzedzającego termin. Po tym czasie należy podać powód, a zwrot zostanie indywidualnie rozpatrzony zgodnie z zasadami studia.',
      inputs: [
        {
          name: 'title',
          placeholder: 'Powód odwołania'
        },
      ],
      buttons: [
        {
          text: 'Anuluj',
          handler: data => {}
        },
        {
          text: 'Odwołaj',
          handler: data => {
            let date = moment().format('DD.MM.YYYY, HH:mm');
            let changes = {
              completed: '[' + date + '] ' + data.title
            };
            this.sessionStore.update(workout, changes)
              .then((res) => {
                let notification = {
                  type: 'workoutRejected',
                  workout: {
                    key: workout.key,
                    trainer: workout.trainerKey || '',
                    client: workout.clientKey || '',
                    date: workout.date.date || workout.date || '',
                    dateTime: workout.date.dateTime || workout.dateTime || '',
                    timeStart: workout.date.timeStart || workout.timeStart || '',
                    timeEnd: workout.date.timeEnd || workout.timeEnd || '',
                    place: workout.place || ''
                  },
                  client: this.auth.key,
                  reason: data.title
                };
                this.notificationStore.create(notification);
                this.removeWorkoutAlert();
              });
          }
        }
      ]
    });
    prompt.present();
  }
}
