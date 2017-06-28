import { Component, Input } from '@angular/core';

import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';
import { SessionStore } from 'app/services/session';
import { ISession } from 'app/services/session/session';

@IonicPage({
  name: 'session/create',
  segment: 'session/create'
})
@Component({
  templateUrl: 'session-create.html'
})
export class SessionCreatePage {
  @Input() model: ISession;
  company: any;
  start: any;
  employeeId: number;

  constructor(
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private sessionStore: SessionStore,
    public utils: Utils
  ) {}

  ngOnInit() {
    this.company = this.navParams.data.company;
    this.model = new ISession();
    this.model.start = this.navParams.data.start;
    this.model.employeeId = this.navParams.data.employeeId;
  }

  save(): void {
    this.utils.showLoading('Zapisywanie sesji...');
    this.sessionStore.create(this.model).then(() => {
      this.utils.stopLoading();
      this.utils.showMessage('Sesja zapisana.');
      this.dismiss();
    });
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
