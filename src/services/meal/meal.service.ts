import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Food } from "../../model/food";
import { Meal } from "../../model/meal";

@Injectable()
export class MealService {
    meal_id = null;
    
    constructor(public storage: Storage) {
    }

    public getMealList(): Promise<Meal[]> {
        return this.storage.keys().then(val => {
            if (val.length > 0){
                return this.populateMeals(val)
            } else {
                return Promise.resolve(this.generateRandomMeals())
            }
        }).catch(error => {
            console.log(error)
            return Promise.reject(null)
        })
    }

    private generateRandomMeals(): Meal[] {
        let mealNames = [   'Café da Manhã', 'Lanche', 'Almoço', 
                            'Lanche da Tarde', 'Janta', 'Ceia']
        let randomMeals: Array<Meal> = []

        for (var index = 0; index < 6; index++) {
            const random_key = Math.random().toString(36).substring(2, 15)
            const new_meal = new Meal(random_key,  mealNames[index], [])
            randomMeals.push(new_meal)
            this.saveInStorage(new_meal)
        }
        
        return randomMeals
    }

    private populateMeals(val: any): Promise<Meal[]> {
        let populatedMeals: Array<Meal> = []

        return this.storage.forEach(val => {
            const item = JSON.parse(val)
            const meal = new Meal(item.id, item.name, []) 
            if(item.foodList.length > 0 ) {
                item.foodList.forEach(food => {
                meal.foodList.push(new Food(food.id, food.name))
                });
            }
            populatedMeals.push(meal)
        }).then(() => { return Promise.resolve(this.orderMeal(populatedMeals)) })
    }

    private orderMeal(mealList: Meal[]) {
        const tempMealList = []
        mealList.forEach(meal => {
            switch (meal.name) {
                case 'Café da Manhã': tempMealList[0] = meal; break;
                case 'Lanche': tempMealList[1] = meal; break;
                case 'Almoço': tempMealList[2] = meal; break;
                case 'Lanche da Tarde': tempMealList[3] = meal; break;
                case 'Janta': tempMealList[4] = meal; break;
                case 'Ceia': tempMealList[5] = meal; break;
            }
        });

        return tempMealList;
    }

    private saveInStorage(meal: Meal) {
        this.storage.set(meal.id, JSON.stringify(meal))
    }

    public getMeal(mealId: string): Promise<Meal> {
        return this.storage.get(mealId).then(val => {
            const item = JSON.parse(val)
            const meal: Meal = new Meal(item.id, item.name, [])
            item.foodList.forEach(food => {
                meal.foodList.push(
                    new Food(food.id, food.name, food.calories,
                        food.proteins, food.carbohydrates, 
                        food.total_fat, food.sodium))
            });
            return meal
        })
    }

    public addFood(mealId: string, food: Food) {
        this.getMeal(mealId).then(meal => {
            meal.foodList.push(food)
            this.saveInStorage(meal)
        })
    }

    public removeFood(mealId: string, foodId: string): Promise<Meal> {
        let positionInArray = -1
        return this.getMeal(mealId).then(val => {
            const meal: Meal = val
            for (var index = 0; index < meal.foodList.length; index++) {
                var food = meal.foodList[index];
                if (food.id == foodId) {
                    positionInArray = index
                    break
                }
            }

            if (positionInArray != -1 ) {
                meal.foodList.splice(positionInArray, 1);
            }

            this.saveInStorage(meal)

            return meal
        })
    }

    public getMealIds(): Promise<string[]> {
        return this.storage.keys().then(val => {
            const mealIds: string[] = val
            return mealIds
        })
    }

}