
import { of, throwError } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { HttpErrorResponse } from '@angular/common/http';
import { IProduct } from '../../../core/interfaces/product';

describe('ProductListComponent', () => {
    let component: ProductListComponent;
    let fakeProductService: any;
    let vcrSpy: any
    const mockProducts: IProduct[] = [
        {
            "id": "123sedr",
            "name": "toto 12313232323",
            "description": "toto11234123",
            "logo": "https://www.dotafire.com/images/hero/icon/axe.png",
            "date_release": "2024-02-24T00:00:00.000+00:00",
            "date_revision": "2025-02-24T00:00:00.000+00:00"
        },
        {
            "id": "123123asd",
            "name": "asdasdasd",
            "description": "sdfsdfsdfsdf",
            "logo": "https://www.dotafire.com/images/hero/icon/axe.png",
            "date_release": "2024-02-24T00:00:00.000+00:00",
            "date_revision": "2025-02-24T00:00:00.000+00:00"
        },
        {
            "id": "123123a",
            "name": "asdasdsew",
            "description": "weweawe asd",
            "logo": "https://www.dotafire.com/images/hero/icon/axe.png",
            "date_release": "2024-02-25T00:00:00.000+00:00",
            "date_revision": "2025-02-25T00:00:00.000+00:00"
        },

    ];
    beforeEach(async () => {
        fakeProductService = {
            getProductsList: jest.fn(),
            getProductsVerification: jest.fn(),
            saveProduct: jest.fn(),
            updateProduct: jest.fn(),
            removeProduct: jest.fn()
        }
        vcrSpy = {
            createComponent: jest.fn()
        }
        component = new ProductListComponent(fakeProductService, vcrSpy);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should get date from getProductsList', () => {
        //given: mock the return of the moethod getCustomer
        jest.spyOn(fakeProductService, 'getProductsList').mockReturnValue(of(mockProducts));
        //when: triggers the component method that calls the service
        component.getProductList()
        //then: expect that product list is not empty
        expect(component.products.length).toBeGreaterThan(1)
        //then: expect that the component now has the value returned 
        expect(component.products).toEqual(mockProducts)
    });
    it('should get error message from getProductsList', () => {
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404, statusText: 'Not found'
        })
        //given:
        jest.spyOn(fakeProductService, 'getProductsList').mockReturnValue(throwError(() => errorResponse));
        //when:
        component.getProductList()
        //then:
        expect(component.errorMessage).toBe('Not found')
    });

    it('should test next page function increased minRows value', () => {
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404, statusText: 'Not found'
        })
        //given: selectedRows 10 (default number to add in each request)
        component.selectedRows.setValue(10)
        //when: next page button
        component.next()
        //then:  min rows  should be  minRows + selectedRows (default number to add in each change of page)
        expect(component.minRows).toBe(10)
        //when: next page button
        component.next()
        //then:  min rows  should be  minRows + selectedRows (default number to add in each change of page)
        expect(component.minRows).toBe(20)
    });
    it('should test preview page function decrease minRows value', () => {
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404, statusText: 'Not found'
        })
        //given: selectedRows 10 (default number to add in each request)
        component.minRows = 50;
        component.selectedRows.setValue(20)
        //when: next page button
        component.preview()
        //then:  min rows  should be  minRows - selectedRows (default number to remove in each change of page)
        expect(component.minRows).toBe(30)
        //when: next page button
        component.preview()
        //then:  min rows  should be  minRows - selectedRows (default number to remove in each change of page)
        expect(component.minRows).toBe(10)
        component.preview()
        //then:  min rows  should be  minRows - selectedRows (default number to remove in each change of page)
        expect(component.minRows).toBe(0)
    });
});
/*
openModal
showToastMessage */