import { ComponentFixture, TestBed } from '@angular/core/testing';

import EditProductComponent from './edit-product.component';
import { FormBuilder } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';

describe('EditProductComponent', () => {
    let component: EditProductComponent;

    let productServiceSpy: any
    let formBuilderSpy: any
    let gnrlServiceSpy: any
    let datePipeSpy: any
    let formValidateServiceSpy: any
    let vcrSpy: any
    let activatedRouteSpy: any
    beforeEach(async () => {
        productServiceSpy = {
            getProductsList: jest.fn(),
            getProductsVerification: jest.fn(),
            saveProduct: jest.fn(),
            updateProduct: jest.fn(),
            removeProduct: jest.fn()
        }
        formBuilderSpy = new FormBuilder();
        gnrlServiceSpy = {
            dateToText: jest.fn(),
            setDateRevision: jest.fn()
        }
        datePipeSpy = {
            transform: jest.fn()
        }
        formValidateServiceSpy = {
            idValidator: jest.fn(),
            dateValidator: jest.fn(),
            validityForm: jest.fn(),
            validateAllFormFields: jest.fn(),
            getMsgError: jest.fn()
        }
        vcrSpy = {
            createComponent: jest.fn()
        }
        activatedRouteSpy = {
            snapshot: {
                params: jest.fn()
            }
        }
        component = new EditProductComponent(
            productServiceSpy,
            formBuilderSpy,
            gnrlServiceSpy,
            datePipeSpy,
            formValidateServiceSpy, activatedRouteSpy,
            vcrSpy
        ); expect(component).toBeTruthy();
    });

    it('should create', () => {

    });
});
