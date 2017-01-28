import { Component, ElementRef, ViewChild  } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { CategoryService } from '../../providers/category-service';
import { ItemListPage } from '../item-list/item-list';

@Component({
  selector: 'page-subcategory',
  templateUrl: 'subcategory.html',
  providers: [CategoryService]
})
export class SubcategoryPage {

  email;
  sessionId;
  category;
  public subcategory: any;
  public message: any;
  @ViewChild('demo') subcategoryBackImg: ElementRef;


  constructor(public navCtrl: NavController, 
      public navParams: NavParams, 
      public categorySrvc: CategoryService,
      public loadingCtrl: LoadingController,
      public platform: Platform) {}

  ionViewDidLoad() {
    this.email = this.navParams.get('email');
    this.sessionId = this.navParams.get('sessionId');
    this.category = this.navParams.get('categoryName');
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.getSubcategory();
    });
  }

  getSubcategory() {
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();
    this.categorySrvc.loadSubcategory(this.email, this.sessionId, this.category).then(data => {
      this.subcategory = data;
      this.message = this.subcategory.message;
      loader.dismiss();
    }, err => {
      loader.dismiss();
    });
  }

  getItem(subcategoryName) {
    this.navCtrl.push(ItemListPage,{
      'email': this.email,
      'sessionId': this.sessionId,
      'categoryName': this.category,
      'subcategoryName': subcategoryName
    });
  }
}