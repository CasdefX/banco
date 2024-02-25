

import { FormBuilder, FormGroup } from '@angular/forms';
import NewProductComponent from './new-product.component';
import { DatePipe } from '@angular/common';
import { GeneralService } from '../../../core/services/general.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from '../../../core/services/product.service';
import { FormValidateService } from '../../../core/services/form-validate.service';
import { ViewContainerRef } from '@angular/core';

describe('NewProductComponent', () => {
    let component: NewProductComponent;
    let productServiceSpy: any
    let formBuilderSpy: any
    let gnrlServiceSpy: any
    let datePipeSpy: any
    let formValidateServiceSpy: any
    let vcrSpy: any
    let productForm: any
    let fixture: ComponentFixture<NewProductComponent>;
    beforeEach(async () => {
        productServiceSpy = {
            getProductsList: jest.fn(),
            getProductsVerification: jest.fn(),
            saveProduct: jest.fn(),
            updateProduct: jest.fn(),
            removeProduct: jest.fn()
        }
        formBuilderSpy = new FormBuilder();
        gnrlServiceSpy = new GeneralService()
        datePipeSpy = DatePipe;
        formValidateServiceSpy = new FormValidateService()
        vcrSpy = {
            createComponent: jest.fn()
        }
        await TestBed.configureTestingModule({
            imports: [NewProductComponent],
            providers: [{ provide: ProductService, useValue: productServiceSpy },
                FormBuilder,
                GeneralService,
                DatePipe,
                FormValidateService,
                ViewContainerRef]

        })
            .compileComponents();

        fixture = TestBed.createComponent(NewProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should init productForm', () => {
        const InitFormResult = {
            id: '',
            name: '',
            description: '',
            logo: '',
            date_release: "2024-02-28",
            date_revision: '28/02/2025'
        }
        fixture.detectChanges();
        component.productForm.controls['date_release'].setValue(InitFormResult.date_release);
        expect(component.productForm.controls['date_release'].value).toEqual(InitFormResult.date_release);
        component.setDateRevision()
        console.log(component.productForm.getRawValue())
        console.log(InitFormResult)
        expect(component.productForm.controls['date_revision'].value).toEqual(InitFormResult.date_revision);
    });

    it('should test checkDuplicateID method', () => {
        const InitFormResult = {
            id: '123sedr',
            name: 'prueba',
            description: 'test reset form',
            logo: '',
            date_release: "2024-02-28",
            date_revision: '28/02/2025'
        }
        //when:
        component.checkDuplicateID()
        //then:
        expect(component.productForm.controls["id"].errors).toEqual({ "idSelectRequired": true, "required": true });
        let msg = component.msgError(component.productForm.controls["id"])
        console.log(msg)
    });
});
