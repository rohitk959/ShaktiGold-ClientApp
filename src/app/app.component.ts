import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;

  constructor(platform: Platform, storage: Storage, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      storage.get('logged_user').then( (loggedIn) => {

        if(loggedIn == null || loggedIn == false) {
          this.rootPage = LoginPage;
        } else {
          this.rootPage = TabsPage;
        } 
      }).catch( (loggedIn) => {
        this.rootPage = LoginPage;
      });
    });
  }
}
