export class IEmployeeHour {
  id: number;
  day?: any;
  start?: any;
  end?: any;
  profileId?: number;
}


export class EmployeeHour implements IEmployeeHour {
  id: number;
  profileId: number

  constructor(profileId: number) {
    this.profileId = profileId;
  }
}
