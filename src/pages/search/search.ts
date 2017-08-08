import { Component } from '@angular/core';

import { FoodService } from "../../services/food.service";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  private items = [];
  
  constructor(private foodService: FoodService) {}

  getItens(event: any){
    this.foodService.getFood(event.target.value).then(data => this.items = data);
  }

}
