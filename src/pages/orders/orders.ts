import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController } from 'ionic-angular';
import { ItemDetailPage } from '../item-detail/item-detail';
import { ItemService } from '../../providers/item-service';
import * as globals from '../../app/globals';

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {

  email;
  sessionId;
  public showOrdersList: boolean = true;
  public ordersData: any;
  public message: any = [];

  constructor(private navCtrl: NavController, 
      private navParams: NavParams,
      private platform: Platform,
      private itemSrvc: ItemService,
      private alertCtrl: AlertController,
      private loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    this.email = this.navParams.get('email');
    this.sessionId = this.navParams.get('sessionId');
  }

  ionViewDidEnter() {
    this.ordersData = null;
    this.message = [];
    this.platform.ready().then(() => {
      this.loadOrders();
    });
  }

  loadOrders() {
    let loader = this.loadingCtrl.create({
        content: "Loading..."
      });
      loader.present();

    this.itemSrvc.loadOrders(this.email, this.sessionId).then( successData => {
      loader.dismiss();
      this.ordersData = successData;
      this.message = this.ordersData.message;
      this.showOrdersList = true;
    }, failureData => {
      loader.dismiss();
      this.ordersData = failureData;
      this.message = [];
      this.showOrdersList = false;
    }).catch( err => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
            title: globals.MAINTAINANCE_TITLE,
            subTitle: globals.MAINTAINANCE_MSG,
            buttons: ['OK']
          });
        alert.present();
      });
  }

  getItemDetails(itemId) {
    this.navCtrl.push(ItemDetailPage, {
      'email': this.email,
      'sessionId': this.sessionId,
      'itemId':itemId,
      'showButtons': false,
      'titleName': 'Orders'
    });
  }

}
