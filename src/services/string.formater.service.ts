import { Injectable } from '@angular/core';

@Injectable()
export class StringFormaterService {

  constructor() { }

  createNameAndDescription(fullName: string) {
    let indexOfDivider = fullName.indexOf('-');
    let length = fullName.length;
    let name, portion;

    if (indexOfDivider !== -1 ) {
      name = fullName.substring(0, indexOfDivider).trim();
      portion = fullName.substring(indexOfDivider + 1, length).trim();
    } else {
      name = fullName.substring(0, length).trim();
      portion = '';
    }
    
    return { name: name, portion: portion };
  }

}