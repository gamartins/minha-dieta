import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MealService } from "../../services/meal/meal.service";
import { Food } from '../../model/food';
@IonicPage()
@Component({
  selector: 'page-meal-list',
  templateUrl: 'meal-list.html',
})
export class MealListPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mealService: MealService) { }

  public pushSearchPage(){
    this.navCtrl.push('SearchPage')
  }

  public pushMealDetailsPage(){
    this.navCtrl.push('MealDetailsPage')
  }

  public getFoodInfo(): Array<Food> {
    return this.mealService.getFood()
  }

}
