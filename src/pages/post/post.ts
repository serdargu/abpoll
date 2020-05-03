import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

import moment from 'moment';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
  styles: [`
    .hidden {
      color:red;
    }
  `],
})
export class PostPage {

  comment: any;
  post: FirebaseListObservable<any[]>;
  comments: FirebaseListObservable<any[]>;
  likes_1: FirebaseListObservable<any[]>;
  likes_2: FirebaseListObservable<any[]>;
  block: boolean = false;
  show: any;
  Display: any = "none";
  percentage_1: any = 0;
  percentage_2: any = 0;
  first_likes: any = 0;
  second_likes: any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public modalCtrl: ModalController, public toastCtrl: ToastController, public _auth: AuthService) {

    this.post = this.navParams.get('item');
    var key = this.post['$key'];

    this.likes_1 = this.db.list('/posts/' + key + '/likes_1', { preserveSnapshot: true });
    this.likes_1
      .subscribe(snapshots => {
        this.first_likes = 0;
        this.second_likes = 0;
        snapshots.forEach(snapshot => {
          if(this._auth.authenticated)
            if (snapshot.val()["user_id"] == this._auth.currentUser.uid) this.block = true;
          this.first_likes++;
        });
      });


    this.likes_2 = this.db.list('/posts/' + key + '/likes_2', { preserveSnapshot: true });
    this.likes_2
      .subscribe(snapshots => {
        this.first_likes = 0;
        this.second_likes = 0;
        snapshots.forEach(snapshot => {
          if(this._auth.authenticated)
            if (snapshot.val()["user_id"] == this._auth.currentUser.uid) this.block = true;
          this.second_likes++;
        });
      });

    this.comments = this.db.list('/posts/' + key + '/comments/');


    if (this.block == true) {

      this.Display = "";

    }

  }

  sendLike(picture) {

    if (this.block) return;

    if (this._auth.authenticated) {

      if (picture == '1') {

        this.likes_1.push({
          user_id: this._auth.currentUser.uid
        });

      } else {

        this.likes_2.push({
          user_id: this._auth.currentUser.uid
        });

      }

      this.Display = "";

    } else {

      let modal = this.modalCtrl.create(LoginPage);
      modal.present();

    }

  }

  round(total, first) {

    if (total !== undefined) return Math.round(total);
    else return 0;

  }


  goBack() {
    this.navCtrl.pop();
  }

  count(list) {
    if (list === null) return 0;
    return list.length;
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad Post');
  }


  calculateRemainingTime(date) {

    moment.locale('tr');
    var start = moment();
    var end = moment(date);
    return end.from(start, true);

  }

  sendComment(comment) {

    if (this._auth.authenticated) {

      if (comment == null) {

        this.toastCtrl.create({
          message: "Lütfen yorum alanını boş bırakmayınız!",
          duration: 3000
        }).present()

      } else {

        this.comments.push({
          comment: comment,
          user_id: 1,
          user_name: this._auth.currentUser.displayName
        });

        this.comment = "";

        setTimeout(function () {
          var itemList = document.getElementById("auto-scroll");
          itemList.scrollTop = itemList.scrollHeight;
        }, 10);

      }

    } else {

      let modal = this.modalCtrl.create(LoginPage);
      modal.present();

    }


  }


}
