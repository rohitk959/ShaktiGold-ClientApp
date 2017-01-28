import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AuthService]
})
export class RegisterPage {

  profile: {firstName?: string, lastName?: string, mobile?: string, email?: string, password?: string} = {};
  submitted = false;
  signUpResponse: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public authService: AuthService,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {}

  signMeUp(form) {
    this.submitted = true;

    if (form.valid) {
      let loader = this.loadingCtrl.create({
        content: "Loading..."
      });
      loader.present();
      this.authService.signup(this.profile).then( data => {
        this.signUpResponse = data;
        loader.dismiss();
        if(this.signUpResponse.result == "SUCCESS") {
          let alert = this.alertCtrl.create({
             title: 'Congratulations!',
             subTitle: 'Your registration is complete. Please login again.',
             buttons: [
               {
                 text: 'OK',
                  handler: () => {
                    let modal = this.modalCtrl.create(LoginPage);
                    modal.present();
                  }
               }
             ]
          });
          alert.present();
        } else {
          let alertFail = this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Something went wrong. Registration failed.',
            buttons: ['OK']
          });
          alertFail.present();
        }
      });
    }
  }
}
