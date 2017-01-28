import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ItemDetailPage } from '../item-detail/item-detail';
import { ItemService } from '../../providers/item-service';

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

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public platform: Platform,
      public itemSrvc: ItemService) {}

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

    this.itemSrvc.loadOrders(this.email, this.sessionId).then( successData => {
      this.ordersData = successData;
      this.message = this.ordersData.message;
      this.showOrdersList = true;
    }, failureData => {
      this.ordersData = failureData;
      this.message = [];
      this.showOrdersList = false;
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
