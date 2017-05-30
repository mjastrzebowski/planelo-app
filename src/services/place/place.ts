export class IPlace {
  completed: boolean;
  createdAt: number;
  id: number;
  key?: string;
  name?: string;
}


export class Place implements IPlace {
  completed: boolean = false;
  createdAt: number; // = firebase.database['ServerValue']['TIMESTAMP'];
  id: number;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
