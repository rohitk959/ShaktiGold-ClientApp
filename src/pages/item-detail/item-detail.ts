import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { ItemService } from '../../providers/item-service';
import * as globals from '../../app/globals';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
  providers: [ItemService]
})
export class ItemDetailPage {

  email;
  sessionId;
  itemId;
  titleName;
  private itemDetailsData: any = [];
  private message: any = [];
  private itemProperties: any = [];
  private estimateData: any = [];
  private showButtons: boolean = true;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams, 
      public itemSrvc: ItemService, 
      public alertCtrl: AlertController,
      public loadingCtrl: LoadingController,
      public platform: Platform) {}

  ionViewDidLoad() {
    this.email = this.navParams.get('email');
    this.sessionId = this.navParams.get('sessionId');
    this.itemId = this.navParams.get('itemId');
    this.showButtons = this.navParams.get('showButtons');
    this.titleName = this.navParams.get('titleName');
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.loadItemDetails();
    });
  }

  loadItemDetails() {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();
    this.itemSrvc.loadItemDetails(this.email, this.sessionId, this.itemId).then( data => {
      this.itemDetailsData = data;
      this.message = this.itemDetailsData.message;
      this.itemProperties = this.itemDetailsData.message.itemProperty;
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

  addToCart() {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();
    this.itemSrvc.addToCart(this.email, this.sessionId, this.itemId, "1").then(() => {
      loader.dismiss();
      let popup = this.alertCtrl.create({
        title: 'Info',
        message: 'This product has been added to cart.',
        buttons: ['OK']
      });
      popup.present();
    }, reject => {
      loader.dismiss();
      let popup = this.alertCtrl.create({
        title: 'Info',
        message: 'This product has already been added to cart.',
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

  getEstimate(itemId) {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();
    this.itemSrvc.getEstimate(this.email, this.sessionId, itemId).then((successData) => {
      this.estimateData = successData;
      loader.dismiss();
      let popup = this.alertCtrl.create({
        title: 'Info',
        message: this.estimateData.message,
        buttons: ['OK']
      });
      popup.present();
    }, (failureData) => {
      this.estimateData = failureData;
      loader.dismiss();
      let popup = this.alertCtrl.create({
        title: 'Info',
        message: this.estimateData.message,
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

}
