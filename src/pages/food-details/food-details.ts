import { Component } from '@angular/core';
import { NavParams, IonicPage, NavController, Events } from 'ionic-angular';
import { FoodService } from "../../services/food/food.service";
import { Food } from "../../model/food";
import { MealService } from "../../services/meal/meal.service";

@IonicPage()
@Component({
  selector: 'page-food-details',
  templateUrl: 'food-details.html',
})
export class FoodDetailsPage {
  public item_id: string;
  public food: Food;

  constructor(
    public navParams: NavParams,
    public navCtlr: NavController,
    public foodService: FoodService,
    public mealService: MealService) {
      this.food = new Food('123', 'Empty');
  }

  ionViewWillEnter() {
    this.item_id = this.navParams.get('item_id');
    if (this.item_id) {
      this.getFoodInfo(this.item_id);
    }
  }

  getFoodInfo(id: string) {
    this.foodService.getFood(id).then(data => {
      this.food = new Food(data.item_id, data.item_name);
      this.food.calories = data.nf_calories;
      this.food.proteins = data.nf_protein;
      this.food.carbohydrates = data.nf_total_carbohydrate;
      this.food.total_fat = data.nf_total_fat;
      this.food.sodium = data.nf_sodium;
      this.food.portion = data.item_portion;
    }).catch( error => console.log(error) );
  }

  addFoodToMeal(){
    this.mealService.addFood(this.mealService.meal_id, this.food)
    this.navCtlr.pop();
  }

}
