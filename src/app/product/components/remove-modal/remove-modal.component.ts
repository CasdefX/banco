import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ClickedOutsideDirective } from '../../../directives/clicked-out-side.directive';

@Component({
  selector: 'app-remove-modal',
  standalone: true,
  imports: [ClickedOutsideDirective],
  templateUrl: './remove-modal.component.html',
  styleUrl: './remove-modal.component.css'
})
export class RemoveModalComponent {
  @ViewChild('myModal') modal!: ElementRef;
  @ViewChild('closeModal') span!: ElementRef;

  // Get the button that
  // When the user clicks the button, open the modal 
  open() {
    this.modal.nativeElement.classList.remove("hidden");
  }

  // When the user clicks on <span> (x), close the modal
  close() {
    this.modal.nativeElement.classList.add('hidden');
  }

  // When the user clicks anywhere outside of the modal, close it

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (event.target == this.modal.nativeElement) {
      this.modal.nativeElement.classList.add("hidden");
    }
  }
}
