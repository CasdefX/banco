import { Component, ElementRef, Renderer2, ViewChild, } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { IProduct } from '../../../core/interfaces/product';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../../core/pipes/filter.pipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ClickedOutsideDirective } from '../../../directives/clicked-out-side.directive';
import { RemoveModalComponent } from '../../components/remove-modal/remove-modal.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FilterPipe, ReactiveFormsModule, RouterLink, ClickedOutsideDirective, RemoveModalComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent {
  @ViewChild(RemoveModalComponent)
  private removeModalComponent!: RemoveModalComponent;
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
  /* menu */
  isMenuOpen = false
  constructor(private productService: ProductService, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      /* if (e.target !== this.toggleButton.nativeElement) {
        if (this.productActionsMenuActive) {
          this.productActionsMenuActive.isMenuOpen = false
        }
      } */
    });
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
  openModal() {
    console.log("aqui")
    this.removeModalComponent.open()
  }
  //getters
}
