import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
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
  totalCalories: number = 0
  totalCarbo: number = 0
  totalProtein: number = 0
  totalFat: number = 0

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public mealService: MealService) { }
  
  ionViewWillEnter() {
    this.mealService.getMealList().then(val => {
      this.mealList = val
      this.updateNutrientValues()
    })
  }

  private updateNutrientValues() {
    this.mealList.forEach(meal => {
      this.totalCalories += meal.getTotalCalories()
      this.totalCarbo += meal.getTotalNutrients(Meal.NutrientList.Carbo)
      this.totalProtein += meal.getTotalNutrients(Meal.NutrientList.Proteins)
      this.totalFat += meal.getTotalNutrients(Meal.NutrientList.TotalFat)
    });
  }

  public pushSearchPage(meal_id: number){
    this.publishSelectedMeal(meal_id)
    this.navCtrl.push('SearchPage')
  }

  public pushMealDetailsPage(mealId: number){
    this.publishSelectedMeal(mealId)
    this.navCtrl.push('MealDetailsPage', { meal_id: mealId })
  }

  public getAmountFood(id: string): number {
    let amount = 0
    this.mealList.forEach(meal => {
      if(meal.id == id) { 
        amount = meal.foodList.length
      }
    });
    
    return amount
  }

  public publishSelectedMeal(meal_id: number) {
    this.mealService.meal_id = meal_id
  }

}
