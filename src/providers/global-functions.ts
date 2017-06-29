import { Injectable } from "@angular/core";
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login'

@Injectable()
export class GlobalFunctions {

  constructor(private storage: Storage,
      private modalCtrl: ModalController,
      private alertCtrl: AlertController) { }

    logout(navCtrl: NavController) {
      let alert = this.alertCtrl.create({
        title: 'Are you sure you want to logout?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Logout',
            handler: data => {
              this.storage.remove('logged_user').then(() => {
                this.storage.remove('session_id').then( () => {
                  navCtrl.popToRoot().then( () => {
                    let modal = this.modalCtrl.create(LoginPage);
                    modal.present();
                  });
                });
              });
            }
          }
        ]
      });
      alert.present();
    }
}
