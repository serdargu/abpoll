import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { AuthService } from '../providers/auth-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = TabsPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public modalCtrl: ModalController, private _auth: AuthService) {
    this.initializeApp();
    
    // used for an example of ngFor and navigation
    if (!this._auth.authenticated) {

      this.pages = [
        { title: 'Home', component: TabsPage },
        { title: 'Login', component: LoginPage }
      ];

    } else {

      this.pages = [
        { title: 'Home', component: TabsPage },
        { title: 'Logout', component: TabsPage }
      ];

    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title == "Logout") {
      this._auth.signOut();
      this.nav.setRoot(page.component);
    } else if (page.title == "Login") {
      let modal = this.modalCtrl.create(page.component);
      modal.present();
    } else {
      this.nav.setRoot(page.component);
    }

  }
}
