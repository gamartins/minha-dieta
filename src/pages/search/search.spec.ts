import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IonicModule, Platform, NavController} from 'ionic-angular/index';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlatformMock, StatusBarMock, SplashScreenMock } from '../../../test-config/mocks-ionic';

import { SearchPage } from './search';
import { FoodService } from "../../services/food.service";
import { fakeAsync } from "@angular/core/testing";
import { tick } from "@angular/core/testing";

describe('SearchPage', () => {
  let de: DebugElement;
  let comp: SearchPage;
  let htmlElement: HTMLElement;
  let fixture: ComponentFixture<SearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPage],
      imports: [
        IonicModule.forRoot(SearchPage)
      ],
      providers: [
        NavController,
        { provide: FoodService, useClass: FoodServiceMock },
        { provide: Platform, useClass: PlatformMock},
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
      ]
    });

    fixture = TestBed.createComponent(SearchPage);
    comp = fixture.componentInstance;
  }));

  it('should create component', () => {
    expect(comp).toBeDefined(); 
  });

  it('should show a searchbar to find foods', () => {
    de = fixture.debugElement.query(By.css('ion-searchbar'));
    htmlElement = de.nativeElement;
    expect(htmlElement).toBeDefined();
  });

  it('should show a list of foods when user enters a value', ()=> {
    comp.getItens({ target: { value: 'Banana'} });

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('ion-list'));    
      htmlElement = de.nativeElement;

      // Check if the element is defined
      expect(htmlElement).toBeDefined();

      // Check if the number of list itens is correct
      expect(htmlElement.childElementCount).toEqual(3);

      // Check if the element shows a list of itens
      expect(htmlElement.children[0].textContent).toContain('Bananas raw - 1 small (6" to 6-7/8" long)');
      expect(htmlElement.children[1].textContent).toContain('Bananas raw - 1 medium (7" to 7-7/8" long)');
      expect(htmlElement.children[2].textContent).toContain('Bananas raw - 1 extra small (less than 6" long)');
    });  
  });

});

export class FoodServiceMock {
  getFood(value: string){
    let data = []
    data.push(
      'Bananas raw - 1 small (6" to 6-7/8" long)',
      'Bananas raw - 1 medium (7" to 7-7/8" long)',
      'Bananas raw - 1 extra small (less than 6" long)');

    return Promise.resolve(data);
  }
}