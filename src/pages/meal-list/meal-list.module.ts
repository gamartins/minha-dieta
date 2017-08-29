import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealListPage } from './meal-list';

@NgModule({
  declarations: [
    MealListPage,
  ],
  imports: [
    IonicPageModule.forChild(MealListPage),
  ],
})
export class MealListPageModule {}
