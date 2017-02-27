export class IEquipment {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  name: string;
}


export class Equipment implements IEquipment {
  id: number;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
