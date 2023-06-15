import { ToggleSubmenuDirective } from './toggle-submenu.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('ToggleSubmenuDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = {} as ElementRef;
    const mockRenderer2 = {} as Renderer2;
    const directive = new ToggleSubmenuDirective(mockElementRef, mockRenderer2);
    expect(directive).toBeTruthy();
  });
});
