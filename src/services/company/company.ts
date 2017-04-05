export class ICompany {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  active?: boolean;
  name: string;
  description: string;
}


export class Company implements ICompany {
  id: number;
  name: string;
  description: string;

  constructor(name: string) {
    this.name = name;
  }
}
