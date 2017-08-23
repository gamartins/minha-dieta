import { MealService } from './meal.service';
import { Food } from "../../model/food";

describe('MealService', () => {
    let service: MealService = new MealService()
    let foodList: Array<Food>

    beforeEach(() => {
        foodList = [new Food('1234', 'Milk'), new Food('5678', 'Meat')]
        service.foodList = foodList;
    });

    it('Should return a list of a food', () => {
        expect(service.getFood()).toEqual(foodList);
    })

    it('Should add a food to the list', () => {
        service.addFood(new Food('5678', 'Couscous'))
        expect(service.getFood().length).toBe(3)
    })

    it('Should remove a food from the list', () => {
        service.removeFood('1234')
        expect(service.getFood().length).toBe(1)
    })

});