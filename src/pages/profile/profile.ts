import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from '../../providers/auth-service';

import { TabsPage } from '../tabs/tabs';
import { PostPage } from '../post/post';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  liked_posts: FirebaseListObservable<any[]>;
  asked_posts: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, db: AngularFireDatabase, public navParams: NavParams, private _auth: AuthService) {
    this.asked_posts = db.list('/posts', { query: { orderByChild: "user_id", equalTo: this._auth.currentUser.uid } });

  }

 /* scoresRef.limitToLast(10).once('value', function(snap) {
   var i = 0;
   snap.forEach(function(userSnap) {
      console.log('user %s is in position %d with %d points', snap.key(), i++, snap.val());
   });
});*/

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }

  logout() {

    this._auth.signOut();
    this.navCtrl.setRoot(TabsPage);

  }

}
