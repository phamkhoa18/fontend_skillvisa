import { Directive } from '@angular/core';
import {  ElementRef, HostListener, Renderer2 } from '@angular/core';
@Directive({
  selector: '[appToggleSubmenu]'
})
export class ToggleSubmenuDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click')
  onClick() {
    const submenu = this.el.nativeElement.querySelector('.submenu');
    if (submenu) {
      const display = submenu.style.display;
      if (display === 'none' || display === '') {
        this.renderer.setStyle(submenu, 'display', 'block');
      } else {
        this.renderer.setStyle(submenu, 'display', 'none');
      }
    }
  }

}
