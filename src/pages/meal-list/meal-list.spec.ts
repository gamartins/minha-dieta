import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { IonicModule, NavParams, Platform, NavController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";

import { NavParamsMock, PlatformMock, StatusBarMock, NavControllerMock } from "../../../test-config/mocks-ionic";

import { MealListPage } from "./meal-list";
import { By } from "@angular/platform-browser";
import { async } from "@angular/core/testing";
import { MealService } from "../../services/meal/meal.service";
import { Food } from "../../model/food";
import { Meal } from "../../model/meal";
import { fakeAsync } from "@angular/core/testing";
import { tick } from "@angular/core/testing";
import { NutrinfoCardComponent } from "../../components/nutrinfo-card/nutrinfo-card";

describe('MealListPage', () => {
  let comp: MealListPage;
  let htmlElement: HTMLElement;
  let fixture: ComponentFixture<MealListPage>;
  let navCtrl: NavController
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MealListPage,
        NutrinfoCardComponent,
      ],
      imports: [
        IonicModule.forRoot(MealListPage)
      ],
      providers: [
          { provide: NavController, useFactory: () => NavControllerMock.instance()},
          { provide: NavParams, useFactory: () => NavParamsMock.instance()},
          { provide: MealService, useClass: MealServiceMock},
          { provide: Platform, useClass: PlatformMock},
          { provide: StatusBar, useClass: StatusBarMock },
      ]
    });
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealListPage);
    comp = fixture.componentInstance;
    navCtrl = fixture.debugElement.injector.get(NavController);
  })

  it('should be created', () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  })

  it('should open SearchPage when click the add button', () => {
    comp.mealList.push(new Meal('123456', 'Almoço', []))
    fixture.detectChanges()

    htmlElement = fixture.debugElement.query(By.css('ion-card-content button')).nativeElement
    htmlElement.click()

    expect(htmlElement).toBeDefined()
    expect(navCtrl.push).toHaveBeenCalled()
  })

  it('should save the selected meal id in MealService when open SearchPage', () => {
    const spy = spyOn(comp, 'publishSelectedMeal')
    comp.mealList.push(new Meal('123456', 'Almoço', []))
    fixture.detectChanges()
    
    htmlElement = fixture.debugElement.query(By.css('ion-card-content button')).nativeElement
    htmlElement.click()

    expect(spy).toHaveBeenCalledWith('123456')
  })

  it('should open MealDetailsPage when click the meal name', () => {
    comp.mealList.push(new Meal('123456', 'Almoço', []))
    fixture.detectChanges()
    
    htmlElement = fixture.debugElement.query(By.css('.meal-info')).nativeElement
    htmlElement.click()

    expect(htmlElement).toBeDefined()
    expect(navCtrl.push).toHaveBeenCalledWith('MealDetailsPage', { meal_id: '123456'})
  })

  it('should save the selected meal id in MealService when open MealDetailsPage', () => {
    const spy = spyOn(comp, 'publishSelectedMeal')
    comp.mealList.push(new Meal('123456', 'Almoço', []))
    fixture.detectChanges()
    
    htmlElement = fixture.debugElement.query(By.css('.meal-info')).nativeElement
    htmlElement.click()

    expect(spy).toHaveBeenCalledWith('123456')
  })

  it('should show how many foods are in the meal', fakeAsync(() => {
    comp.mealList = [new Meal('123456', 'Almoço', [ new Food('123', 'Banana'), new Food('456', 'Milk')])]
    fixture.detectChanges()
    
    htmlElement = fixture.debugElement.query(By.css('ion-card-content')).nativeElement
    expect(htmlElement.textContent).toContain('2 alimentos')
  }))

  it('should show meals', fakeAsync(() => {
    let promise = Promise.resolve([
      new Meal('123456', 'Almoço', [ new Food('123', 'Banana'), new Food('456', 'Milk')]),
      new Meal('654321', 'Janta', [ new Food('123', 'Banana'), new Food('456', 'Milk')]),
    ])

    spyOn(comp.mealService, 'getMealList').and.returnValue(promise)
    comp.ionViewWillEnter()
    tick()
    fixture.detectChanges()

    let ionCardList = fixture.debugElement.queryAll(By.css('.meal'))
    expect(ionCardList.length).toBe(2)
  }))

  it('should show summary of nutritional information', fakeAsync(() => {
    comp.ionViewWillEnter()
    tick()
    fixture.detectChanges()

    htmlElement = fixture.debugElement.query(By.css('nutrinfo-card')).nativeElement

    expect(htmlElement).toBeTruthy()
    expect(comp.totalCalories).toBe(200)
    expect(comp.totalProtein).toBe(20)
    expect(comp.totalCarbo).toBe(40)
    expect(comp.totalFat).toBe(60)
  }))
});

class MealServiceMock {
  getMealIds(): Promise<string[]> { return Promise.resolve(['123456']) }
  getMeal(mealId: string): Promise<Meal> { 
    return Promise.resolve(
      new Meal('123456', 'Almoço', [ new Food('123', 'Banana'), new Food('456', 'Milk')])
    )
  }
  getMealList(): Promise<Meal[]> {
    return Promise.resolve(
      [ new Meal('123456', 'Almoço', [ 
        new Food('123', 'Banana', 100, 10, 20, 30),
        new Food('456', 'Milk', 100, 10, 20, 30)])
      ]
    )
  }
}