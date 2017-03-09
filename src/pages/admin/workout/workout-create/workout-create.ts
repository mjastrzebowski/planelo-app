import { Component, Input } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { IWorkout } from 'app/services/workout/workout';
import { WorkoutStore } from 'app/services/workout/workout-store';

import { ActivityStore } from 'app/services/activity/activity-store';
import { ActivityTypeStore } from 'app/services/activity-type/activity-type-store';
import { ClientStore } from 'app/services/client/client-store';
import { TrainerStore } from 'app/services/trainer/trainer-store';
import { SessionStore } from 'app/services/session/session-store';

@Component({
  templateUrl: 'workout-create.html'
})
export class WorkoutCreateModal {
  @Input() model: IWorkout;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private utils: Utils,
    private workoutStore: WorkoutStore,
    private activityStore: ActivityStore,
    private activityTypeStore: ActivityTypeStore,
    private clientStore: ClientStore,
    private trainerStore: TrainerStore,
    private sessionStore: SessionStore
  ) {}

  ngOnInit(): void {
    this.model = this.workoutStore.getItem(this.params.data) || new IWorkout();
  }

  changeActivityType(): void {
    let activity = this.activityStore.filterBy({ activityTypeId: this.model.activityTypeId }).get(0);
    if (activity) {
      this.model.activityId = activity.id;
    } else {
      this.model.activityId = 0;
    }
    this.changeActivity();
  }

  changeActivity(): void {
    let session = this.sessionStore.filterBy({ activityId: this.model.activityId }).get(0);
    if (session) {
      this.model.sessionId = session.id;
    } else {
      this.model.sessionId = 0;
    }
  }

  save(): void {
    this.utils.showLoading('Zapisywanie treningu...');
    this.workoutStore.create(this.model).then(() => {
      this.utils.stopLoading();
      this.utils.showMessage('Trening dodany.');
      this.dismiss();
    });
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
