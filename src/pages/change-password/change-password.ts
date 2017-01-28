import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})

export class ChangePasswordPage  {

  email: any;
  sessionId: any;
  changePasswordData: any;

  changePasswordForm: FormGroup; 
  submitAttempt: any;

  constructor(private navController: NavController, 
      private navParams: NavParams, 
      private formBuilder: FormBuilder, 
      private authSrvc: AuthService,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController) {
    this.email = this.navParams.get('email');
    this.sessionId = this.navParams.get('sessionId');
    this.buildForm();
   }

  buildForm() {
   this.changePasswordForm = this.formBuilder.group({
        oldPassword: ['', Validators.compose([ Validators.minLength(6), Validators.maxLength(16), Validators.required ])],
        password: ['', Validators.compose([ Validators.minLength(6), Validators.maxLength(16), Validators.required ]) ],
        confirmPassword: ['', Validators.compose([ Validators.minLength(6), Validators.maxLength(16), Validators.required ]) ]
    }, {validator: ChangePasswordPage.passwordsMatch });
  }

  static passwordsMatch(cg: FormGroup): {[err: string]: any} {
    let pwd1 = cg.controls['password'];
    let pwd2 = cg.controls['confirmPassword'];
    let rv: any = {};
    if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
      rv.passwordMismatch= true;
    }
    return rv;
  }

  changePassword() {
    if(this.changePasswordForm.valid && this.changePasswordForm.value.password === this.changePasswordForm.value.confirmPassword){
      this.authSrvc.changePassword(this.email, this.sessionId, 
          this.changePasswordForm.value.oldPassword, 
          this.changePasswordForm.value.password).then( successData => {
            this.changePasswordData = successData;
            console.log(this.changePasswordData);
            if(this.changePasswordData.result == "SUCCESS") {
              let alert = this.alertCtrl.create({
                title: "Password updated successfully.",
                buttons: ["OK"]
              });
              alert.present();
            } else {
              let alert = this.alertCtrl.create({
                title: "Failed to update your password.",
                buttons: ["OK"]
              });
              alert.present();
            } 
          });
    } else {
      let toast = this.toastCtrl.create({
        message: "Please correct the form errors",
        duration: 3000
      });
    }
  }
}
