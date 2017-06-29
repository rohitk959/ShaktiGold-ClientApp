import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import * as globals from "./../app/globals";

@Injectable()
export class AuthService {

  loginData: any;
  registerUserData: any;
  getUserProfileData: any;
  updateProfileData: any;
  changePasswordData: any;
  notificationCountData: any;

  host: string = globals.host;
  loginURL: string = this.host.concat( '/ShaktiGold/login.htm' );
  registerUserURL: string = this.host.concat( '/ShaktiGold/registerUser.htm' );
  getUserProfileURL: string = this.host.concat( '/ShaktiGold/getUserProfile.htm' );
  updateProfileURL: string = this.host.concat( '/ShaktiGold/updateProfile.htm' );
  changePasswordURL: string = this.host.concat( '/ShaktiGold/changePassword.htm' );
  notificationCountURL: string = this.host.concat( '/ShaktiGold/getNotificationCount.htm');

  constructor(public http: Http) {}

  login(email, password) {

    let body = JSON.stringify({
      'email': email,
      'password': password
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve,reject) => {
      this.http.post(this.loginURL, body, options)
      .timeout(globals.http_timeout)
      .map(res => res.json())
      .subscribe(data => {
        this.loginData = data;
        resolve(this.loginData);
      }, err => {
        reject('LOGIN_FAILED_TIMEOUT');
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

    return new Promise( (resolve,reject) => {
      this.http.post(this.registerUserURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.registerUserData = data;
        resolve(this.registerUserData);
      }, err => {
        reject('REGISTRATION_FAILED_TIMEOUT');
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

    return new Promise( (resolve,reject) => {
      this.http.post(this.getUserProfileURL, body, options)
      .timeout(globals.http_timeout)
      .map(res => res.json())
      .subscribe(data => {
        this.getUserProfileData = data;
        resolve(this.getUserProfileData);
      }, err => {
        reject('GET_USER_PROFILE_FAILED_TIMEOUT');
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

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve,reject) => {
      this.http.post(this.updateProfileURL, body, options)
      .timeout(globals.http_timeout)
      .map(res => res.json())
      .subscribe(data => {
        this.updateProfileData = data;
        resolve(this.updateProfileData);
      }, err => {
        reject('REGISTRATION_FAILED_TIMEOUT');
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

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve,reject) => {
      this.http.post(this.changePasswordURL, body, options)
      .timeout(globals.http_timeout)
      .map(res => res.json())
      .subscribe(data => {
        this.changePasswordData = data;
        resolve(this.changePasswordData);
      }, err => {
        reject("CHANGE_PASSWORD_FAILED_TIMEOUT");
      });
    });
  }

  getNotificationCount(email: string, sessionId: string) {
    let url = this.notificationCountURL + '?email=' + email + '&sessionId=' + sessionId;

    return new Promise( (resolve, reject) => {
      this.http.get(url)
      .timeout(globals.http_timeout)
      .map(res => res.json())
      .subscribe(data => {
        this.notificationCountData = data;
        if(this.notificationCountData.result == "SUCCESS") {
          resolve(this.notificationCountData);
        } else {
          reject(this.notificationCountData);
        }
      }, err => {
        reject("GET_NOTIFICATION_COUNT_FAILED_TIMEOUT");
      });
    });
  }
}