import { TestBed, ComponentFixture } from "@angular/core/testing";
import { IonicModule, Platform } from "ionic-angular";
import { NutrinfoCardComponent } from './nutrinfo-card'
import { HomePage } from '../../pages/home/home'
import { DebugElement } from "@angular/core";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SplashScreenMock, StatusBarMock, PlatformMock } from "../../../test-config/mocks-ionic";
import { By } from "@angular/platform-browser";

describe('NutrinfoCard Component', () => {
    let comp:    NutrinfoCardComponent;
    let fixture: ComponentFixture<NutrinfoCardComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ NutrinfoCardComponent ],
        imports: [ IonicModule.forRoot(NutrinfoCardComponent) ],
        providers: [
            { provide: Platform, useClass: PlatformMock},
            { provide: StatusBar, useClass: StatusBarMock },
        ]
      });
  
      fixture = TestBed.createComponent(NutrinfoCardComponent);
      comp = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    })

    it('should show the total of calories', () => {
        comp.calories = 520;
        fixture.detectChanges()

        el = fixture.debugElement.query(By.css('ion-card-header')).nativeElement
        expect(el.textContent).toBe('520 KCal')
    })

    it('should show the total of carbo', () => {
        comp.carbo = 20;
        fixture.detectChanges()

        el = fixture.debugElement.query(By.css('ion-col:nth-child(1)')).nativeElement
        expect(el.textContent).toBe('Carbo20.0g')
    })

    it('should show the total of proteins', () => {
        comp.proteins = 20;
        fixture.detectChanges()

        el = fixture.debugElement.query(By.css('ion-col:nth-child(2)')).nativeElement
        expect(el.textContent).toBe('Proteins20.0g')
    })

    it('should show the total of fat', () => {
        comp.total_fat = 20;
        fixture.detectChanges()

        el = fixture.debugElement.query(By.css('ion-col:nth-child(3)')).nativeElement
        expect(el.textContent).toBe('Fat20.0g')
    })

    it('show show nutrients to one decimal places', () => {
        comp.carbo = 75.99999
        comp.proteins = 10.333333
        comp.total_fat = 0.8999999
        fixture.detectChanges()

        el = fixture.debugElement.query(By.css('ion-col:nth-child(1)')).nativeElement
        expect(el.textContent).toBe('Carbo76.0g')

        el = fixture.debugElement.query(By.css('ion-col:nth-child(2)')).nativeElement
        expect(el.textContent).toBe('Proteins10.3g')

        el = fixture.debugElement.query(By.css('ion-col:nth-child(3)')).nativeElement
        expect(el.textContent).toBe('Fat0.9g')
        
        
    })
})