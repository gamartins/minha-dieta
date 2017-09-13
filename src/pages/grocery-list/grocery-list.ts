import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MealService } from "../../services/meal/meal.service";
import { Food } from "../../model/food";

@IonicPage()
@Component({
  selector: 'page-grocery-list',
  templateUrl: 'grocery-list.html',
})
export class GroceryListPage {
  public foodList: Array<Food> = []

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mealServices: MealService) {
  }

  ionViewWillEnter() {
    this.populateFoodList()
  }

  populateFoodList(): Promise<any> {
    this.foodList = []
    return this.mealServices.getMealList().then(mealList => {
      mealList.forEach(meal => {
        meal.foodList.forEach(food => !this.isOnFoodlist(food) ? this.foodList.push(food) : '' )
      })
    })
  }

  isOnFoodlist(food: Food): boolean {
    let isInList = false
    this.foodList.forEach(foodInList => 
      food.id == foodInList.id ? isInList = true : '' )

    return isInList
  }

}
