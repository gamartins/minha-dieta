import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HTTP } from '@ionic-native/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchPage } from "../pages/search/search";
import { FoodService } from "../services/food.service";
import { FoodDetailsPage } from "../pages/food-details/food-details";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    FoodDetailsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchPage,
    FoodDetailsPage,
  ],
  providers: [
    HTTP,
    StatusBar,
    SplashScreen,
    FoodService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
