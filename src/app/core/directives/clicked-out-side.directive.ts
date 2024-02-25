import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[clickedOutside]',
  standalone: true
})
export class ClickedOutsideDirective {
  clickedInside = true;
  constructor(private el: ElementRef) {
  }

  @Output() public clickedOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    this.clickedInside = this.el.nativeElement.contains(target);
    if (!this.clickedInside) {
      this.clickedOutside.emit(target);
    }
  }

}