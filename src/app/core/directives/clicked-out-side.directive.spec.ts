import { ClickedOutsideDirective } from './clicked-out-side.directive';

describe('ClickedOutSideDirective', () => {
    let ElementRefSpy: any = {
        nativeElement: {
            contains: jest.fn()
        }
    }
    const directive = new ClickedOutsideDirective(ElementRefSpy)
    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });
    it('should handle document click', () => {
        document.dispatchEvent(new MouseEvent('click'));
        expect(directive.clickedInside).toBe(true);
    });
});
