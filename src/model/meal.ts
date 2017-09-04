import { Food } from "./food";

export class Meal {
    constructor(public id: string,
                public name: string,
                public foodList: Array<Food>) {}
}