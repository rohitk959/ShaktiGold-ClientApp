import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  login: {username?: string, password?: string} = {};
  submitted = false;
  public loginData: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public authService: AuthService, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {}

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      let loader = this.loadingCtrl.create({
        content: "Loading..."
      });
      loader.present();

      this.authService.login(this.login.username, this.login.password).then(data => {
        this.loginData = data
        loader.dismiss();
        if(this.loginData.result == "SUCCESS") {
          this.navCtrl.push(TabsPage, {
            'email':this.login.username,
            'sessionId':this.loginData.sessionID
          });
        } else {
          let alert = this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Login Failed! Invalid Login Id / Password',
            buttons: ['OK']
          });
          alert.present();
        }
      });
    }
  }

  onSignup() {
    this.navCtrl.push(RegisterPage);
  }
}
