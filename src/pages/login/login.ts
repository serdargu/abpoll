import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public _auth: AuthService, public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  //function to call when the user clicks the facebook login button
  signInWithTwitter(): void {
    this._auth.signInWithTwitter().then(() => this.onSignInSuccess(), (err) => {
      console.log(err);
    });
  }

  signUpWithEmail(email, password, name) {

    if (email == null || password == null || name == null) {

      this.toastCtrl.create({
        message: "Lütfen boş alan bırakmayınız.",
        duration: 3000
      }).present()

    } else {

      this._auth.signUpWithEmail(email, password, name).then((user) => {

        user.updateProfile({
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function () {

        }, function (error) {
          // An error happened.
        });

        this.onSignInSuccess()

      }, (err) => {

        if (err.message == "The email address is badly formatted.") {

          this.toastCtrl.create({
            message: "Geçerli bir mail adresi giriniz.",
            duration: 3000
          }).present()

        } else if (err.message == "Password should be at least 6 characters") {

          this.toastCtrl.create({
            message: "Şifreniz 6 karakterden az olamaz.",
            duration: 3000
          }).present()

        } else if (err.message == "Password should be at least 6 characters") {

          this.toastCtrl.create({
            message: "Bir hata oluştu, tekrar deneyin.",
            duration: 3000
          }).present()

        }
        console.log(err);
      });

    }

  }

  //function to call when the user clicks the google login button
  signInWithGoogle(): void {
    this._auth.signInWithGoogle().then(() => this.onSignInSuccess(), (err) => {
      console.log(err);
    });
  }

  //call the function when user logs in successfully
  private onSignInSuccess(): void {

    //set the root with homepage when the user logs in
    this.navCtrl.popAll();
  }

  //push the new modal RegisterPage with Register or Login segments
  openRegister(segment) {
    this.navCtrl.push(RegisterPage, { "segment": segment });
    this.viewCtrl.dismiss();
  }

  //when click on the X button at the top of the page
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
