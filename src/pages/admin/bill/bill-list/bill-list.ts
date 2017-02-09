import { Component } from '@angular/core';


@Component({
  templateUrl: 'bill-list.html'
})
export class BillListPage {
  public filter;

  constructor() {

    this.filter = {
      place: '',
      client: '',
      month: '2016-09'
    };
  }
}
