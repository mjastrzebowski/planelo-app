import { IClient, Client } from './client';


export class ClientService {
  constructor(private ref: Firebase) {}

  createClient(name: string, lastname: string, email: string, phone: string, comment: string): void {
    this.ref.push(new Client(name, lastname, email, phone, comment), (error: Error) => {
      if (error) {
        console.error('ERROR @ createClient :', error);
      }
    });
  }

  deleteClient(client: IClient): void {
    this.ref.child(client.key).remove((error: Error) => {
      if (error) {
        console.error('ERROR @ deleteClient :', error);
      }
    });
  }

  updateClient(client: IClient, changes: any): void {
    this.ref.child(client.key).update(changes, (error: Error) => {
      if (error) {
        console.error('ERROR @ updateClient :', error);
      }
    });
  }
}
