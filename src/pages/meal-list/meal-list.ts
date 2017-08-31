import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MealService } from "../../services/meal/meal.service";
import { Food } from '../../model/food';
import { Meal } from "../../model/meal";
@IonicPage()
@Component({
  selector: 'page-meal-list',
  templateUrl: 'meal-list.html',
})
export class MealListPage {
  mealList: Array<Meal> = []

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public mealService: MealService) { }

  ionViewWillEnter() {
    this.mealService.getMealList().then(val => this.mealList = val)
  }

  public pushSearchPage(){
    this.navCtrl.push('SearchPage')
  }

  public pushMealDetailsPage(){
    this.navCtrl.push('MealDetailsPage')
  }

  public getAmountFood(index: number): number {
    return this.mealList[index].foodList.length
  }

}
