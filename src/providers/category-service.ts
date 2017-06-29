import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as globals from "./../app/globals";

@Injectable()
export class CategoryService {

  categoryData: any;
  subcategoryData: any;
  host: string = globals.host;
  getCategoryURL: string = this.host.concat( '/ShaktiGold/getAllCategory.htm' );
  getSubcategoryURL: string = this.host.concat( '/ShaktiGold/getAllSubCategory.htm' );
  
  constructor(public http: Http) {}

  loadCategory(email: string, sessionId: string) {

    if(this.categoryData) {
      return Promise.resolve(this.categoryData);
    }
    
    let body = JSON.stringify({
      'email': email,
      'sessionId': sessionId
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve, reject) => {
      this.http.post(this.getCategoryURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.categoryData = data;

        if(this.categoryData.result == "SUCCESS") {
          resolve(this.categoryData);
        } else {
          this.categoryData.message = [];
          reject(this.categoryData);
        }
        
      }, err => {
        reject("LOAD_CATEGORY_FAILED_TIMEOUT");
      });
    });
  }

  loadSubcategory(email: string, sessionId: string, categoryName: string) {

    if(this.subcategoryData) {
      return Promise.resolve(this.subcategoryData);
    }
    
    let body = JSON.stringify({
      'email': email,
      'sessionId': sessionId,
      'categoryName': categoryName
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve, reject) => {
      this.http.post(this.getSubcategoryURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.subcategoryData = data;

        if(this.subcategoryData.result == "SUCCESS") {
          resolve(this.subcategoryData);
        } else {
          this.subcategoryData.message = [];
          reject(this.subcategoryData);
        }

      }, err => {
        reject("LOAD_SUBCATEGORY_FAILED_TIMEOUT");
      });
    });
  }
}