import { Food } from "./food";

export class Meal {
    constructor(public id: string,
                public foodList: Array<Food>) {}
}