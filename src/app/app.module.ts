import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';



import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../providers/auth-service';
import { GooglePlus } from '@ionic-native/google-plus';

import { Camera } from '@ionic-native/camera';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PostPage } from '../pages/post/post';
import { TabsPage } from '../pages/tabs/tabs';
import { CameraPage } from '../pages/camera/camera';
import { ProfilePage } from '../pages/profile/profile';

export const firebaseConfig = {
  apiKey: "AIzaSyAPkc4HBeIrNbMkMgJNHVBu8UIpKRJ02xg",
  authDomain: "abpoll-e3a36.firebaseapp.com",
  databaseURL: "https://abpoll-e3a36.firebaseio.com",
  projectId: "abpoll-e3a36",
  storageBucket: "abpoll-e3a36.appspot.com",
  messagingSenderId: "224614930692"
};

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PostPage,
    TabsPage,
    CameraPage,
    LoginPage,
    ProfilePage,
    RegisterPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PostPage,
    TabsPage,
    CameraPage,
    LoginPage,
    ProfilePage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    Camera,
    AngularFireAuth,
    GooglePlus
  ]
})
export class AppModule { }
