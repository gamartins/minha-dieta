import { Food } from "./food";

export class Meal {
    static NutrientList = {
        Calories: 'calories',
        Proteins: 'proteins',
        Carbo: 'carbo',
        TotalFat: 'total_fat',
        Sodium: 'sodium'
    }

    constructor(public id: string,
                public name: string,
                public foodList: Array<Food>) {
    }

    getTotalCalories(): number {
        let totalCalories = null

        this.foodList.forEach(food => {
            totalCalories += food.calories
        });

        return totalCalories
    }

    getTotalNutrients(nutrient_name: string = 'calories'): number {
        let nutrient = 0

        switch (nutrient_name) {
            case 'calories':
                this.foodList.forEach(food => { nutrient += food.calories })
                break;
            case 'proteins':
                this.foodList.forEach(food => { nutrient += food.proteins })
                break;
            case 'carbo':
                this.foodList.forEach(food => { nutrient += food.carbohydrates })
                break;
            case 'total_fat':
                this.foodList.forEach(food => { nutrient += food.total_fat })
                break;
            case 'sodium':
                this.foodList.forEach(food => { nutrient += food.sodium })
                break;
            default:
                break;
        }

        return this.round(nutrient)
    }

    round(value: number): number {
        return Math.round(value * 10) / 10
    }
}