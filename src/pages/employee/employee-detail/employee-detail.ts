import { Component, Input } from '@angular/core';

import { IonicPage, NavParams } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { ClientStore, EmployeeStore, PlaceStore } from 'app/services';

@IonicPage({
  name: 'employee',
  segment: 'employee/:id',
  defaultHistory: ['companies']
})
@Component({
  templateUrl: 'employee-detail.html'
})
export class EmployeeDetailPage {
  @Input() model: any;
  private sub;
  employeeFilter = '';
  clientFilter = '';

  constructor(
    private params: NavParams,
    private utils: Utils,
    private employeeStore: EmployeeStore,
    private clientStore: ClientStore,
    private placeStore: PlaceStore
  ) {}

  ngOnInit(): void {
    this.utils.showLoading('Ładowanie pracownika...');
    this.sub = this.employeeStore.subscribe(loaded => {
      if (!loaded) {
        return;
      }
      this.model = this.employeeStore.getItem(this.params.data.id);
      this.utils.stopLoading();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
