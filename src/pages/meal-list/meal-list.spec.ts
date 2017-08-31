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

describe('MealListPage', () => {
  let comp: MealListPage;
  let htmlElement: HTMLElement;
  let fixture: ComponentFixture<MealListPage>;
  let navCtrl: NavController
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MealListPage],
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
    comp.mealList.push(new Meal('123456', []))
    fixture.detectChanges()

    htmlElement = fixture.debugElement.query(By.css('ion-card-content button')).nativeElement
    htmlElement.click()

    expect(htmlElement).toBeDefined()
    expect(navCtrl.push).toHaveBeenCalled()
  })

  it('should open MealDetailsPage when click the meal name', () => {
    comp.mealList.push(new Meal('123456', []))
    fixture.detectChanges()
    
    htmlElement = fixture.debugElement.query(By.css('ion-card-header')).nativeElement
    htmlElement.click()

    expect(htmlElement).toBeDefined()
    expect(navCtrl.push).toHaveBeenCalled()
  })

  it('should show how many foods are in the meal', fakeAsync(() => {
    comp.mealList = [new Meal('123456', [ new Food('123', 'Banana'), new Food('456', 'Milk')])]
    fixture.detectChanges()
    
    htmlElement = fixture.debugElement.query(By.css('ion-card-content')).nativeElement
    expect(htmlElement.textContent).toContain('2 alimentos')
  }))
});

class MealServiceMock {
  getMealIds(): Promise<string[]> { return Promise.resolve(['123456']) }
  getMeal(mealId: string): Promise<Meal> { 
    return Promise.resolve(
      new Meal('123456', [ new Food('123', 'Banana'), new Food('456', 'Milk')])
    )
  }
  getMealList(): Promise<Meal[]> {
    return Promise.resolve(
      [ new Meal('123456', [ new Food('123', 'Banana'), new Food('456', 'Milk')])]
    )
  }
}