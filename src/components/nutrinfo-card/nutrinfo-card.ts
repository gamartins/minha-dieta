import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'nutrinfo-card',
  templateUrl: 'nutrinfo-card.html'
})
export class NutrinfoCardComponent {
  @Input('calories') calories: number;
  @Input('protein') proteins: number;
  @Input('carbo') carbo: number;
  @Input('fat') total_fat: number;

  constructor() { }

}
