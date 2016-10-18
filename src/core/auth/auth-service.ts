import { EventEmitter } from '@angular/core';

export class AuthService {
  private authData: any;
  private userData: any;
  private moreData: any;
  private emitter: EventEmitter<any> = new EventEmitter();
  public loaded: boolean;

  constructor(private ref: Firebase, private fb: Firebase) {
    this.authData = this.ref.getAuth();

    this.ref.onAuth((authData: any) => {
      if (this.loaded && (!authData || authData === null)) {
        console.log('test onAuth', authData);
        location.reload();
      }

      this.authData = authData;
      if (this.authData) {
        this.ref.child('users').child(authData.uid).once('value', function(snapshot) {
          this.userData = snapshot.val();
          if (this.userData && this.key) {
            let userType = this.isClient ? 'cal_clients' : 'cal_trainers';
            if (this.key === '-KBN-b7GjsB6FS8Opmx0') {
              userType = 'cal_clients';
            }
            this.ref.child(userType).child(this.key).once('value', function(snapshot) {
              this.moreData = snapshot.val();
              this.loaded = true;
              this.emit();
            }, function (errorObject) {
              console.log('The read failed: ' + errorObject.code);
            }, this);
          } else {
            this.loaded = true;
            this.emit();
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

  get username(): string {
    return this.authenticated && this.moreData ? this.moreData.username : '';
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

  get color(): string {
    return this.authenticated && this.moreData ? this.moreData.color : '';
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

  signInWithPassword(credentials: any): Promise<any> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.ref.authWithPassword(credentials, (error: Error) => {
        if (error) {
          console.error('ERROR @ AuthService#authWithPassword :', error);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  signUpWithPassword(credentials: any): Promise<any> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.ref.createUser(credentials, (error: Error, userData?: any) => {
        if (error) {
          console.error('ERROR @ AuthService#createUser :', error);
          reject(error);
        } else {
          resolve(userData);
        }
      });
    });
  }

  removeUser(credentials: any): Promise<any> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc2VjdXJldG9rZW4uZ29vZ2xlLmNvbVwvIiwic3ViIjoiMjBmNjVlNTYtYzcwMy00MjA4LWI2MDctMDcxMTg4NzFmMDY2IiwiYXVkIjpudWxsLCJpYXQiOjE0NzY3Nzk4NzIsImV4cCI6MTQ3Njc4MzQ3MiwidWlkIjoiMjBmNjVlNTYtYzcwMy00MjA4LWI2MDctMDcxMTg4NzFmMDY2In0.QBkiSMz1oXxqCWvZGxCk2LmyBETdI0qG1DEZ9SThoZ6xi17Lv_AcO6p0O2PRkGTSo52fbSFsuM3cUeYm3QqfTAgdOZ5gibeFSXKJ1FthNt2Hw5_08BeMvUnGj36QZOGUNtZ6V-aQOomRDjpvQMe9CXKFK1_BVPVh4ai5_Rn9HSYQG9M4E_4KA6QPM2gcz2GM3QDk-DSygOd4ke6XCg-x1R-_gmUO7bGrWTiqQ-4jJZCjYGVH0oCI-xs511R9zkvvRn7cjdqIc5ssw6SCLyhNzpQ3uC5OxoUL4Omku6IFnBCyuNOJDnVlGY_57tfJS7soFbUjUCAPExXsUvxZsppZQg';

      // credentials = {
      //   email: 'michal+12345@jastrzebowski.pl',
      //   oldPassword: token,
      //   newPassword: 'nowe'
      // };
      debugger;
      this.fb.authWithCustomToken(token, (error: Error, userData?: any) => {
        if (error) {
          console.error('ERROR @ AuthService#authWithCustomToken :', error);
          reject(error);
        } else {
          console.log('sukces zmiany?', userData);
          resolve();
        }
      });

      // this.ref.signInWithCustomToken(token).then(function(success) {
      //   console.log(success);
      //   // var user = firebase.auth().currentUser;
      //   // console.log(user);
      // }).catch(function(error) {
      //   console.log(error);
      // });


      // credentials = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6ZmFsc2UsImRlYnVnIjpmYWxzZSwiZCI6eyJ1aWQiOiI4ZGMxMDY3Mi1mZmRhLTQyZWUtODVhZi0zY2VmNTY2MzQ5OGMifSwidiI6MCwiaWF0IjoxNDY3OTkyNjEyfQ._P4tB79HEZgf2oxa7QdR39_zlqfxeSYTVw5KfD18ExI';
      // this.ref.removeUser(credentials, (error: Error, userData?: any) => {
      //   if (error) {
      //     console.error('ERROR @ AuthService#removeUser :', error);
      //     reject(error);
      //   } else {
      //     console.log('okej?');
      //     resolve(userData);
      //   }
      // });
    });
  }

  changePassword(credentials: any): Promise<any> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.ref.changePassword(credentials, (error: Error) => {
        if (error) {
          console.error('ERROR @ AuthService#changePassword :', error);
          reject(error);
        } else {
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
        } else {
          resolve();
        }
      });
    });
  }

  private emit(): void {
    this.emitter.next(this.authenticated);
  }
}
