import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
// Do not import from 'firebase' as you'll lose the tree shaking benefits
import * as firebase from 'firebase/app';

import { Platform, ToastController } from 'ionic-angular';

@Injectable()
export class AuthService {

  public authState: Observable<firebase.User>;
  public currentUser: firebase.User;
  platform: Platform;

  constructor(public angularFireAuth: AngularFireAuth, public googlePlus: GooglePlus) {
    this.authState = angularFireAuth.authState;
    this.authState.subscribe((user: firebase.User) => {
      this.currentUser = user;
    });
  }

  get user(): firebase.User {
    return this.currentUser;
  }

  get authenticated(): boolean {
    return this.currentUser !== null;
  }

  signUpWithEmail(email, password, name) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {

    /*var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return firebase.auth().signInWithRedirect(provider);*/


    return this.googlePlus.login({
      'webClientId': '224614930692-doeaqhgd85iiqufdjvr35qd5o5gilac4.apps.googleusercontent.com'
    }).then((res) => {
      const googlePlusCredential = firebase.auth.GoogleAuthProvider.credential(res.accessToken);
      return this.angularFireAuth.auth.signInWithCredential(googlePlusCredential);
    }, (err) => {
      console.log(err);
    });

  }

  signInWithTwitter() {
    return this.angularFireAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  signInWithFacebook() {
    /*if (this.platform.is('cordova')) {
      return Facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return this.angularFireAuth.auth.signInWithCredential(facebookCredential);
      });
    } else {*/
    return this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    //}

  }

  signOut(): void {
    this.angularFireAuth.auth.signOut();
  }

}