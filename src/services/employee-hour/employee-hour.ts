export class IEmployeeHour {
  id: number;
  day?: any;
  start?: any;
  end?: any;
  employeeId?: number;
}


export class EmployeeHour implements IEmployeeHour {
  id: number;
  employeeId: number

  constructor(employeeId: number) {
    this.employeeId = employeeId;
  }
}
