import { Component, Input, Renderer } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { IRoutine } from 'app/services/routine/routine';
import { RoutineStore } from 'app/services/routine/routine-store';

@Component({
  templateUrl: 'routine-create.html'
})
export class RoutineCreateModal {
  @Input() model: IRoutine;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private renderer: Renderer,
    private utils: Utils,
    private routineStore: RoutineStore
  ) {
    this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement, 'my-popup', true);
  }

  ngOnInit(): void {
    this.model = this.routineStore.getItem(this.params.data) || new IRoutine();
  }

  save(): void {
    this.utils.showLoading('Zapisywanie planu...');
    this.routineStore.create(this.model).then((response) => {
      this.utils.stopLoading();
      this.utils.showMessage('Plan zapisany.');
      this.dismiss(response);
    });
  }

  dismiss(result?): void {
    this.viewCtrl.dismiss(result);
  }
}
