import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  segment: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private _auth: AuthService) {
    this.segment = this.navParams.get("segment") ? this.navParams.get("segment") : "register";    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }
 
  signUpWithEmail(email, password, name) {
    this._auth.signUpWithEmail(email, password, name).then(() => this.onSignInSuccess(), (err) => {
      console.log(err);
    });
  }

  //function to call when the user clicks the facebook login button
  signInWithFacebook(): void {
    this._auth.signInWithFacebook().then(() => this.onSignInSuccess(), (err) => {
      console.log(err);
    });
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

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
