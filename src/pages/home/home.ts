import { Component } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { CategoryService } from '../../providers/category-service';
import { SubcategoryPage } from '../subcategory/subcategory';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mySlideOptions = {
    loop: true,
    autoplay: 2000,
    pager: true
  };

  public categories: any;
  public message: any;
  email;
  sessionId;

  constructor(public navCtrl: NavController, public navParams: NavParams, public categorySrvc: CategoryService) {
    this.email = this.navParams.get('email');
    this.sessionId = this.navParams.get('sessionId');
  }

  ionViewDidLoad() {
    this.loadCategory();
  }

  loadCategory() {
    this.categorySrvc.loadCategory(this.email, this.sessionId).then(data => {
      this.categories = data;
      this.message = this.categories.message;
    });
  }

  getSubcategory(categoryName) {
    this.navCtrl.push(SubcategoryPage, {
      'email': this.email,
      'sessionId': this.sessionId,
      'categoryName': categoryName
    });
  }

}
