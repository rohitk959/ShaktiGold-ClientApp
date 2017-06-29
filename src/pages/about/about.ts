import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { PopoverContent } from '../popover-content/popover-content';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(private navCtrl: NavController,
      private popoverCtrl: PopoverController) { }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverContent);
    popover.present({
      ev: myEvent
    });
  }
}
