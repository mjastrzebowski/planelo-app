import { EventEmitter } from '@angular/core';


export class AuthService {
  private authData: FirebaseAuthData;
  private userData: Object;
  private moreData: Object;
  private emitter: EventEmitter<any> = new EventEmitter();

  constructor(private ref: Firebase) {
    this.authData = this.ref.getAuth();

    this.ref.onAuth((authData: FirebaseAuthData) => {
      this.authData = authData;
      if (this.authData) {
        this.ref.child('users').child(authData.uid).once('value', function(snapshot) {
          this.userData = snapshot.val();
          this.emit();
          if (this.userData && this.key) {
            let userType = this.isClient ? 'cal_clients' : 'cal_trainers';
            this.ref.child(userType).child(this.key).once('value', function(snapshot) {
              this.moreData = snapshot.val();
              this.emit();
            }, function (errorObject) {
              console.log('The read failed: ' + errorObject.code);
            }, this);
          }
        }, function (errorObject) {
          console.log('The read failed: ' + errorObject.code);
        }, this);
      }
    });
  }

  get authenticated(): boolean {
    return this.authData !== null && !this.expired;
  }

  get expired(): boolean {
    return !this.authData || (this.authData.expires * 1000) < Date.now();
  }

  get id(): string {
    return this.authenticated ? this.authData.uid : '';
  }

  get email(): string {
    return this.authenticated ? this.authData.password.email : '';
  }

  get type(): string {
    return this.authenticated && this.userData ? this.userData.type : '';
  }

  get key(): string {
    return this.authenticated && this.userData ? this.userData.key : '';
  }

  get name(): string {
    return this.authenticated && this.moreData ? this.moreData.name : '';
  }

  get lastname(): string {
    return this.authenticated && this.moreData ? this.moreData.lastname : '';
  }

  get title(): string {
    return this.authenticated && this.moreData ? this.moreData.title : '';
  }

  get place(): string {
    return this.authenticated && this.moreData ? this.moreData.place : '';
  }

  get isTrainer(): boolean {
    return this.authenticated && this.type === 'trainer';
  }

  get isClient(): boolean {
    return this.authenticated && this.type === 'client';
  }

  get isOwner(): boolean {
    return this.authenticated && this.type === 'owner';
  }

  signInWithGithub(): Promise<any> {
    return this.authWithOAuth('github');
  }

  signInWithGoogle(): Promise<any> {
    return this.authWithOAuth('google');
  }

  signInWithTwitter(): Promise<any> {
    return this.authWithOAuth('twitter');
  }

  signInWithPassword(credentials: Object): Promise<any> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.ref.authWithPassword(credentials, (error: Error) => {
        if (error) {
          console.error('ERROR @ AuthService#authWithPassword :', error);
          reject(error);
        }
        else {
          resolve();
        }
      });
    });
  }

  signUpWithPassword(credentials: Object): Promise<any> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.ref.createUser(credentials, (error: Error) => {
        if (error) {
          console.error('ERROR @ AuthService#createUser :', error);
          reject(error);
        }
        else {
          resolve();
        }
      });
    });
  }

  changePassword(credentials: Object): Promise<any> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.ref.changePassword(credentials, (error: Error) => {
        if (error) {
          console.error('ERROR @ AuthService#changePassword :', error);
          reject(error);
        }
        else {
          resolve();
        }
      });
    });
  }

  signOut(): void {
    this.ref.unauth();
  }

  subscribe(next: (authenticated: boolean) => void): any {
    let subscription = this.emitter.subscribe(next);
    this.emit();
    return subscription;
  }

  private authWithOAuth(provider: string): Promise<any> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.ref.authWithOAuthPopup(provider, (error: Error) => {
        if (error) {
          console.error('ERROR @ AuthService#authWithOAuth :', error);
          reject(error);
        }
        else {
          resolve();
        }
      });
    });
  }

  private emit(): void {
    this.emitter.next(this.authenticated);
  }
}
