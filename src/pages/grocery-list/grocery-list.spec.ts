import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GroceryListPage } from './grocery-list'
import { DebugElement } from "@angular/core";
import { MealService } from "../../services/meal/meal.service";
import { IonicModule, NavParams, NavController, Platform } from "ionic-angular";
import { PlatformMock,
         StatusBarMock, 
         SplashScreenMock, 
         NavParamsMock, 
         NavControllerMock } from "../../../test-config/mocks-ionic";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Meal } from "../../model/meal";
import { Food } from "../../model/food";
import { fakeAsync, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

describe('GroceryListPage', () => {
    let de: DebugElement;
    let comp: GroceryListPage;
    let htmlElement: HTMLElement;
    let fixture: ComponentFixture<GroceryListPage>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [GroceryListPage],
        imports: [
          IonicModule.forRoot(GroceryListPage)
        ],
        providers: [
          { provide: MealService, useClass: MealServiceMock },
          { provide: NavParams, useFactory: () => NavParamsMock.instance()},
          { provide: NavController, useFactory: () => NavControllerMock.instance()},
          { provide: Platform, useClass: PlatformMock},
          { provide: StatusBar, useClass: StatusBarMock },
          { provide: SplashScreen, useClass: SplashScreenMock },
        ]
      });
  
      fixture = TestBed.createComponent(GroceryListPage);
      comp = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(comp).toBeDefined()
    })

    it('should get a list of food', fakeAsync(() => {
        comp.populateFoodList()
        tick()
        expect(comp.foodList).toEqual([ new Food('1', 'Apple'), new Food('2', 'Banana')])
    }))

    it('should store only unique itens', async(() => {
        let mealList = [ new Meal('1', 'Namez', [
                new Food('1', 'Apple'),
                new Food('2', 'Banana'),
                new Food('2', 'Banana') ])]
        spyOn(comp.mealServices, 'getMealList').and.returnValue(Promise.resolve(mealList))

        comp.populateFoodList()
        fixture.whenStable().then(() => {
            console.log(comp.foodList)
            expect(comp.foodList).toEqual([ new Food('1', 'Apple'), new Food('2', 'Banana') ])
        })
        
    }))

    it('should show a list of food', () => {
        comp.foodList = [ new Food('1', 'Apple'), new Food('2', 'Banana') ]
        fixture.detectChanges()

        htmlElement = fixture.debugElement.query(By.css('ion-item')).nativeElement
        expect(htmlElement.textContent).toContain('Apple')
    })
});

class MealServiceMock {
    stubMealList = [
        new Meal('1', 'Name', [ new Food('1', 'Apple'), new Food('2', 'Banana')]),
    ]

    getMealList(): Promise<Meal[]> {
        return Promise.resolve(this.stubMealList)
    }
}