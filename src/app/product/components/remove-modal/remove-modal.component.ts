import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ClickedOutsideDirective } from '../../../directives/clicked-out-side.directive';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-remove-modal',
  standalone: true,
  imports: [ClickedOutsideDirective],
  templateUrl: './remove-modal.component.html',
  styleUrl: './remove-modal.component.css'
})
export class RemoveModalComponent implements OnInit, OnDestroy {
  @ViewChild('myModal') modal!: ElementRef;
  @Input() message!: String;
  closeSubject = new Subject<boolean>();
  confirmSubject = new Subject<boolean>();

  ngOnInit(): void {
    console.log('Modal init');
  }
  // clicks anywhere outside of the modal to close
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.modal) {
      if (event.target == this.modal.nativeElement) {
        this.deleteItself()

      }
    }
  }

  get closeObservable() {
    return this.closeSubject.asObservable();
  }
  get confirmObservable() {
    return this.confirmSubject.asObservable();
  }
  deleteItself() {
    this.closeSubject.next(true);
  }
  confirm() {
    this.confirmSubject.next(true);
  }
  ngOnDestroy(): void {
    console.log(' Modal destroyed');
  }

}
