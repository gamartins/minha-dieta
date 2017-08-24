import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Food } from "../../model/food";

@Injectable()
export class MealService {
    foodList: Array<Food> = [];
    
    constructor(private storage: Storage) {
        this.storage.get('meal').then(val => {
            if (val != null ) {
                let list = JSON.parse(val)
                list.forEach(item => {
                    let food = new Food(item.val, item.name, item.calories, 
                        item.proteins, item.carbohydrates, item.total_fat, item.sodium, item.portion);
                    this.foodList.push(food)
                });
            }
        }).catch(error => console.log(error))
    }

    private saveInStorage() {
        this.storage.set('meal', JSON.stringify(this.foodList))
    }

    public getFood(): Array<Food> {
        return this.foodList;
    }

    public addFood(food: Food) {
        this.foodList.push(food);
        this.saveInStorage()
        return this.foodList.length
    }

    public removeFood(foodId: string) {
        let positionInArray = -1
        for (var index = 0; index < this.foodList.length; index++) {
            var food = this.foodList[index];
            if (food.id == foodId) {
                positionInArray = index
                break
            }
        }

        if (positionInArray != -1 ) {
            this.foodList.splice(positionInArray, 1);
        }

        this.saveInStorage()
    }

}