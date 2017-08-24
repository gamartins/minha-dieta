import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http';
import { ApiConnectionData } from "../api.connection.data";
import { StringFormaterService } from "../string/string.formater.service";

@Injectable()
export class FoodService {
  
  // Create ApiConnectionData with the API Connection info
  private appId;
  private appKey;
  private apiUrl;
  private parameters;

  constructor(public http: HTTP, public sfService: StringFormaterService) { 
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
                        let fullNameArray = this.sfService.createNameAndDescription(element.fields.item_name);
                        items.push({
                          item_name: fullNameArray.name,
                          item_portion: fullNameArray.portion,
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
                    let food = JSON.parse(response.data);
                    let fullName:string = food.item_name;
                    let name = this.sfService.createNameAndDescription(fullName).name;
                    let portion = this.sfService.createNameAndDescription(fullName).portion;
                    food.item_name = name;
                    food.item_portion = portion;

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