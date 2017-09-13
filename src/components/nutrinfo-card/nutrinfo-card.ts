import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'nutrinfo-card',
  templateUrl: 'nutrinfo-card.html'
})
export class NutrinfoCardComponent {
  @Input('calories') calories: number = 0;
  @Input('protein') proteins: number = 0;
  @Input('carbo') carbo: number = 0;
  @Input('fat') total_fat: number = 0;

  constructor() { }

}
