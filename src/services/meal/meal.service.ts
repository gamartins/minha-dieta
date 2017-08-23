import { Injectable } from '@angular/core';
import { Food } from "../../model/food";

@Injectable()
export class MealService {
    foodList: Array<Food>;
    
    constructor() {
        this.foodList = [];
    }

    public getFood(): Array<Food> {
        return this.foodList;
    }

    public addFood(food: Food) {
        return this.foodList.push(food);
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
    }

}