export class IEmployeeVacation {
  id: number;
  start?: any;
  end?: any;
  profileId?: number;
}


export class EmployeeVacation implements IEmployeeVacation {
  id: number;
  profileId: number

  constructor(profileId: number) {
    this.profileId = profileId;
  }
}
