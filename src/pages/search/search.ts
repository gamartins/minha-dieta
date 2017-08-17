import { Component } from '@angular/core';

import { FoodService } from "../../services/food.service";
import { NavController, IonicPage } from "ionic-angular";
import { FoodDetailsPage } from "../food-details/food-details";

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  public items = [];
  
  constructor(private foodService: FoodService, private navCtrl: NavController) {}

  getItens(event: any){
    this.foodService.searchFood(event.target.value)
          .then(data => this.items = data )
          .catch(error => console.log(error));
  }

  getFoodDetail(id: string){
    this.navCtrl.push('FoodDetailsPage', { item_id: id});
  }

}
