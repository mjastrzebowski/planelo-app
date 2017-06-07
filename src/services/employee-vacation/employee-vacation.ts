export class IEmployeeVacation {
  id: number;
  start?: any;
  end?: any;
  employeeId?: number;
  reason?: string;
}


export class EmployeeVacation implements IEmployeeVacation {
  id: number;
  employeeId: number

  constructor(employeeId: number) {
    this.employeeId = employeeId;
  }
}
