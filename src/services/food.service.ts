import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http';
import { ApiConnectionData } from "./api.connection.data";

@Injectable()
export class FoodService {
  
  // Create ApiConnectionData with the API Connection info
  public appId = ApiConnectionData.APP_ID;
  public appKey = ApiConnectionData.APP_KEY;
  public apiUrl = ApiConnectionData.API_URL;

  constructor(public http: HTTP) { }

  getFood(value): Promise<string[]>{
    let items = [];
    const api_method = 'search/';
    const query = this.apiUrl + api_method + value;
    
    const parameters = {
      appId: this.appId,
      appKey: this.appKey
    };

    if (value && value.trim() != '') {
      this.http.get(query, parameters ,{})
                .then(data => {
                  const hits = JSON.parse(data.data).hits;
                  hits.forEach(element => {
                    items.push(element.fields.item_name);
                  });
                })
                .catch(error => console.log(error));
    }

    return Promise.resolve(items);
  }

}
