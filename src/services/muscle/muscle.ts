export class IMuscle {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  name: string;
}


export class Muscle implements IMuscle {
  id: number;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
