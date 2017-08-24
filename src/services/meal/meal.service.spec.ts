import { MealService } from './meal.service';
import { Food } from "../../model/food";
import { Storage } from '@ionic/storage';
import { TestBed } from "@angular/core/testing";
import { inject } from "@angular/core/testing";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

describe('MealService', () => {
    let mealService: MealService
    let foodList: Array<Food>

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MealService,
                { provide: Storage, useClass: StorageMock }]
        });
    });

    beforeEach(inject([MealService], (service: MealService) => {
       mealService =  service;
       mealService.foodList = [new Food('1234', 'Milk'), new Food('5678', 'Meat')]
    }))

    it('Should return a list of a food', () => {
        expect(mealService.foodList).toEqual(mealService.getFood())
    })

    it('Should add a food to the list', () => {
        mealService.addFood(new Food('5678', 'Couscous'))
        expect(mealService.getFood().length).toBe(3)
    })

    it('Should remove a food from the list', () => {
        mealService.removeFood('1234')
        expect(mealService.getFood().length).toBe(1)
    })

    it('Should call Storage.set when add ou remove a food', () => {
        let spy = spyOn(StorageMock.prototype, 'set')
        mealService.addFood(new Food('5678', 'Couscous'))
        mealService.removeFood('5678')

        expect(spy).toHaveBeenCalledTimes(2)
    })

});

export class StorageMock {
    public get(key: string): Promise<any> { return Promise.resolve(null)}
    public set(key: string, val: string): Promise<any> { return Promise.resolve(null) }
}