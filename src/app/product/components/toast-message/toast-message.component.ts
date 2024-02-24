import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [],
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.css'
})
export class ToastMessageComponent {
  @Input() title!: string;
  @Input() message!: string;
  @Input() type: 'success' | 'danger' = 'success';
  @ViewChild('toast') toast!: ElementRef;
  @ViewChild('progress') progress!: ElementRef;

  paymentTime!: any;
  progressTime!: any;
  showSuccessMessage() {
    if (!this.toast.nativeElement.classList.contains("toast--active")) {
      this.toast.nativeElement.classList.add("toast--active");
      this.progress.nativeElement.classList.add("toast--active");

      this.paymentTime = setTimeout(() => {
        this.toast.nativeElement.classList.remove("toast--active");
      }, 5000); //1s = 1000 milliseconds

      this.progressTime = setTimeout(() => {
        this.progress.nativeElement.classList.remove("toast--active");
      }, 5300);
    }
  }
  removeSuccessMessage() {
    if (this.toast.nativeElement.classList.contains("toast--active")) {
      this.toast.nativeElement.classList.remove("toast--active");

      setTimeout(() => {
        this.progress.nativeElement.classList.remove("toast--active");
      }, 300);

      clearTimeout(this.paymentTime);
      clearTimeout(this.progressTime);
    }
  }
}
