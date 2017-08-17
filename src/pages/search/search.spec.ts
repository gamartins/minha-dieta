import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IonicModule, Platform, NavController} from 'ionic-angular/index';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlatformMock, StatusBarMock, SplashScreenMock } from '../../../test-config/mocks-ionic';

import { SearchPage } from './search';
import { FoodService } from "../../services/food.service";
import { FoodDetailsPage } from "../food-details/food-details";

describe('SearchPage', () => {
  let de: DebugElement;
  let comp: SearchPage;
  let htmlElement: HTMLElement;
  let fixture: ComponentFixture<SearchPage>;
  let navCtrl: NavController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPage],
      imports: [
        IonicModule.forRoot(SearchPage)
      ],
      providers: [
        { provide: NavController, useClass: NavControllerStub },
        { provide: FoodService, useClass: FoodServiceMock },
        { provide: Platform, useClass: PlatformMock},
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
      ]
    });

    fixture = TestBed.createComponent(SearchPage);
    comp = fixture.componentInstance;
    navCtrl = fixture.debugElement.injector.get(NavController);
  });
  
  it('should create component', () => {
    expect(comp).toBeDefined(); 
  });

  it('should show a searchbar to find foods', () => {
    de = fixture.debugElement.query(By.css('ion-searchbar'));
    htmlElement = de.nativeElement;
    expect(htmlElement).toBeDefined();
  });

  it('should show a list of foods when user enters a value', async(()=> {
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
  }));

  it('should each item have a name and id', async(() => {
    const food_id = '513fceb475b8dbbc21000fd3';
    comp.getItens({ target: { value: 'Banana'} });
    fixture.whenStable().then(() => {
      expect(comp.items[0].item_id).toEqual(food_id);
    });
  }));

  it('should open the page FoodDetails of the especific food', async(() => {
    comp.getItens({ target: { value: 'Banana'} });

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('ion-list button'));
      htmlElement = de.nativeElement;

      // Click to open FoodDetail
      spyOn(navCtrl, 'push');
      htmlElement.click();
      expect(navCtrl.push).toHaveBeenCalledWith(FoodDetailsPage, { item_id: '513fceb475b8dbbc21000fd3'});
    });
  }));

});

export class FoodServiceMock {
  searchFood(value: string): Promise<any> {
    let data = [ {
      item_id: '513fceb475b8dbbc21000fd3',
      item_name: 'Bananas raw - 1 small (6" to 6-7/8" long)'
    },{
      item_id: '513fceb475b8dbbc21000fd4',
      item_name: 'Bananas raw - 1 medium (7" to 7-7/8" long)' 
    },{
      item_id: '513fceb475b8dbbc21000fd5',
      item_name: 'Bananas raw - 1 extra small (less than 6" long)'
    }];
    
    return Promise.resolve(data);
  }
}

export class NavControllerStub {
  push(){}
}