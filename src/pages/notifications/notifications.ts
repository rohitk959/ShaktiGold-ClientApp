import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  private email;
  private sessionId;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.email = this.navParams.get('email');
    this.sessionId = this.navParams.get('sessionId');
    this.loadNotifications();
  }

  loadNotifications() {
    
  }

}
