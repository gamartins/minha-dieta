import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http';
import { ApiConnectionData } from "./api.connection.data";

@Injectable()
export class FoodService {
  
  // Create ApiConnectionData with the API Connection info
  private appId;
  private appKey;
  private apiUrl;
  private parameters;

  constructor(public http: HTTP) { 
    this.appId = ApiConnectionData.APP_ID;
    this.appKey = ApiConnectionData.APP_KEY;
    this.apiUrl = ApiConnectionData.API_URL;
    this.parameters = { appId: this.appId, appKey: this.appKey };
  }

  searchFood(value): Promise<Object[]>{
    const api_method = 'search/';
    const query = this.apiUrl + api_method + value;

    if (value && value.trim() != '') {
      return this.http.get(query, this.parameters ,{})
                    .then(data => {
                      let items = [];
                      const hits = JSON.parse(data.data).hits;
                      hits.forEach(element => {
                        items.push({
                          item_name: element.fields.item_name,
                          item_id: element.fields.item_id });
                      });
                      return Promise.resolve(items);
                      })
                    .catch(error => {
                      return Promise.reject(error);
                    });
    } else {
      return Promise.reject('Empty or invalid value.');
    }
  }

  getFood(id: string): Promise<any> {
    const api_method = 'item';
    const url = this.apiUrl + api_method;
    
    let query_params = this.parameters;
    query_params["id"] = id;

    if (id && id.trim() != '') {
      return this.http.get(url, this.parameters, {})
                  .then(response => {
                    const food = JSON.parse(response.data);
                    return Promise.resolve(food);
                  })
                  .catch(error => { 
                    return Promise.reject(error);
                  });
    } else {
      return Promise.reject('Empty or invalid id.');
    }
  }

}