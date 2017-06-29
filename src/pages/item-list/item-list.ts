import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, AlertController } from 'ionic-angular';
import { ItemService } from '../../providers/item-service';
import { ItemDetailPage } from '../item-detail/item-detail';
import * as globals from "../../app/globals";

@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
  providers: [ItemService]
})
export class ItemListPage {

  email;
  sessionId;
  category;
  subcategory;
  limit = globals.limit;
  offset = globals.offset;
  public itemListData: any;
  imageGrid: Grid[] = [];
  hasMoreItems: boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public itemSrvc: ItemService,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {}

  ionViewDidLoad() {
    this.email = this.navParams.get('email');
    this.sessionId = this.navParams.get('sessionId');
    this.category = this.navParams.get('categoryName');
    this.subcategory = this.navParams.get('subcategoryName');

    this.platform.ready().then(() => {
      if(this.itemListData == null) {
        this.getItemList();
      }
    });
  }

  ionViewDidEnter() {

  }

  getItemList() {

    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.itemSrvc.loadItemList(this.email, 
                                this.sessionId, 
                                this.category, 
                                this.subcategory, 
                                this.limit, 
                                this.offset).then(data => {
                                  this.itemListData = data;
                                  this.itemListData = this.itemListData.message;
                                  this.hasMoreItems = this.itemListData.hasMore;
                                  this.loadImageGrid();
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

  loadImageGrid() {
    for (let i = 0; i < this.itemListData.items.length; i+=2) {
      this.imageGrid.push(new Grid(this.itemListData.items[i], this.itemListData.items[i+1]));
    }
  }

  getItemDetails(itemId) {
    this.navCtrl.push(ItemDetailPage, {
      'email': this.email,
      'sessionId': this.sessionId,
      'itemId': itemId,
      'showButtons': true,
      'titleName': this.subcategory
    });
  }

  loadMoreItems() {
    this.offset = this.limit;
    this.itemListData = null;
    this.getItemList();
  }
}

export class Grid {
  img1: any;
  img2: any;

  constructor(_img1: any, _img2: any) {
    this.img1 = _img1;
    this.img2 = _img2;
  }
}