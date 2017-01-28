import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
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
  images: Array<string>;  
  grid: Array<Array<string>>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public itemSrvc: ItemService,
    public platform: Platform,
    public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    this.email = this.navParams.get('email');
    this.sessionId = this.navParams.get('sessionId');
    this.category = this.navParams.get('categoryName');
    this.subcategory = this.navParams.get('subcategoryName');
  }

  ionViewDidEnter() {
    this.itemListData = null;
    this.platform.ready().then(() => {
      this.getItemList();
    });
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
                                  this.images = this.itemListData.message;
                                  this.grid = Array(Math.ceil(this.images.length/2));
                                  this.showImageGrid();
                                  loader.dismiss();
                              });
  }

  showImageGrid() {
  let rowNum = 0;

  for (let i = 0; i < this.images.length; i+=2) {
    this.grid[rowNum] = Array(2);
    if (this.images[i]) {
      this.grid[rowNum][0] = this.images[i];
    }

    if (this.images[i+1]) {
      this.grid[rowNum][1] = this.images[i+1];
    }
    rowNum++;
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
}