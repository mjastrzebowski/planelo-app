export class EmployeeMock {
  createdAt?: number;

  id: number = 1;
  key: string;
  hide: boolean;
  active: boolean;
  name: string = 'test';
  companyId: number = 1;
  days: any = [ null, [{"day":"1","start":"08:00","end":"11:00","id":1,"employeeId":3},{"day":"1","start":"17:00","end":"21:00","id":2,"employeeId":3}],[{"day":"2","start":"08:00","end":"11:00","id":3,"employeeId":3},{"day":"2","start":"17:00","end":"21:00","id":4,"employeeId":3}],[{"day":"3","start":"08:00","end":"11:00","id":5,"employeeId":3},{"day":"3","start":"16:00","end":"21:00","id":6,"employeeId":3}],[{"day":"4","start":"08:00","end":"11:00","id":7,"employeeId":3},{"day":"4","start":"16:00","end":"21:00","id":8,"employeeId":3}],[{"day":"5","start":"08:00","end":"11:00","id":9,"employeeId":3},{"day":"5","start":"16:00","end":"21:00","id":10,"employeeId":3}]];
}
