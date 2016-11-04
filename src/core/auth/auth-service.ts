import { Injectable, EventEmitter } from '@angular/core';
import { FirebaseAuth, FirebaseAuthState, AngularFire } from 'angularfire2';

import { FIREBASE_URL } from '../../config';

import { firebaseConfig, firebaseAuthConfig } from '../../firebase';

@Injectable()
export class AuthService {
  private authData: FirebaseAuthState = null;
  private userData: any;
  private moreData: any;
  private emitter: EventEmitter<any> = new EventEmitter();
  public loaded: boolean;

  constructor(
    public auth$: FirebaseAuth,
    public af: AngularFire
  ) {
    const path = FIREBASE_URL;

    this.auth$.subscribe((authData: FirebaseAuthState) => {
      this.authData = authData;
      if (this.loaded && (!authData || authData === null)) {
        location.reload();
      }

      if (this.authData) {        
        this.af.database.object('users/' + authData.uid).subscribe((userData: any) => {
          this.userData = userData;
          if (this.userData && this.key) {
            let userType = this.isClient ? 'cal_clients' : 'cal_trainers';
            if (this.key === '-KBN-b7GjsB6FS8Opmx0') {
              userType = 'cal_clients';
            }
            this.af.database.object(userType + '/' + this.key).subscribe((moreData: any) => {
              this.moreData = moreData;
              this.loaded = true;
              this.emit();
            });
          } else {
            this.loaded = true;
            this.emit();
          }
        });
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
    return this.authenticated ? this.authData.auth.email : '';
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


  signInWithPassword(credentials: any): Promise<any> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.auth$.login(credentials).then(function() {
        resolve();
      }).catch((error: Error) => {
        console.error('ERROR @ AuthService#signInWithPassword :', error);
        reject(error);
      });
    });
  }

  signUpWithPassword(credentials: any): Promise<any> {
    if (!this.fbApp) {
      this.fbApp = firebase.initializeApp(firebaseConfig, 'Admin');
    }
    return this.fbApp.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .catch((error: Error) => console.error('ERROR @ AuthService#signUpWithPassword :', error));
  }

  removeUser(token: any): Promise<any> {
    if (!this.fbApp) {
      this.fbApp = firebase.initializeApp(firebaseConfig, 'Admin');
    }
    return this.fbApp.auth().signInWithCustomToken(token).then(function(success) {
        let user = this.fbApp.auth().currentUser;
        user.delete();
      }.bind(this)).catch((error: Error) => console.error('ERROR @ AuthService#removeUser :', error));


    // firebase.auth().signInWithCustomToken(token).then(function(success) {
    //     var user = firebase.auth().currentUser;
    //     console.log(user);
    //   }).catch(function(error) {
    //     console.log(error);
    //   });


    // return this.auth$.removeUser(credentials)
    //   .catch((error: Error) => console.error('ERROR @ AuthService#createUser :', error));

    // return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
    //   let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc2VjdXJldG9rZW4uZ29vZ2xlLmNvbVwvIiwic3ViIjoiMjBmNjVlNTYtYzcwMy00MjA4LWI2MDctMDcxMTg4NzFmMDY2IiwiYXVkIjpudWxsLCJpYXQiOjE0NzY3Nzk4NzIsImV4cCI6MTQ3Njc4MzQ3MiwidWlkIjoiMjBmNjVlNTYtYzcwMy00MjA4LWI2MDctMDcxMTg4NzFmMDY2In0.QBkiSMz1oXxqCWvZGxCk2LmyBETdI0qG1DEZ9SThoZ6xi17Lv_AcO6p0O2PRkGTSo52fbSFsuM3cUeYm3QqfTAgdOZ5gibeFSXKJ1FthNt2Hw5_08BeMvUnGj36QZOGUNtZ6V-aQOomRDjpvQMe9CXKFK1_BVPVh4ai5_Rn9HSYQG9M4E_4KA6QPM2gcz2GM3QDk-DSygOd4ke6XCg-x1R-_gmUO7bGrWTiqQ-4jJZCjYGVH0oCI-xs511R9zkvvRn7cjdqIc5ssw6SCLyhNzpQ3uC5OxoUL4Omku6IFnBCyuNOJDnVlGY_57tfJS7soFbUjUCAPExXsUvxZsppZQg';

    //   // credentials = {
    //   //   email: 'michal+12345@jastrzebowski.pl',
    //   //   oldPassword: token,
    //   //   newPassword: 'nowe'
    //   // };
    //   debugger;
    //   this.fb.authWithCustomToken(token, (error: Error, userData?: any) => {
    //     if (error) {
    //       console.error('ERROR @ AuthService#authWithCustomToken :', error);
    //       reject(error);
    //     } else {
    //       resolve();
    //     }
    //   });

      // this.ref.signInWithCustomToken(token).then(function(success) {
      //   // var user = firebase.auth().currentUser;
      // }).catch(function(error) {
      // });


      // credentials = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6ZmFsc2UsImRlYnVnIjpmYWxzZSwiZCI6eyJ1aWQiOiI4ZGMxMDY3Mi1mZmRhLTQyZWUtODVhZi0zY2VmNTY2MzQ5OGMifSwidiI6MCwiaWF0IjoxNDY3OTkyNjEyfQ._P4tB79HEZgf2oxa7QdR39_zlqfxeSYTVw5KfD18ExI';
      // this.ref.removeUser(credentials, (error: Error, userData?: any) => {
      //   if (error) {
      //     console.error('ERROR @ AuthService#removeUser :', error);
      //     reject(error);
      //   } else {
      //     resolve(userData);
      //   }
      // });
    // });
  }

  changePassword(credentials: any): Promise<any> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = this.auth$.getAuth().auth;
      let credential = firebase.auth.EmailAuthProvider.credential(credentials.email, credentials.oldPassword);

      user.reauthenticate(credential).then(function() {
        user.updatePassword(credentials.newPassword).then(function() {
          resolve();
        }).catch((error: Error) => {
          console.error('ERROR @ AuthService#updatePassword :', error);
          reject(error);
        });
      }).catch((error: Error) => {
        console.error('ERROR @ AuthService#reauthenticate :', error);
        reject(error);
      });
    });
  }

  signOut(): void {
    this.auth$.logout();
  }

  subscribe(next: (authenticated: boolean) => void): any {
    let subscription = this.emitter.subscribe(next);
    this.emit();
    return subscription;
  }

  private emit(): void {
    this.emitter.next(this.authenticated);
  }
}
