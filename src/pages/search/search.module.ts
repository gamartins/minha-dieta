import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import { StringFormaterService } from "../../services/string.formater.service";

@NgModule({
  declarations: [SearchPage],
  imports: [IonicPageModule.forChild(SearchPage)],
  providers: [ StringFormaterService ]
})
export class HomePageModule { }