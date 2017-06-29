import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform, AlertController, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CategoryService } from '../../providers/category-service';
import { AuthService } from '../../providers/auth-service';
import { ItemListPage } from '../item-list/item-list';
import * as globals from '../../app/globals';
import { PopoverContent } from '../popover-content/popover-content';
import { NotificationsPage } from '../notifications/notifications';

@Component({
  selector: 'page-subcategory',
  templateUrl: 'subcategory.html',
  providers: [CategoryService]
})
export class SubcategoryPage {

  email;
  sessionId;
  category;
  private subcategory: any;
  private message: any;
  private notificationCount: number = 0;
  private notificationCountData: any = [];


  constructor(private navCtrl: NavController, 
      private navParams: NavParams, 
      private categorySrvc: CategoryService,
      private loadingCtrl: LoadingController,
      private platform: Platform,
      private alertCtrl: AlertController,
      private authSrvc: AuthService,
      private storage: Storage,
      private popoverCtrl: PopoverController) {}

  ionViewDidLoad() {
    this.email = this.navParams.get('email');
    this.sessionId = this.navParams.get('sessionId');
    this.category = 'Gold';
    this.loadSubcategoryData();
  }

  ionViewDidEnter() {
    
  }

  loadSubcategoryData() {
    if(this.subcategory == null){
      if(this.email == null || this.sessionId == null) {
        this.platform.ready().then(() => {
          this.storage.get('logged_user').then( (loggedUser) => {
            this.email = loggedUser;
            this.storage.get('session_id').then( (sessionId) => {
              this.sessionId = sessionId;
              this.getSubcategory();
              this.loadNotificationCount();
            });
          });
        });
      } else {
        this.getSubcategory();
      }
    }
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

  getItem(subcategoryName) {
    this.navCtrl.push(ItemListPage,{
      'email': this.email,
      'sessionId': this.sessionId,
      'categoryName': this.category,
      'subcategoryName': subcategoryName
    });
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverContent);
    popover.present({
      ev: myEvent
    });
  }

  loadNotificationCount() {
    this.authSrvc.getNotificationCount(this.email, this.sessionId).then( successData => {
      this.notificationCountData = successData;
      this.notificationCount = this.notificationCountData.message.notificationCount;
    }, failureData => {
      this.notificationCount = 0;
    } )
  }

  displayNotifications() {
    this.navCtrl.push(NotificationsPage, {
      'email': this.email,
      'sessionId': this.sessionId
    });
  }
}