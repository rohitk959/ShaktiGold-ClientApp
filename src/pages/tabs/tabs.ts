import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { AccountPage } from '../account/account';
import { AboutPage } from '../about/about';
import { SubcategoryPage } from '../subcategory/subcategory';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SubcategoryPage;
  tab2Root: any = CartPage;
  tab3Root: any = AccountPage;
  tab4Root: any = AboutPage;

  loginParams: any;

  constructor(public navParams: NavParams) {
    this.loginParams = {
      'email': this.navParams.get('email'),
      'sessionId': this.navParams.get('sessionId'),
      /*'email': 'rohit@gmail.com',
      'sessionId': '0c5a9781-32f7-4dc5-a532-11021374882d',*/
      'categoryName':'Gold'
    }
  }
}
