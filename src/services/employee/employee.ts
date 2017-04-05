export class IEmployee {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  active?: boolean;
  companyId: number;
}


export class Employee implements IEmployee {
  id: number;
  companyId: number;

  constructor(companyId: number) {
    this.companyId = companyId;
  }
}
