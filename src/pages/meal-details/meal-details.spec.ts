import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { IonicModule, NavParams, Platform, NavController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";

import { NavParamsMock, PlatformMock, StatusBarMock, NavControllerMock } from "../../../test-config/mocks-ionic";

import { MealDetailsPage } from "./meal-details";
import { By } from "@angular/platform-browser";
import { Food } from "../../model/food";
import { async } from "@angular/core/testing";
import { MealService } from "../../services/meal/meal.service";

describe('MealDetailsPage', () => {
    let de: DebugElement;
    let comp: MealDetailsPage;
    let htmlElement: HTMLElement;
    let fixture: ComponentFixture<MealDetailsPage>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MealDetailsPage],
        imports: [
          IonicModule.forRoot(MealDetailsPage)
        ],
        providers: [    
            { provide: NavController, useFactory: () => NavControllerMock.instance()},
            { provide: NavParams, useFactory: () => NavParamsMock.instance()},
            { provide: Platform, useClass: PlatformMock},
            { provide: StatusBar, useClass: StatusBarMock },
            MealService
        ]
      });
  
      fixture = TestBed.createComponent(MealDetailsPage);
      comp = fixture.componentInstance;
    });

    it('Should show a FABButton on the screen', () => {
        htmlElement = fixture.debugElement.query(By.css('ion-fab button')).nativeElement;
        expect(htmlElement).toBeDefined();
    })

    it('Should open SearchFoodPage when click the FabButton', () => {
        let navCtrl: NavController = fixture.debugElement.injector.get(NavController);
        htmlElement = fixture.debugElement.query(By.css('ion-fab button')).nativeElement;
        htmlElement.click();

        expect(navCtrl.push).toHaveBeenCalledWith('SearchPage');
    });

    it('Should show a list of foods and his calories', async(() => {
        comp.mealService.addFood(new Food('1234', 'Milk', 42));
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            function getElement(row: number): HTMLElement[] {
                let html_array = []
                
                for (var index = 1; index <= 2; index++) {
                    let query = 'ion-list ion-item:nth-child(' + row + ') h2:nth-child(' + index + ')';
                    let de: DebugElement = fixture.debugElement.query(By.css(query));
                    let html: HTMLElement = de.nativeElement;
                    html_array.push(html);  
                }
                
                return html_array;
            }

            let milkHtmlElement:HTMLElement[] = getElement(1);
            expect(milkHtmlElement[0].textContent).toContain('Milk');
            expect(milkHtmlElement[1].textContent).toContain('42 kcal');
        })
    }))

    it('Should remove a food when clicked in the trash', () => {
        comp.mealService.addFood(new Food('1234', 'Milk', 42)),
        comp.mealService.addFood(new Food('5678', 'Couscous', 112))
        comp.mealService.addFood(new Food('9012', 'Boiled Egg', 155))
        comp.mealService.addFood(new Food('3456', 'Banana', 89))

        let expected = [
            new Food('5678', 'Couscous', 112),
            new Food('9012', 'Boiled Egg', 155),
            new Food('3456', 'Banana', 89)
        ];
        
        fixture.detectChanges();
        let spy = spyOn(comp.mealService, 'removeFood').and.callThrough();
        htmlElement = fixture.debugElement.query(By.css('ion-list ion-item:nth-child(1) a')).nativeElement;
        htmlElement.click();

        expect(spy).toHaveBeenCalledWith('1234')
        expect(comp.meal).toEqual(expected);
    });

    it('Should show the total amount of calories', () => {
        comp.meal = [
            new Food('1234', 'Milk', 42),
            new Food('5678', 'Couscous', 112),
            new Food('9012', 'Boiled Egg', 155),
            new Food('3456', 'Banana', 89)
        ];
        fixture.detectChanges();

        htmlElement = fixture.debugElement.query(By.css('ion-card-header')).nativeElement;

        expect(htmlElement.textContent).toContain('398 KCal');
    });

    it('Should show the total amount of carbohydrates', () => {
        comp.meal = [
            new Food('1234', 'Milk', 42, 3.4, 5, 1),
            new Food('5678', 'Couscous', 112, 3.8, 23, 0.2),
            new Food('9012', 'Boiled Egg', 155, 13, 1.1, 11),
            new Food('3456', 'Banana', 89, 1.1, 23, 0.3)
        ];
        fixture.detectChanges();

        htmlElement = fixture.debugElement.query(By.css('ion-col:nth-child(1)')).nativeElement;
        expect(htmlElement.textContent.trim()).toContain('Carbo52.1g');
    });

    it('Should show the total amount of proteins', () => {
        comp.meal = [
            new Food('1234', 'Milk', 42, 3.4, 5, 1),
            new Food('5678', 'Couscous', 112, 3.8, 23, 0.2),
            new Food('9012', 'Boiled Egg', 155, 13, 1.1, 11),
            new Food('3456', 'Banana', 89, 1.1, 23, 0.3)
        ];
        fixture.detectChanges();

        htmlElement = fixture.debugElement.query(By.css('ion-col:nth-child(2)')).nativeElement;
        expect(htmlElement.textContent.trim()).toContain('Proteins21.3g');
    });

    it('Should show the total amount of fat', () => {
        comp.meal = [
            new Food('1234', 'Milk', 42, 3.4, 5, 1),
            new Food('5678', 'Couscous', 112, 3.8, 23, 0.2),
            new Food('9012', 'Boiled Egg', 155, 13, 1.1, 11),
            new Food('3456', 'Banana', 89, 1.1, 23, 0.3)
        ];
        fixture.detectChanges();
        
        htmlElement = fixture.debugElement.query(By.css('ion-col:nth-child(3)')).nativeElement;
        expect(htmlElement.textContent.trim()).toContain('Fat12.5g');
    });
});