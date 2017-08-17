export class Food {
    constructor(public id: string, 
                public name: string,
                public calories?: number,
                public proteins?: number,
                public carbohydrates?: number,
                public total_fat?: number,
                public sodium?: number) { }
}