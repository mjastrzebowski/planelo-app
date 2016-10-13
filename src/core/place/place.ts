export class IPlace {
  completed: boolean;
  createdAt: number;
  key?: string;
  title: string;
}


export class Place implements IPlace {
  completed: boolean = false;
  createdAt: number = Firebase.ServerValue.TIMESTAMP;
  title: string;

  constructor(title: string) {
    this.title = title;
  }
}
