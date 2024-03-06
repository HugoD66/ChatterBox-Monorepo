// theme.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private isDarkTheme = new BehaviorSubject<boolean>(false);

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  toggleTheme(): void {
    const darkThemeEnabled = !this.isDarkTheme.value;
    this.isDarkTheme.next(darkThemeEnabled);

    if (darkThemeEnabled) {
      this.renderer.addClass(document.body, 'theme-dark');
    } else {
      this.renderer.removeClass(document.body, 'theme-dark');
    }
  }
}
