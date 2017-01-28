import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html'
})
export class UpdateProfilePage {

  email: string;
  sessionId: string;
  userProfileData: any;
  userProfile = {
    addressLine1: '',
    addressLine2: '',
    state: '',
    country: '',
    mobileNumber: '',
    altMobileNumber: '',
    landLineNumber: ''};

  updateProfileForm: FormGroup;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public authSrvc: AuthService,
      public alertCtrl: AlertController,
      public loadingCtrl: LoadingController) {

        this.updateProfileForm = this.formBuilder.group({
          addressLine1: [this.userProfile.addressLine1, Validators.compose([ Validators.required ])],
          addressLine2: [this.userProfile.addressLine2],
          state: [this.userProfile.state, Validators.compose([ Validators.required ])],
          country: [this.userProfile.country, Validators.compose([ Validators.required ])],
          mobileNumber: [this.userProfile.mobileNumber, Validators.compose([ Validators.minLength(10), Validators.maxLength(10), Validators.required ])],
          altMobileNumber: [this.userProfile.altMobileNumber],
          landLineNumber: [this.userProfile.landLineNumber],
        });
      }

  ionViewDidLoad() {
    this.email = this.navParams.get('email');
    this.sessionId = this.navParams.get('sessionId');
  }

  ionViewDidEnter() {
    let loader = this.loadingCtrl.create({
      content: 'loading...'
    });
    loader.present();
    this.authSrvc.getUserProfile(this.email, this.sessionId).then(successData => {
      this.userProfileData = successData;
      this.updateValues();
      loader.dismiss();
    });
  }

  updateValues() {
    this.userProfile.addressLine1 = this.userProfileData.message.userDetailsModel.addressLine1;
    this.userProfile.addressLine2 = this.userProfileData.message.userDetailsModel.addressLine2
    this.userProfile.state = this.userProfileData.message.userDetailsModel.state;
    this.userProfile.country = this.userProfileData.message.userDetailsModel.country;
    this.userProfile.mobileNumber = this.userProfileData.message.userDetailsModel.mobileNumber;
    this.userProfile.altMobileNumber = this.userProfileData.message.userDetailsModel.altMobileNumber;
    this.userProfile.landLineNumber = this.userProfileData.message.userDetailsModel.landLineNumber;
  }

  updateProfile() {
    if(this.updateProfileForm.valid) {
      let loader = this.loadingCtrl.create({
        content: "Loading..."
      });
      loader.present();

      this.authSrvc.updateProfile(this.email, this.sessionId, this.userProfile).then(successData => {
        this.userProfileData = successData;
        this.ionViewDidEnter();
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Your Profile has been updated.',
          buttons: ["OK"]
        });
      });
    }
  }
}