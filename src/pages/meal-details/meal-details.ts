import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Food } from "../../model/food";
import { MealService } from "../../services/meal/meal.service";
import { Meal } from "../../model/meal";

@IonicPage()
@Component({
  selector: 'page-meal-details',
  templateUrl: 'meal-details.html',
})
export class MealDetailsPage {
  meal: Meal;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public mealService: MealService) {  }

  ionViewWillEnter(){
    let mealId = this.mealService.getMealIds().then(ids => {
      this.mealService.getMeal(mealId[0]).then(meal => {
        this.meal = meal
      })
    })
  }

  removeFood(food: Food) {
    this.mealService.removeFood(this.meal.id, food.id)
  }

  getTotalCalories(){
    let totalCalories: number = 0;
    this.meal.foodList.forEach(food => {
      totalCalories += food.calories;
    });

    return this.round(totalCalories);
  }

  getTotalCarbo(){
    let totalCarbo: number = 0;
    this.meal.foodList.forEach(food => {
      totalCarbo += food.carbohydrates;
    });

    return this.round(totalCarbo);
  }

  getTotalProteins(){
    let totalProteins: number = 0;
    this.meal.foodList.forEach(food => {
      totalProteins += food.proteins;
    });

    return this.round(totalProteins);
  }

  getTotalFat() {
    let totalFat: number = 0;
    if(this.meal.foodList.length != 0) {
      this.meal.foodList.forEach(food => {
        totalFat += food.total_fat;
      });
    }

    return this.round(totalFat);
  }

  round(value: number) {
    return Math.round(value * 10) / 10
  }

}
