import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IonicModule, Platform } from 'ionic-angular/index';
import { NavParams } from "ionic-angular/navigation/nav-params";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlatformMock, StatusBarMock, SplashScreenMock, NavParamsMock } from '../../../test-config/mocks-ionic';

import { FoodDetailsPage } from './food-details';
import { FoodService } from "../../services/food.service";
import { Food } from "../../model/food";

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
        { provide: NavParams, useFactory: () => NavParamsMock.instance()},
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
                          'Bananas raw - 1 small (6" to 6-7/8" long)',
                          105.02, 1.29, 26.95, 0.39, 1.18);
    comp.getFoodInfo('513fceb475b8dbbc21000fd3');
    fixture.whenStable().then(() => {
      expect(comp.food).toEqual(food);
    })
  }));

  it('should show the food name on title', async(() => {
    const food_name = 'Bananas raw - 1 small (6" to 6-7/8" long)';
    comp.getFoodInfo('123');

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('ion-title'));
      htmlElement = de.nativeElement;
      
      expect(htmlElement.textContent).toEqual(food_name);
    })
  }));

  it('should show a table with nutritional information of the food', async(() => {
    let caloryHtmlElement, carboHtmlElement, proteinsHtmlElement: HTMLElement;
    let totalFatHtmlElement, cholesterolHtmlElement, sodiumHtmlElement: HTMLElement;

    comp.getFoodInfo('513fceb475b8dbbc21000fd3');

    function getElement(row: number): HTMLElement {
      let query = 'ion-grid ion-row:nth-child(' + row + ')';
      let de: DebugElement = fixture.debugElement.query(By.css(query));
      let html: HTMLElement = de.nativeElement;
      return html;
    }

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      
      caloryHtmlElement = getElement(1);
      proteinsHtmlElement = getElement(2);
      carboHtmlElement = getElement(3);
      totalFatHtmlElement = getElement(4);
      sodiumHtmlElement = getElement(5);;

      expect(caloryHtmlElement.children[0].textContent).toContain('Calories');
      expect(caloryHtmlElement.children[1].textContent).toContain(comp.food.calories);
      
      expect(proteinsHtmlElement.children[0].textContent).toContain('Proteins');
      expect(proteinsHtmlElement.children[1].textContent).toContain(comp.food.proteins.toString());
      
      expect(carboHtmlElement.children[0].textContent).toContain('Carbohydrates');
      expect(carboHtmlElement.children[1].textContent).toContain(comp.food.carbohydrates.toString());
      
      expect(totalFatHtmlElement.children[0].textContent).toContain('Total Fat');
      expect(totalFatHtmlElement.children[1].textContent).toContain(comp.food.total_fat.toString());
      
      expect(sodiumHtmlElement.children[0].textContent).toContain('Sodium');
      expect(sodiumHtmlElement.children[1].textContent).toContain(comp.food.sodium.toString());
    });
  }));

});

export class FoodServiceMock {
  getFood(value: string): Promise<any> {
    let data = {
      item_id: '513fceb475b8dbbc21000fd3',
      item_name: 'Bananas raw - 1 small (6" to 6-7/8" long)',
      nf_calories: 105.02,
      nf_total_fat: 0.39,
      nf_sodium: 1.18,
      nf_total_carbohydrate: 26.95,
      nf_protein: 1.29      
    };
    
    return Promise.resolve(data);
  }
}