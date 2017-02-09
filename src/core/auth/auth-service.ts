import { Injectable, EventEmitter } from '@angular/core';

import { Api } from 'app/core/api/api-service';
// import { IUser } from 'app/core/user/user';

@Injectable()
export class AuthService {
  private emitter: EventEmitter<any> = new EventEmitter();
  private user: any;
  private userData: any;
  private moreData: any;

  constructor(private api: Api) {
    if (AuthService.getToken()) {
      this.user = this.getSession().user;
    }
    this.emit();
  }

  get(query?: any): Promise<any> {
    return this.api.get('profiles', query);
  }
  put(body: any): Promise<any> {
    return this.api.put('profiles', body);
  }
  post(body: any): Promise<any> {
    return this.api.post('profiles', body);
  }

  login(loginData: { username: string, password: string }) {
    return new Promise((resolve, reject) => {
      this.api.post('profiles/login', loginData, { include: 'User' }).then(data => {
        this.setSession(data);
        this.emit();
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('user');
    this.user = null;
    // return new Promise((resolve, reject) => {
    //   if (this.user) {
    //     this.api.post('profiles/logout').then(() => {
    //       localStorage.removeItem('token');
    //       localStorage.removeItem('userId');
    //       localStorage.removeItem('rememberMe');
    //       localStorage.removeItem('user');
    //       this.user = null;
    //       resolve();
    //     }, () => {
    //       resolve();
    //     });
    //   } else {
    //     reject();
    //   }
    // });
  }

  isLoggedIn() {
    return this.user ? true : false;
  }

  getSession() {
    return {
      token: localStorage.getItem('token'),
      userId: JSON.parse(localStorage.getItem('userId')),
      // rememberMe: JSON.parse(localStorage.getItem('rememberMe')),
      user: JSON.parse(localStorage.getItem('user'))
    }
  }

  setSession(data: {
    id?: string,
    userId?: number,
    rememberMe?: boolean,
    user?: any
  }) {
    localStorage.setItem('token', data.id);
    localStorage.setItem('userId', JSON.stringify(data.userId));
    // localStorage.setItem('rememberMe', JSON.stringify(data.rememberMe));
    if (typeof data.user === 'object') {
      localStorage.setItem('user', JSON.stringify(data.user));
      this.user = data.user;
    }
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  checkToken() {
    return this.api.get('Users', { id: this.getUserId() });
  }

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user ? this.user : null;
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  subscribe(next: (authenticated: boolean) => void): any {
    let subscription = this.emitter.subscribe(next);
    this.emit();
    return subscription;
  }
  private emit(): void {
    this.emitter.next(this.authenticated);
  }



  changePassword(credentials: any): any {}
  signUpWithPassword(credentials: any): any {}
  removeUser(credentials: any) {}

  get authenticated(): boolean {
    return this.isLoggedIn();
  }
  get id(): string {
    return this.authenticated ? this.user.id : '';
  }
  get email(): string {
    return this.authenticated ? this.user.email : '';
  }
  get username(): string {
    return this.authenticated ? this.user.username : '';
  }
  get key(): string {
    return this.authenticated ? this.user.key : '';
  }
  get name(): string {
    return this.authenticated ? this.user.name : '';
  }
  get lastname(): string {
    return this.authenticated ? this.user.lastname : '';
  }
  get isClient(): boolean {
    return this.authenticated && this.user.isClient;
  }
  get isTrainer(): boolean {
    return this.authenticated && this.user.isTrainer;
  }
  get isAdmin(): boolean {
    return this.authenticated && this.user.isOwner;
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

}
