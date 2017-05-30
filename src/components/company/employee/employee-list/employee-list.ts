import { Component, Input, ViewChildren, ChangeDetectorRef } from '@angular/core';

import { EmployeeStore } from 'app/services/employee/employee-store';


@Component({
  selector: 'employee-list',
  templateUrl: 'employee-list.html'
})
export class EmployeeList {
  private sub;
  @Input() filter: any;
  @Input() limit: any;
  @ViewChildren('items') items: any;

  constructor(
    private cdr: ChangeDetectorRef,
    public employeeStore: EmployeeStore
  ) {}

  ngOnInit(): void {
    this.sub = this.employeeStore.subscribe(loaded => {
      if (loaded) {
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  isEmpty() {
    if (this.items && this.items.length) {
      let list = this.items.filter(employee => {
        return !employee.model.hide;
      });
      return list.length === 0;
    }
    return true;
  }
}
