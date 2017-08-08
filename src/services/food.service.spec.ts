import { TestBed, inject, async } from "@angular/core/testing";

import { HTTP, HTTPResponse } from "@ionic-native/http";
import { HTTPMock, StatusBarMock, SplashScreenMock, PlatformMock } from "../../test-config/mocks-ionic";

import { MyApp } from "../app/app.component";
import { IonicModule, Platform } from "ionic-angular";
import { FoodService } from "./food.service";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { fakeAsync } from "@angular/core/testing";
import { tick } from "@angular/core/testing";

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

    it('Should get a list of food', fakeAsync(() => {
        let items = [], items2 = []; 
        items.push("Bananas, raw - 1 medium (7 to 7-7/8 long)");
        
        foodService.getFood('banana').then(data => { 
            tick();
            expect(data).toEqual(items);
        });
        
    }));

});