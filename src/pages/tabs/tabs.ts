import { Component } from '@angular/core';
import { App, ModalController, NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { CameraPage } from '../camera/camera';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';

import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = ProfilePage;

  constructor(public app: App, public navCtrl: NavController, public modalCtrl: ModalController, private _auth: AuthService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tabs');
  }

  openCamera() {

    if (!this._auth.authenticated) {
      
      let modal = this.modalCtrl.create(LoginPage);
      modal.present();

    } else {

      let modal = this.modalCtrl.create(CameraPage);
      modal.present();

    }

  }

  openProfile() {

    if (!this._auth.authenticated) {

      let modal = this.modalCtrl.create(LoginPage);
      modal.present();

    } else {

      this.app.getRootNav().push(ProfilePage);

    }


  }
}
