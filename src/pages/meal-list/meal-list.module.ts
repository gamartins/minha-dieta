import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealListPage } from './meal-list';
import { NutrinfoCardComponent } from "../../components/nutrinfo-card/nutrinfo-card";

@NgModule({
  declarations: [
    MealListPage,
    NutrinfoCardComponent,
  ],
  imports: [
    IonicPageModule.forChild(MealListPage),
  ],
})
export class MealListPageModule {}
