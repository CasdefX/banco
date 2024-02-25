import { Component, ComponentFactoryResolver, ElementRef, Renderer2, ViewChild, ViewContainerRef, signal, } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { IProduct } from '../../../core/interfaces/product';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../../core/pipes/filter.pipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ClickedOutsideDirective } from '../../../core/directives/clicked-out-side.directive';
import { RemoveModalComponent } from '../../components/remove-modal/remove-modal.component';
import { EMPTY, catchError, timer } from 'rxjs';
import { ToastMessageComponent } from '../../components/toast-message/toast-message.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FilterPipe, ReactiveFormsModule, RouterLink, ClickedOutsideDirective],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent {
  public condition = signal(false);

  @ViewChild('actions') toggleButton!: ElementRef;
  products: IProduct[] = [];
  /* filter */
  searchText = new FormControl();
  /* rows table */
  rowsTable: number[] = [5, 10, 20];
  minRows: number = 0;
  initRowsValue: number = 5;
  selectedRows = new FormControl();
  /* control response  error */
  errorMessage: any;
  productActionsMenuActive!: IProduct;
  constructor(private productService: ProductService, private vcr: ViewContainerRef) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.selectedRows.setValue(5)
    this.getProductList();

  }
  getProductList() {
    this.productService.getProductsList().pipe(catchError(err => { this.errorMessage = err.statusText; return EMPTY; })).subscribe({
      next: (response: any) => {
        this.products = response;
      },
      complete: () => {
        console.log("finished")
      }
    })
  }
  next() {
    this.minRows += this.selectedRows.value || this.initRowsValue;
  }

  preview() {
    this.minRows -= this.selectedRows.value || this.initRowsValue;

    this.minRows = this.minRows < 0 ? 0 : this.minRows;
  }


  openModal(product: IProduct) {
    const removeModalComponent = this.vcr.createComponent(RemoveModalComponent);
    removeModalComponent.instance.message = `¿Estas seguro de eliminar el producto ${product.name}? `;

    //close observable
    removeModalComponent.instance.closeObservable.subscribe((remove) => {
      if (remove) removeModalComponent.destroy();
    })
    //confirm observable
    removeModalComponent.instance.confirmObservable.subscribe((confirm) => {
      this.productService.removeProduct(product.id).subscribe((response: any) => {
        if (confirm) {
          this.showToastMessage();
          removeModalComponent.destroy();
          this.getProductList();
        }
      })
    })
  }
  showToastMessage() {
    const toastComponent = this.vcr.createComponent(ToastMessageComponent);
    toastComponent.instance.title = "Guardado!";
    toastComponent.instance.message = "Producto Registrado Satisfactoriamente!";
    toastComponent.instance.closeObservable.subscribe((remove) => {
      if (remove) toastComponent.destroy();
    })
  }
  //getters
}
