import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ChangePasswordPage } from '../change-password/change-password';
import { UpdateProfilePage } from '../update-profile/update-profile';
import { OrdersPage } from '../orders/orders';
import { PopoverContent } from '../popover-content/popover-content';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  email: string;
  sessionId: string;

  constructor(private navCtrl: NavController, 
      private navParams: NavParams,
      private platform: Platform,
      private storage: Storage,
      private alertCtrl: AlertController,
      private popoverCtrl: PopoverController) { }

  ionViewDidLoad() { }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      if(this.email == null || this.sessionId == null){
        this.storage.get('logged_user').then( (loggedUser) => {
          this.email = loggedUser;
          this.storage.get('session_id').then( (sessionId) => {
            this.sessionId = sessionId;
          });
        });
      }
    });
  }

  changePassword() {
    if(this.email != null && this.sessionId != null){
      this.navCtrl.push(ChangePasswordPage, {
        'email': this.email,
        'sessionId': this.sessionId
      });
    } else {
      let alert = this.alertCtrl.create({
        title: 'Oops.. Something went wrong. Please login again.',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  updateProfile() {
    if(this.email != null && this.sessionId != null){
      this.navCtrl.push(UpdateProfilePage, {
        'email': this.email,
        'sessionId': this.sessionId
      });
    } else {
      let alert = this.alertCtrl.create({
        title: 'Oops.. Something went wrong. Please login again.',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  orders() {
    if(this.email != null && this.sessionId != null){
      this.navCtrl.push(OrdersPage, {
        'email': this.email,
        'sessionId': this.sessionId
      });
    } else {
      let alert = this.alertCtrl.create({
        title: 'Oops.. Something went wrong. Please login again.',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverContent);
    popover.present({
      ev: myEvent
    });
  }
}
