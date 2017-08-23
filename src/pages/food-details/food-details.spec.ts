import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IonicModule, Platform } from 'ionic-angular/index';
import { NavParams } from "ionic-angular/navigation/nav-params";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlatformMock, 
         StatusBarMock, 
         SplashScreenMock, 
         NavParamsMock, 
         NavControllerMock } from '../../../test-config/mocks-ionic';

import { FoodDetailsPage } from './food-details';
import { FoodService } from "../../services/food.service";
import { Food } from "../../model/food";
import { MealService } from "../../services/meal/meal.service";
import { NavController } from "ionic-angular/navigation/nav-controller";

describe('FoodDetailsPage', () => {
  let de: DebugElement;
  let comp: FoodDetailsPage;
  let htmlElement: HTMLElement;
  let fixture: ComponentFixture<FoodDetailsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodDetailsPage],
      imports: [
        IonicModule.forRoot(FoodDetailsPage)
      ],
      providers: [
        { provide: MealService, useClass: MealServiceMock },
        { provide: NavParams, useFactory: () => NavParamsMock.instance()},
        { provide: NavController, useFactory: () => NavControllerMock.instance()},
        { provide: FoodService, useClass: FoodServiceMock },
        { provide: Platform, useClass: PlatformMock},
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
      ]
    });

    fixture = TestBed.createComponent(FoodDetailsPage);
    comp = fixture.componentInstance;
  });

  it('should create component', async(() => {
    fixture.whenStable().then(() => {
      expect(comp).toBeDefined(); 
    })
  }));

  it('should get the food information', async(() => {
    const food = new Food('513fceb475b8dbbc21000fd3',
                          'Bananas, raw',
                          105.02, 1.29, 26.95, 0.39, 1.18,
                          '1 small (6" to 6-7/8" long)');
    comp.getFoodInfo('513fceb475b8dbbc21000fd3');
    fixture.whenStable().then(() => {
      expect(comp.food).toEqual(food);
    })
  }));

  it('should show the food name on title', async(() => {
    const food_name = 'Bananas, raw';
    comp.getFoodInfo('513fceb475b8dbbc21000fd3');

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('ion-title'));
      htmlElement = de.nativeElement;
      
      expect(htmlElement.textContent).toBe(food_name);
    })
  }));

  it('should show food portion if exists', async(() => {
    const food_portion = '1 small (6" to 6-7/8" long)';
    comp.getFoodInfo('513fceb475b8dbbc21000fd3');

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('p'));
      htmlElement = de.nativeElement;
      
      expect(htmlElement.textContent).toBe("* Values for " + food_portion);
    })
  }));

  it('should not show food portion if dont exist', async(() => {
    const food_portion = '1 small (6" to 6-7/8" long)';
    comp.getFoodInfo('5969bdf9fc89eea71ace7a79');

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('p'))).toBeNull();
    });
  }));

  it('should show a table with nutritional information of the food', async(() => {
    let caloryHtmlElement, carboHtmlElement, proteinsHtmlElement: HTMLElement[];
    let totalFatHtmlElement, cholesterolHtmlElement, sodiumHtmlElement: HTMLElement[];

    comp.getFoodInfo('513fceb475b8dbbc21000fd3');

    function getElement(row: number): HTMLElement[] {
      let html_array = []
      for (var index = 1; index <= 2; index++) {
        let query = 'ion-list div:nth-child(' + row + ') h2:nth-child(' + index + ')';
        let de: DebugElement = fixture.debugElement.query(By.css(query));
        let html: HTMLElement = de.nativeElement;
        html_array.push(html);  
      }
      
      return html_array;
    }

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      
      caloryHtmlElement = getElement(1);
      proteinsHtmlElement = getElement(2);
      carboHtmlElement = getElement(3);
      totalFatHtmlElement = getElement(4);
      sodiumHtmlElement = getElement(5);;

      expect(caloryHtmlElement[0].textContent).toContain('Calories');
      expect(caloryHtmlElement[1].textContent).toContain(comp.food.calories);
      
      expect(proteinsHtmlElement[0].textContent).toContain('Proteins');
      expect(proteinsHtmlElement[1].textContent).toContain(comp.food.proteins.toString());
      
      expect(carboHtmlElement[0].textContent).toContain('Carbohydrates');
      expect(carboHtmlElement[1].textContent).toContain(comp.food.carbohydrates.toString());
      
      expect(totalFatHtmlElement[0].textContent).toContain('Total Fat');
      expect(totalFatHtmlElement[1].textContent).toContain(comp.food.total_fat.toString());
      
      expect(sodiumHtmlElement[0].textContent).toContain('Sodium');
      expect(sodiumHtmlElement[1].textContent).toContain(comp.food.sodium.toString());
    });
  }));

  it('should show a add FAButton', () => {
    htmlElement = fixture.debugElement.query(By.css('ion-fab button')).nativeElement;
    expect(htmlElement).toBeDefined();
  });

  it('should add food to the meal when click add button', () => {
    let spyHtml = spyOn(comp, 'addFoodToMeal').and.callThrough();
    let spyComp = spyOn(comp.mealService, 'addFood').and.callThrough();
    
    htmlElement = fixture.debugElement.query(By.css('ion-fab button')).nativeElement;
    htmlElement.click();

    expect(spyHtml).toHaveBeenCalled();
    expect(spyComp).toHaveBeenCalledWith(comp.food)
  })

});

export class FoodServiceMock {
  getFood(value: string): Promise<any> {
    let data;
    if (value == '513fceb475b8dbbc21000fd3') {
      data = {
        item_id: '513fceb475b8dbbc21000fd3',
        item_name: 'Bananas, raw',
        item_portion: '1 small (6" to 6-7/8" long)',
        nf_calories: 105.02,
        nf_total_fat: 0.39,
        nf_sodium: 1.18,
        nf_total_carbohydrate: 26.95,
        nf_protein: 1.29 };
      return Promise.resolve(data);
    }

    if (value == '5969bdf9fc89eea71ace7a79') {
      data = {
        item_id: '5969bdf9fc89eea71ace7a79',
        item_name: 'Organic Peanut Butter, Creamy Banan',
        item_portion: '',
        nf_calories: 180,
        nf_total_fat: 8,
        nf_sodium: 110,
        nf_total_carbohydrate: 25,
        nf_protein: 3 };
      return Promise.resolve(data);
    }

    return Promise.reject(data);
  }
}

export class MealServiceMock {
  addFood(food: Food) {}
}