import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [],
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.css'
})
export class ToastMessageComponent implements OnInit, OnDestroy {
  @Input() title!: string;
  @Input() message!: string;
  @Input() type: 'success' | 'danger' = 'success';
  closeSubject = new Subject<boolean>();
  closedTime!: any;
  ngOnInit(): void {
    this.closedTime = setTimeout(() => {
      this.deleteItself()
      clearTimeout(this.closedTime);
    }, 5000);
    console.log('Modal init');
  }

  get closeObservable() {
    return this.closeSubject.asObservable();
  }
  deleteItself() {
    this.closeSubject.next(true);
  }
  ngOnDestroy(): void {


    console.log(' Modal destroyed');
  }
}
