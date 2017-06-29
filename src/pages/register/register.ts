import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import * as globals from '../../app/globals';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AuthService]
})
export class RegisterPage {

  profile = {firstName: '', lastName: '', mobile: '', email: '', password: ''};
  submitted = false;
  signUpResponse: any;
  registrationForm: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public authService: AuthService,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder) {
      this.registrationForm = this.formBuilder.group({
        firstName: ['', Validators.compose( [ Validators.minLength(3), Validators.maxLength(16), Validators.pattern('[a-zA-Z]+'), Validators.required ] ) ],
        lastName: ['', Validators.compose( [ Validators.minLength(3), Validators.maxLength(16), Validators.pattern('[a-zA-Z]+'), Validators.required ] ) ],
        mobile: ['', Validators.compose( [ Validators.pattern('^[0-9]{10}$'), Validators.required ] ) ],
        email: ['', Validators.compose( [ Validators.pattern('.+@.+\..+'), Validators.required ] ) ],
        password: ['', Validators.compose( [ Validators.minLength(6), Validators.maxLength(16), Validators.required ] ) ]
      });
    }

  ionViewDidLoad() {}

  signMeUp(form) {
    this.submitted = true;
    if (this.registrationForm.valid) {
      this.submitted = false;
      let loader = this.loadingCtrl.create({
        content: "Loading..."
      });
      loader.present();
      this.authService.signup(this.profile).then( data => {
        this.signUpResponse = data;
        console.log(this.signUpResponse);
        loader.dismiss();
        if(this.signUpResponse.result == "SUCCESS") {
          let alert = this.alertCtrl.create({
             title: 'Congratulations!',
             subTitle: 'Your registration is complete. Please login again.',
             buttons: [
               {
                 text: 'OK',
                  handler: () => {
                    this.navCtrl.pop();
                  }
               }
             ]
          });
          alert.present();
        } else {
          let alertFail = this.alertCtrl.create({
            title: 'Oops!',
            subTitle: this.signUpResponse.message,
            buttons: ['OK']
          });
          alertFail.present();
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
}
