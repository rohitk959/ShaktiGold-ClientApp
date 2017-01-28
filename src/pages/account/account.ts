import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChangePasswordPage } from '../change-password/change-password';
import { UpdateProfilePage } from '../update-profile/update-profile';
import { OrdersPage } from '../orders/orders';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  email;
  sessionId;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.email = this.navParams.get('email');
    this.sessionId = this.navParams.get('sessionId');
  }

  changePassword() {
    this.navCtrl.push(ChangePasswordPage, {
      'email': this.email,
      'sessionId': this.sessionId
    });
  }

  updateProfile() {
    this.navCtrl.push(UpdateProfilePage, {
      'email': this.email,
      'sessionId': this.sessionId
    });
  }

  orders() {
    this.navCtrl.push(OrdersPage, {
      'email': this.email,
      'sessionId': this.sessionId
    });
  }
}
