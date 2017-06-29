import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { AuthService } from '../../providers/auth-service';
import * as globals from '../../app/globals';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  login = {username: '', password: ''};
  submitted = false;
  public loginData: any;
  loginForm: FormGroup;

  constructor(private navCtrl: NavController, 
    private navParams: NavParams, 
    private authService: AuthService, 
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder) {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.compose( [ Validators.pattern('.+@.+\..+'), Validators.required ] ) ],
        password: ['', Validators.compose( [ Validators.minLength(6), Validators.maxLength(16), Validators.required ] ) ]
      });
    }

  ionViewDidLoad() {}

  onLogin() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.submitted = false;
      let loader = this.loadingCtrl.create({
        content: "Loading..."
      });
      loader.present();

      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then(data => {
        this.loginData = data;
        loader.dismiss();
        if(this.loginData.result == "SUCCESS") {
          this.storage.set('logged_user',this.loginForm.value.email).then( () => {
            this.storage.set('session_id', this.loginData.sessionID).then( () => {
              this.navCtrl.push(TabsPage).then( () => {
                const index = this.viewCtrl.index;
                this.navCtrl.remove(index);
              });
            }); 
          });
        } else {
          let alert = this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Login Failed! Invalid Login Id / Password',
            buttons: ['OK']
          });
          alert.present();
        }
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
  }

  onSignup() {
    this.navCtrl.push(RegisterPage);
  }
}
