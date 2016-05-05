import { IPlace, Place } from './place';


export class PlaceService {
  constructor(private ref: Firebase) {}

  createPlace(title: string): void {
    this.ref.push(new Place(title), (error: Error) => {
      if (error) {
        console.error('ERROR @ createPlace :', error);
      }
    });
  }

  deletePlace(place: IPlace): void {
    this.ref.child(place.key).remove((error: Error) => {
      if (error) {
        console.error('ERROR @ deletePlace :', error);
      }
    });
  }

  updatePlace(place: IPlace, changes: any): void {
    this.ref.child(place.key).update(changes, (error: Error) => {
      if (error) {
        console.error('ERROR @ updatePlace :', error);
      }
    });
  }
}
