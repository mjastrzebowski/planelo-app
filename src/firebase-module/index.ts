import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyBI8EMg_VgzTJeAQD9XJuCWKWrUQ7VFHJk",
  authDomain: "fiery-heat-1991.firebaseapp.com",
  databaseURL: "https://fiery-heat-1991.firebaseio.com",
  storageBucket: "fiery-heat-1991.appspot.com",
  messagingSenderId: "153269445746"
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

export const FirebaseModule = AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig);
