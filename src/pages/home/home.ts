import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, Platform } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../providers/auth-service';


import moment from 'moment';

import { PostPage } from '../post/post';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  posts: FirebaseListObservable<any[]>;
  loader: any;

  constructor(public platform: Platform, public navCtrl: NavController, public modalCtrl: ModalController, db: AngularFireDatabase, private _auth: AuthService, public storage: Storage, public loadingCtrl: LoadingController) {

    this.presentLoading();

    this.platform.ready().then(() => {

      this.storage.get('introShown').then((result) => {

        if (!result) {
          let modal = this.modalCtrl.create(LoginPage);
          modal.present();
          this.storage.set('introShown', true);
        }

        this.posts = db.list('/posts');
        this.posts.subscribe(data => {
          this.loader.dismiss();
        })

      });

    });

  }

  calculateRemainingTime(date) {

    moment.locale('tr');
    var start = moment();
    var end = moment(date);
    return end.from(start, true);

  }


  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Yükleniyor..."
    });

    this.loader.present();

  }

  openPost(item) {
    this.navCtrl.push(PostPage, {
      item: item
    });
  }

  count(list) {
    var size = 0, key;
    for (key in list) {
      if (list.hasOwnProperty(key)) size++;
    }
    return size;
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}

