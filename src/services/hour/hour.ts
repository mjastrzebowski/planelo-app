export class IHour {
  id: number;
  day?: any;
  start?: any;
  end?: any;
  profileId?: number;
}


export class Hour implements IHour {
  id: number;
  profileId: number

  constructor(profileId: number) {
    this.profileId = profileId;
  }
}
