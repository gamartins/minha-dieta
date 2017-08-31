import { MealService } from './meal.service';
import { Food } from "../../model/food";
import { Storage } from '@ionic/storage';
import { TestBed } from "@angular/core/testing";
import { inject } from "@angular/core/testing";
import { Observable } from "rxjs/Observable";
import { Meal } from "../../model/meal";
import { async } from "@angular/core/testing";
import { fakeAsync } from "@angular/core/testing";
import { tick } from "@angular/core/testing";

describe('MealService', () => {
    let mealService: MealService
    let foodList: Array<Food>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                MealService,
                { provide: Storage, useClass: StorageMock }
            ]
        });
    }))

    beforeEach(inject([MealService], (service: MealService) => {
       mealService = service;
    }))

    it('Should return six empty meals if storage is clean', fakeAsync(() => {
        let listSize = 0;
        let emptyKeys: Array<string> = []
        let spy = spyOn(mealService.storage, 'keys').and.returnValue(Promise.resolve(emptyKeys))

        mealService.getMealList().then(val => {
            tick()
            
            listSize = val.length
            expect(spy).toHaveBeenCalled()
            expect(listSize).toBe(6)
        })
    }))

    it('Should return a meal with the id searched', () => {
        let mealList = [ new Meal('123456', [ new Food('1234', 'Milk'), new Food('5678', 'Meat') ]) ]
        mealService.getMeal('123456').then(val => {
            expect(mealList[0]).toEqual(val)
        })
    })

    it('Should add a food to the list', fakeAsync(() => {
        let length, new_length;
        mealService.getMeal('123456').then(meal => length = meal.foodList.length)
        mealService.addFood('123456', new Food('5678', 'Couscous'))
        tick()

        mealService.getMeal('123456').then(meal => {
            new_length = meal.foodList.length
            expect(new_length).toBe(length + 1)
        })
    }))

    it('Should remove a food from the list', fakeAsync(() => {
        let length, new_length;
        mealService.getMeal('123456').then(meal => length = meal.foodList.length)
        mealService.removeFood('123456', '5678')
        tick()

        mealService.getMeal('123456').then(meal => {
            new_length = meal.foodList.length
            expect(length - 1).toBe(new_length)
        })
    }))

    it('Should call Storage.set when add ou remove a food', fakeAsync(() => {
        let spy = spyOn(StorageMock.prototype, 'set')
        mealService.addFood('123456', new Food('5678', 'Couscous'))
        mealService.removeFood('123456','5678')
        tick()
        
        expect(spy).toHaveBeenCalledTimes(2)
    }))

});

class StorageMock {
    private mealList = '{"id":"123456","foodList":[{"id":"1234","name":"Milk"},{"id":"5678","name":"Meat"}]}'
    public get(key: string): Promise<any> { return Promise.resolve(this.mealList) }
    public keys(): Promise<string[]> { return Promise.resolve(['123456']) }
    public set(key: string, val: string): Promise<any> {
        this.mealList = val
        return Promise.resolve(this.mealList) 
    }
}