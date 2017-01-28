import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, AlertController, LoadingController,ModalController } from 'ionic-angular';
import { ItemService } from '../../providers/item-service';
import { ItemDetailsCartPage } from '../item-details-cart/item-details-cart';
import { ItemDetailPage } from '../item-detail/item-detail';
import { SubcategoryPage } from '../subcategory/subcategory';

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

  constructor(public navCtrl: NavController, 
      public navParams: NavParams, 
      public itemSrvc: ItemService,
      public viewCtrl: ViewController,
      public platform: Platform,
      public alertCtrl: AlertController,
      public loadingCtrl: LoadingController,
      public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    this.email = this.navParams.get('email');
    this.sessionId = this.navParams.get('sessionId');
  }

  ionViewDidEnter() {
    this.cartData = null;
    this.message = [];
    this.platform.ready().then(() => {
      this.loadCart();
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
    let loader1 = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader1.present();
    this.itemSrvc.deleteItemFromCart(this.email, this.sessionId, itemId).then(successData => {
      this.loadCart();
      loader1.dismiss();
      let popup = this.alertCtrl.create({
          title: 'Info',
          message: 'Product has been removed from cart.',
          buttons: ['OK']
        });
        popup.present();
    },failureData => {
      loader1.dismiss();
      let popup = this.alertCtrl.create({
          title: 'Info',
          message: 'Failed to remove product from cart.',
          buttons: ['OK']
        });
        popup.present();
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
      console.log(this.orderData);
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
    });
  }
}