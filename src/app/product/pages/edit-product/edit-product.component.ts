import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormValidateService } from '../../../core/services/form-validate.service';
import { GeneralService } from '../../../core/services/general.service';
import { ProductService } from '../../../core/services/product.service';
import { checkDuplicate } from '../../../core/validators/checkDuplicate.validator';
import { ClickedOutsideDirective } from '../../../core/directives/clicked-out-side.directive';
import { ToastMessageComponent } from '../../components/toast-message/toast-message.component';
import { IProduct } from '../../../core/interfaces/product';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterLink, ClickedOutsideDirective],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export default class EditProductComponent implements AfterViewInit {
  productForm = this.initForm();
  duplicateError = false;
  @ViewChild('InputId') InputId!: ElementRef;
  constructor(public productService: ProductService, private fb: FormBuilder, private gnrlService: GeneralService, private datePipe: DatePipe, private formValidateService: FormValidateService, private route: ActivatedRoute, private vcr: ViewContainerRef) {


  }
  ngAfterViewInit(): void {
    this.InputId.nativeElement.focus();
    this.setDataToForm();
  }
  //get data product from server
  setDataToForm() {
    let idRecord = this.route.snapshot.params['id'];
    this.productService.getProductsList().subscribe((products: IProduct[]) => {
      let record: any = products.find(x => x.id == idRecord)
      this.productForm = this.initForm(record)
      this.id.disable();
      this.setDateRevision()
    });

  }

  //init form
  initForm(record?: IProduct) {

    return this.fb.group({
      id: [record?.id, {
        validators: [this.formValidateService.idValidator, Validators.minLength(3), Validators.maxLength(10)]
      }],
      name: [record?.name, {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      }],
      description: [record?.description, {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(200)]
      }],
      logo: [record?.logo, {
        validators: [Validators.required]
      }],
      date_release: [this.datePipe.transform(record?.date_release, 'yyyy-MM-dd', '-0'), {
        validators: [Validators.required, this.formValidateService.dateValidator]
      }],
      date_revision: [{ value: '', disabled: true }, {
        validators: [Validators.required],
      }]
    })
  }
  //set date_revision 1 year more
  setDateRevision() {

    this.date_revision.setValue(this.gnrlService.dateToText(this.gnrlService.setDateRevision(this.date_release.value)));
  }
  /* update data */
  async updateRecord() {
    try {
      this.formValidateService.validityForm(this.productForm);
      if (this.productForm.valid) {
        let data: any = this.productForm.getRawValue();
        data.date_revision = data.date_revision.split('/').reverse().join('-')
        this.productService.updateProduct(data).subscribe(data => {
          this.showToastMessage();
          this.setDataToForm();
        });
      } else {
        this.formValidateService.validateAllFormFields(this.productForm);
      }
    } catch (error: any) {
      console.error(error)
    }
  }
  /* confirm message */
  showToastMessage() {
    const toastComponent = this.vcr.createComponent(ToastMessageComponent);
    toastComponent.instance.title = "Guardado!";
    toastComponent.instance.message = "Producto Actualizado Satisfactoriamente!";
    toastComponent.instance.closeObservable.subscribe((remove) => {
      if (remove) toastComponent.destroy();
    })
  }
  /* reset from values */
  resetForm() {
    this.productForm = this.initForm()
    this.setDateRevision()
    this.InputId.nativeElement.focus();
  }


  /* controls errors */
  msgError(control: FormControl) {
    if (control.invalid && (control.touched || control.dirty)) return this.formValidateService.getMsgError(control)
  }
  //getters
  get id() {
    return this.productForm.controls['id'] as FormControl;
  }
  get name() {
    return this.productForm.controls['name'] as FormControl;
  }
  get description() {
    return this.productForm.controls['description'] as FormControl;
  }
  get date_release() {
    return this.productForm.controls['date_release'] as FormControl;
  }
  get date_revision() {
    return this.productForm.controls['date_revision'] as FormControl;
  }

}

