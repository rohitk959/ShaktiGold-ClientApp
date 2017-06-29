import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as globals from "./../app/globals";

@Injectable()
export class ItemService {

  public itemListData: any;
  public itemDetailsData: any;
  public putItemToCartData: any;
  public getItemsFromCartData: any;
  public deleteItemFromCartData: any;
  public getEstimateData: any;
  public placeOrderData: any;
  
  host: string = globals.host;
  getAllItemsURL: string = this.host.concat( '/ShaktiGold/getAllItem.htm' );
  getItemDetailsURL: string = this.host.concat( '/ShaktiGold/getItemDetails.htm' );
  putItemToCartURL: string = this.host.concat( '/ShaktiGold/putItemToCart.htm' );
  getCartItemsURL: string = this.host.concat( '/ShaktiGold/getItemsFromCart.htm' );
  deleteItemFromCartURL: string = this.host.concat( '/ShaktiGold/deleteItemFromCart.htm' );
  getEstimateURL: string = this.host.concat( '/ShaktiGold/getEstimateDB.htm' );
  getAllUserOrderURL: string = this.host.concat( '/ShaktiGold/getAllUserOrder.htm' );
  placeOrderURL: string = this.host.concat( '/ShaktiGold/placeOrder.htm' );

  constructor(public http: Http) {}

  loadItemList(email: string, 
                sessionId: string, 
                categoryName: string, 
                subcategoryName: string,
                limit: string,
                offset: string) {

    let body = JSON.stringify({
      'email': email,
      'sessionId': sessionId,
      'categoryName': categoryName,
      'subcategoryName': subcategoryName,
      'limit': limit,
      'offset': offset
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve,reject) => {
      this.http.post(this.getAllItemsURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.itemListData = data;
        resolve(this.itemListData);
      }, err => {
        reject("LOAD_ITEM_LIST_FAILED_TIMEOUT");
      });
    });
  }

  loadItemDetails(email: string, 
                sessionId: string, 
                itemId: string) {
    
    let body = JSON.stringify({
      'email': email,
      'sessionId': sessionId,
      'itemId': itemId
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve,reject) => {
      this.http.post(this.getItemDetailsURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.itemDetailsData = data;
        resolve(this.itemDetailsData);
      }, err => {
        reject("LOAD_ITEM_DETAILS_FAILED_TIMEOUT");
      });
    });
  }

  addToCart(email: string, 
            sessionId: string, 
            itemId: string,
            quantity: string) {
    let body = JSON.stringify({
      'email': email,
      'sessionId': sessionId,
      'itemId': itemId,
      'quantity': quantity
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise( (resolve, reject) => {
      this.http.post(this.putItemToCartURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.putItemToCartData = data;
        if(this.putItemToCartData.result == "SUCCESS") {
          resolve(this.itemDetailsData);
        } else {
          reject(this.itemDetailsData);
        }
      }, err => {
        reject("ADD_TO_CART_FAILED_TIMEOUT");
      });
    });
  }

  getCart(email: string, 
            sessionId: string) {
              
    let body = JSON.stringify({
      'email': email,
      'sessionId': sessionId
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(this.getCartItemsURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.getItemsFromCartData = data;
        if(this.getItemsFromCartData.result == "SUCCESS") {
          resolve(this.getItemsFromCartData);
        } else {
          reject(this.getItemsFromCartData);
        }
        
      }, err => {
        reject("GET_CART_FAILED_TIMEOUT");
      });
    });
  }

  deleteItemFromCart(email: string, 
            sessionId: string, 
            itemId: string){
    let body = JSON.stringify({
      'email': email,
      'sessionId': sessionId,
      'itemId': itemId
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(this.deleteItemFromCartURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.deleteItemFromCartData = data;
        if(this.deleteItemFromCartData.result == "SUCCESS") {
          resolve(this.deleteItemFromCartData);
        } else {
          reject(this.deleteItemFromCartData);
        }
      }, err => {
        reject("DELETE_ITEM_FROM_CART_FAILED_TIMEOUT");
      });
    });
  }

  getEstimate(email: string, 
            sessionId: string, 
            itemId: string) {
    let body = JSON.stringify({
      'email': email,
      'sessionId': sessionId,
      'itemId': itemId
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(this.getEstimateURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.getEstimateData = data;
        if(this.getEstimateData.result == "SUCCESS") {
          resolve(this.getEstimateData);
        } else {
          reject(this.getEstimateData);
        }
      }, err => {
        reject("GET_ESTIMATE_FAILED_TIMEOUT");
      });
    });
  }

  loadOrders(email: string, 
            sessionId: string) {
    let body = JSON.stringify({
      'email': email,
      'sessionId': sessionId
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(this.getAllUserOrderURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.getEstimateData = data;
        if(this.getEstimateData.result == "SUCCESS") {
          resolve(this.getEstimateData);
        } else {
          reject(this.getEstimateData);
        }
      }, err => {
        reject("LOAD_ORDERS_FAILED_TIMEOUT");
      });
    });
  }

  placeOrder(email: string, 
            sessionId: string){
      let body = JSON.stringify({
      'email': email,
      'sessionId': sessionId
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(this.placeOrderURL, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.placeOrderData = data;
        if(this.placeOrderData.result == "SUCCESS") {
          resolve(this.placeOrderData);
        } else {
          reject(this.placeOrderData);
        }
      }, err => {
        reject("PLACE_ORDER_FAILED_TIMEOUT");
      });
    });
  }
}
