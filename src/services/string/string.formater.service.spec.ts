import { StringFormaterService } from './string.formater.service';
describe('StringFormatter Service', () => {
    let service: StringFormaterService;
    let food_name: string;
    
     beforeEach(() => { 
         service = new StringFormaterService();
         
    });

    it('Should separate food from description', () => {
        food_name = 'Bananas, raw - 1 medium (7" to 7-7/8" long)';
        const formated = service.createNameAndDescription(food_name);
        expect(formated).toEqual({ name: 'Bananas, raw', portion: '1 medium (7" to 7-7/8" long)'});
    });

    it('Should return a empty portion if theres no divider', () => {
        food_name = 'Organic Penut Butter, Creamy Banana';
        const formated = service.createNameAndDescription(food_name);

        expect(formated).toEqual({name: 'Organic Penut Butter, Creamy Banana', portion: ''});
    })
});