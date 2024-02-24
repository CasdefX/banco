import { AfterContentInit, AfterViewInit, Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ClickedOutsideDirective } from '../../../directives/clicked-out-side.directive';
import { GeneralService } from '../../../core/services/general.service';
import { firstValueFrom } from 'rxjs';
import { FormValidateService } from '../../../core/services/form-validate.service';
import { IProduct } from '../../../core/interfaces/product';
import { ToastMessageComponent } from '../../components/toast-message/toast-message.component';
import { checkDuplicate } from '../../../core/validators/checkDuplicate.validator';

export type IForm<T> = {
  [K in keyof T]?: any;
}
@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterLink, ClickedOutsideDirective],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export default class NewProductComponent implements AfterViewInit {
  productForm = this.initForm()
  duplicateError = false;
  @ViewChild('InputId') InputId!: ElementRef;
  constructor(public productService: ProductService, private fb: FormBuilder,
    private router: Router, private gnrlService: GeneralService, private datePipe: DatePipe, private formValidateService: FormValidateService, private vcr: ViewContainerRef) {
    this.setDateRevision();

  }
  ngAfterViewInit(): void {

    this.InputId.nativeElement.focus();
  }
  //init form
  initForm() {
    let nowDate = new Date();
    nowDate.setDate(nowDate.getDate());
    let date: any = this.datePipe.transform(nowDate, 'yyyy-MM-dd');
    return this.fb.group({
      id: ['', {
        validators: [this.formValidateService.idValidator, checkDuplicate(this.duplicateError), Validators.minLength(3), Validators.maxLength(10)]
      }],
      name: ['', {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      }],
      description: ['', {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(200)]
      }],
      logo: ['', {
        validators: [Validators.required]
      }],
      date_release: [this.datePipe.transform(nowDate, 'yyyy-MM-dd'), {
        validators: [Validators.required, this.formValidateService.dateValidator]
      }],
      date_revision: [{ value: '' }, {
        validators: [Validators.required],
      }]
    })
  }
  /* set data revision whit 1 year more */
  setDateRevision() {
    this.date_revision.setValue(this.gnrlService.dateToText(this.gnrlService.setDateRevision(this.date_release.value)));
  }
  /* save data */
  async saveRecord() {
    try {
      this.formValidateService.validityForm(this.productForm)
      if (this.productForm.valid) {
        await firstValueFrom(this.productService.saveProduct(this.productForm.value));
        this.showToastMessage();
        this.resetForm();
      } else {
        this.formValidateService.validateAllFormFields(this.productForm);
        this.checkDuplicate();
      }
    } catch (error: any) {
      console.error(error);
    }
  }
  /* confirm message */
  showToastMessage() {
    const toastComponent = this.vcr.createComponent(ToastMessageComponent);
    toastComponent.instance.title = "Guardado!";
    toastComponent.instance.message = "Producto Registrado Satisfactoriamente!";
    toastComponent.instance.closeObservable.subscribe((remove) => {
      if (remove) toastComponent.destroy();
    })
  }
  /* reset form values */
  resetForm() {
    this.productForm = this.initForm()
    this.setDateRevision()
    this.InputId.nativeElement.focus();
  }
  /* check id duplicate */
  async checkDuplicate() {
    if (this.id.value) {
      this.duplicateError = await firstValueFrom(this.productService.getProductsVerification(this.id.value));
      if (this.duplicateError) {
        const err: ValidationErrors = { idDuplicate: true };
        this.id.setErrors(err);
      }
    }
  }

  /* controls errors */
  msgError(control: FormControl) {
    if (control.invalid && (control.touched || control.dirty)) return this.formValidateService.getMsgError(control)
  }
  //getters
  get id() {
    return this.productForm.controls.id as FormControl;
  }
  get name() {
    return this.productForm.controls.name as FormControl;
  }
  get description() {
    return this.productForm.controls.description as FormControl;
  }
  get date_release() {
    return this.productForm.controls.date_release as FormControl;
  }
  get date_revision() {
    return this.productForm.controls.date_revision as FormControl;
  }

}