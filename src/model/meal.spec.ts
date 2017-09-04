import { Meal } from "./meal";
import { Food } from "./food";

describe('MealClass', () => {
    let meal: Meal

    beforeEach(() => {
        meal = new Meal('123456', 'Almoço', [
            new Food('1', 'Leite', 100, 10, 20, 5),
            new Food('1', 'Ovos', 250, 30, 10, 15),
        ])
    })

    it('Should return the total of calories', () => {
        expect(meal.getTotalCalories()).toBe(350)
    })

    it('Should return the total of proteins', () => {
        expect(meal.getTotalNutrients(Meal.NutrientList.Proteins)).toBe(40)
    })
})