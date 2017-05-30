import { Component, Input, Renderer } from '@angular/core';

import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { EmployeeStore } from 'app/services/employee/employee-store';

@IonicPage({
  name: 'employees/create',
  segment: 'employees/create'
})
@Component({
  templateUrl: 'employee-create.html'
})
export class EmployeeCreateModal {
  @Input() model: any;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private renderer: Renderer,
    private utils: Utils,
    private employeeStore: EmployeeStore
  ) {
    this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement, 'my-popup', true);
  }

  ngOnInit(): void {
    this.model = this.employeeStore.getItem(this.params.data);
  }

  save(): void {
    this.utils.showLoading('Zapisywanie firmy...');
    this.employeeStore.create(this.model).then(() => {
      this.utils.stopLoading();
      this.utils.showMessage('Firma dodana.');
      this.dismiss();
    });
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
