import { Component, Input, ViewChildren, ChangeDetectorRef } from '@angular/core';

import { CompanyStore } from 'app/services/company/company-store';


@Component({
  selector: 'company-list',
  templateUrl: 'company-list.html'
})
export class CompanyList {
  private sub;
  @Input() filter: any;
  @Input() limit: any;
  @ViewChildren('companies') companies: any;

  constructor(
    private cdr: ChangeDetectorRef,
    public companyStore: CompanyStore
  ) {}

  ngOnInit(): void {
    this.sub = this.companyStore.subscribe(loaded => {
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
    if (this.companies && this.companies.length) {
      let list = this.companies.filter(company => {
        return !company.model.hide;
      });
      return list.length === 0;
    }
    return true;
  }
}
