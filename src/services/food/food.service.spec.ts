import { TestBed, fakeAsync, tick } from "@angular/core/testing";

import { HTTP } from "@ionic-native/http";
import { HTTPMock, StatusBarMock, SplashScreenMock, PlatformMock } from "../../../test-config/mocks-ionic";

import { MyApp } from "../../app/app.component";
import { IonicModule, Platform } from "ionic-angular";
import { FoodService } from "./food.service";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StringFormaterService } from "../string/string.formater.service";

describe('Food Service', () => {
    let fixture;
    let component;      
    let foodService : FoodService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp],
            imports: [
                IonicModule.forRoot(MyApp)
            ],
            providers: [
                FoodService,
                StringFormaterService,
                { provide: StatusBar, useClass: StatusBarMock },
                { provide: SplashScreen, useClass: SplashScreenMock },
                { provide: Platform, useClass: PlatformMock },
                { provide: HTTP, useClass: HTTPMock }
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MyApp);
        component = fixture.componentInstance;
        foodService = fixture.debugElement.injector.get(FoodService);
    });

    it('Should get a list of food with id, name and portion', fakeAsync(() => {
        const items = [{
            item_id: '513fceb475b8dbbc21000fd3',
            item_name: 'Bananas, raw',
            item_portion: '1 medium (7" to 7-7/8" long)'
        }];

        foodService.searchFood('banana').then(data => { 
            tick();
            expect(data).toEqual(items);
        });
    }));

    it('Should get a food name and portion based on her id', fakeAsync(() => {
        const id = '513fceb475b8dbbc21000fd3';
        const name = 'Bananas, raw';
        const food_portion = '1 medium (7" to 7-7/8" long)'

        foodService.getFood(id).then(food => {
            tick();
            expect(food.item_name).toEqual(name);
            expect(food.item_portion).toEqual(food_portion)
        });
        
    }));

});