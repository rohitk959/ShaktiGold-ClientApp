import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { GlobalFunctions } from '../../providers/global-functions';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="logout()">Logout</button>
    </ion-list>
  `
})
export class PopoverContent {
  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private gfunc: GlobalFunctions) {}

  logout() {
    this.gfunc.logout(this.navCtrl);
  }
}