import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { ItemService } from '../../providers/item-service';

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
  public itemDetailsData: any = [];
  public message: any = [];
  public itemProperties: any = [];
  addItem: boolean = true;
  public showButtons: boolean = true;

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

  ionViewDidEnter() {
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
    });
  }

  addToCart() {
    if(this.addItem) {
      let loader = this.loadingCtrl.create({
        content: "Loading..."
      });
      loader.present();
      this.addItem = false;
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
      });
    } else {
      let popup = this.alertCtrl.create({
        title: 'Info',
        message: 'This product has already been added to cart.',
        buttons: ['OK']
      });
      popup.present();
    }
  }

  getEstimate(itemId) {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();
    this.itemSrvc.getEstimate(this.email, this.sessionId, itemId).then(() => {
      loader.dismiss();
      let popup = this.alertCtrl.create({
        title: 'Info',
        message: 'Your request has been submitted. You will recieve an estimate via SMS shortly.',
        buttons: ['OK']
      });
      popup.present();
    }, reject => {
      loader.dismiss();
      let popup = this.alertCtrl.create({
        title: 'Info',
        message: 'Failed to send your request has been submitted. Please contact admin.',
        buttons: ['OK']
      });
      popup.present();
    });
  }

}
