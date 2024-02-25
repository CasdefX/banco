import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
    let pipe: FilterPipe;
    let datePipeSpy: any
    it('create an instance', () => {
        datePipeSpy = {
            transform: jest.fn()
        }
        pipe = new FilterPipe(datePipeSpy);
    });
    it('should be created', () => {
        expect(pipe).toBeTruthy();
    })
});
