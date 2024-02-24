import { Component, ComponentFactoryResolver, ElementRef, Renderer2, ViewChild, ViewContainerRef, signal, } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { IProduct } from '../../../core/interfaces/product';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../../core/pipes/filter.pipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ClickedOutsideDirective } from '../../../directives/clicked-out-side.directive';
import { RemoveModalComponent } from '../../components/remove-modal/remove-modal.component';
import { timer } from 'rxjs';
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
  page: number = 0;
  initRowsValue: number = 5;
  selectedRows = new FormControl();

  productActionsMenuActive!: IProduct
  constructor(private productService: ProductService, private vcr: ViewContainerRef) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.selectedRows.setValue(5)
    this.getProductList();

  }
  getProductList() {
    this.productService.getProductsList().subscribe((response: any) => {
      this.products = response;
    })
  }
  next() {
    this.page += this.selectedRows.value || this.initRowsValue;
  }

  preview() {
    this.page -= this.selectedRows.value || this.initRowsValue;
  }

  openActionsMenu(product: IProduct) {
    this.productActionsMenuActive = product
    product.isMenuOpen = !product.isMenuOpen;
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
  handleCloseModal() { }
  handleConfirmModal() { }
  //getters
}
