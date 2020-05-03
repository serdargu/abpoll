import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';


import moment from 'moment';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})

export class CameraPage {

  title: any;
  description: any;
  time: any;
  picture_1: any;
  picture_2: any;
  posts: FirebaseListObservable<any[]>;
  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 400,
    correctOrientation: false,
  }

  constructor(public _auth: AuthService, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public camera: Camera, db: AngularFireDatabase, public toastCtrl: ToastController) {

    this.picture_1 = "assets/images/201.png";
    this.picture_2 = "assets/images/201.png";
    this.posts = db.list('/posts');

  }

  takePhoto(picture) {
    this.camera.getPicture(this.options).then((imageData) => {
      if (picture == '1')
        this.picture_1 = this.picture_1 = 'data:image/jpeg;base64,' + imageData;
      else
        this.picture_2 = this.picture_2 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  sendPost(title, description, time) {

    if (title == null || description == null || time == null || this.picture_1 == "assets/images/201.png" || this.picture_2 == "assets/images/201.png") {

      this.toastCtrl.create({
        message: "Lütfen boş alan bırakmayınız!",
        duration: 3000
      }).present()

    } else {

      moment.locale('tr');
      var date;
      if (time == "30min") date = moment().add(30, 'minutes');
      else if (time == "60mins") date = moment().add(1, 'hour');
      else if (time == "5hours") date = moment().add(5, 'hours');
      else if (time == "1day") date = moment().add(1, 'day');
      else date = moment().add(7, 'days');

      this.posts.push({
        title: title,
        description: description,
        picture_1: this.picture_1,
        picture_2: this.picture_2,
        time: date.format(),
        user_id: this._auth.user.uid,
        user_name: this._auth.user.displayName,
      });

      this.viewCtrl.dismiss();
    }



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Camera');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
