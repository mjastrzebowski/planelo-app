import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ITrainer } from './trainer';


export class TrainerStore {
  trainers: ReplaySubject<List<any>> = new ReplaySubject(1);
  public list: List<any> = List();

  constructor(ref: Firebase) {
    ref.on('child_added', this.created.bind(this));
    ref.on('child_changed', this.updated.bind(this));
    ref.on('child_removed', this.deleted.bind(this));
    ref.once('value', () => this.emit());
  }

  get size(): number {
    return this.list.size;
  }

  public getItem(key: string): ITrainer {
    let index = this.findIndex(key);
    return this.list.get(index);
  }

  public getItemByUsername(username: string): ITrainer {
    let index = this.findIndexByUsername(username);
    if (index === -1) {
      return null;
    }
    return this.list.get(index);
  }

  public filterBy(filters: object): ITrainer {
    return this.list.filter(trainer => {
      let check = true;
      Object.keys(filters).forEach(function (key) {
        switch (key) {
          case 'availableFrom': {
            if (trainer.fullDate >= filters[key]) {
              check = false;
            }
            break;
          }
          case 'availableTo': {
            if (trainer.fullDate < filters[key]) {
              check = false;
            }
            break;
          }
          default: {
            if (trainer[key] !== filters[key]) {
              check = false;
            }
            break;
          }
        }

        if (!check) {
          return false;
        }
      });
      return check;
    });
  }

  private emit(): void {
    this.trainers.next(this.list);
  }

  private created(snapshot: FirebaseDataSnapshot): void {
    let key: string = snapshot.key();
    let index: number = this.findIndex(key);
    if (index === -1) {
      let trainer: ITrainer = snapshot.val();
      trainer.key = key;
      this.list = this.list.push(trainer);
      this.emit();
    }
  }

  private deleted(snapshot: FirebaseDataSnapshot): void {
    let index: number = this.findIndex(snapshot.key());
    if (index !== -1) {
      this.list = this.list.delete(index);
      this.emit();
    }
  }

  private updated(snapshot: FirebaseDataSnapshot): void {
    let key: string = snapshot.key();
    let index: number = this.findIndex(key);
    if (index !== -1) {
      let trainer: ITrainer = snapshot.val();
      trainer.key = key;
      this.list = this.list.set(index, trainer);
      this.emit();
    }
  }

  private findIndex(key: string): number {
    return this.list.findIndex((trainer: ITrainer) => {
      return trainer.key === key;
    });
  }

  private findIndexByUsername(username: string): number {
    return this.list.findIndex((trainer: ITrainer) => {
      return trainer.username === username;
    });
  }
}
