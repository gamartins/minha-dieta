import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodDetailsPage } from './food-details';

@NgModule({
  declarations: [FoodDetailsPage],
  imports: [IonicPageModule.forChild(FoodDetailsPage)],
})
export class HomePageModule { }