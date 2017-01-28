import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as globals from "./../app/globals";

@Injectable()
export class AuthService {

  loginData: any;
  registerUserData: any;
  getUserProfileData: any;
  updateProfileData: any;
  changePasswordData: any;

  host: string = globals.host;
  loginURL: string = this.host.concat( '/ShaktiGold/login.htm' );
  registerUserURL: string = this.host.concat( '/ShaktiGold/registerUser.htm' );
  getUserProfileURL: string = this.host.concat( '/ShaktiGold/getUserProfile.htm' );
  updateProfileURL: string = this.host.concat( '/ShaktiGold/updateProfile.htm' );
  changePasswordURL: string = this.host.concat( '/ShaktiGold/changePassword.htm' );

  constructor(public http: Http) {}

  login(email, password) {

    let body = JSON.stringify({
      'email': email,
      'password': password
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( resolve => {
      this.http.post(this.loginURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.loginData = data;
        resolve(this.loginData);
      }, err => {
        console.log('Login Failed' + err);
      });
    });
  }

  signup(formData) {
    let body = JSON.stringify({
      'firstName': formData.firstName,
      'lastName': formData.lastName,
      'email': formData.email,
      'password': formData.password,
      'userDetailsModel': {
        'mobileNumber': formData.mobile
      }
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( resolve => {
      this.http.post(this.registerUserURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.registerUserData = data;
        resolve(this.registerUserData);
      }, err => {
        console.log('SignUp Failed' + err);
      });
    });
  }

  getUserProfile(email: string, sessionId: string) {

    let body = JSON.stringify({
      'email': email,
      'sessionId': sessionId
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( resolve => {
      this.http.post(this.getUserProfileURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.getUserProfileData = data;
        resolve(this.getUserProfileData);
      }, err => {
        console.log('SignUp Failed' + err);
      });
    });
  }

  updateProfile(email: string, sessionId: string, userProfile: any) {

    let body = JSON.stringify({
      'email': email,
      'sessionId': sessionId,
      'userDetailsModel': {
        'addressLine1': userProfile.addressLine1,
        'addressLine2': userProfile.addressLine2,
        'state': userProfile.state,
        'country': userProfile.country,
        'mobileNumber': userProfile.mobileNumber,
        'altMobileNumber': userProfile.altMobileNumber,
        'landLineNumber': userProfile.landLineNumber
      }
    });

    console.log(body);

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( resolve => {
      this.http.post(this.updateProfileURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.updateProfileData = data;
        console.log(this.updateProfileData);
        resolve(this.updateProfileData);
      }, err => {
        console.log('Profile update Failed' + err);
      });
    });
  }

  changePassword(email: string, sessionId: string, password: string, newPassword: string) {

    let body = JSON.stringify({
      'email': email,
      'sessionId': sessionId,
      'password': password,
      'newPassword': newPassword
    });

    console.log(body);

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( resolve => {
      this.http.post(this.changePasswordURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.changePasswordData = data;
        resolve(this.changePasswordData);
      }, err => {
        console.log('SignUp Failed' + err);
      });
    });
  }
}