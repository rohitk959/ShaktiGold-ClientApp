import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ItemService } from '../../providers/item-service';
import { ItemDetailPage } from '../item-detail/item-detail';
import { PopoverContent } from '../popover-content/popover-content';
import * as globals from '../../app/globals';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers: [ItemService]
})
export class CartPage {

  email;
  sessionId;
  public cartData: any;
  public message: any = [];
  public orderData: any;
  public showCartList: boolean = true;

  constructor(private navCtrl: NavController, 
      private navParams: NavParams, 
      private itemSrvc: ItemService,
      private platform: Platform,
      private alertCtrl: AlertController,
      private loadingCtrl: LoadingController,
      private storage: Storage,
      private popoverCtrl: PopoverController ) { }

  ionViewDidLoad() { }

  ionViewDidEnter() {
    this.cartData = null;
    this.message = [];
    this.platform.ready().then(() => {
      if(this.email == null || this.sessionId == null){
        this.storage.get('logged_user').then( (loggedUser) => {
          this.email = loggedUser;
          this.storage.get('session_id').then( (sessionId) => {
            this.sessionId = sessionId;
            this.loadCart();
          });
        });
      } else {
        this.loadCart();
      }
    });
  }

  loadCart() {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();
    this.itemSrvc.getCart(this.email, this.sessionId).then(successData => {
      this.cartData = successData;
      this.message = this.cartData.message;
      this.showCartList = true;
      loader.dismiss();
    },failureData => {
      this.cartData = failureData;
      this.message = [];
      this.showCartList = false;
      loader.dismiss();
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
      'titleName': 'Cart'
    });
  }

  deleteItemFromCart(itemId) {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();
    this.itemSrvc.deleteItemFromCart(this.email, this.sessionId, itemId).then(successData => {
      this.loadCart();
      loader.dismiss();
      let popup = this.alertCtrl.create({
          title: 'Info',
          message: 'Product has been removed from cart.',
          buttons: ['OK']
        });
        popup.present();
    },failureData => {
      loader.dismiss();
      let popup = this.alertCtrl.create({
          title: 'Info',
          message: 'Failed to remove product from cart.',
          buttons: ['OK']
        });
        popup.present();
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

  placeOrder() {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();
    this.itemSrvc.placeOrder(this.email, this.sessionId).then( successData => {
      this.orderData = successData;
      loader.dismiss();
      if(this.orderData.result == "SUCCESS") {
        let alert = this.alertCtrl.create({
          title: "Your order has been confirmed.",
          subTitle: "Thank you for shopping with us.",
          buttons: [{
            text: "OK",
            handler: () => {
              this.navCtrl.parent.select(0);
              this.navCtrl.parent.select(0);
            }
          }],
        });
        alert.present();
      } else {
        loader.dismiss(); 
        let alert = this.alertCtrl.create({
          title: "Oops.",
          subTitle: "Something went wrong. Unable to place your order.",
          buttons: ["OK"]
        });
        alert.present();
      }
    }, failureData => {
      loader.dismiss(); 
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

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverContent);
    popover.present({
      ev: myEvent
    });
  }
}