import {
  Injectable,
  Renderer2,
  RendererFactory2,
  signal,
  WritableSignal,
} from '@angular/core';
import { DarkModeEnum, ThemeEnum } from '../enum/theme.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: WritableSignal<ThemeEnum>;
  private darkMode: WritableSignal<DarkModeEnum>;

  private readonly THEME_STORAGE_KEY = 'currentTheme';
  private readonly DARK_MODE_STORAGE_KEY = 'darkMode';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    // Récupérer le thème et le mode sombre depuis le localStorage
    const storedTheme = localStorage.getItem(this.THEME_STORAGE_KEY);
    const storedDarkMode = localStorage.getItem(this.DARK_MODE_STORAGE_KEY);

    console.log('Stored theme:', storedTheme);
    console.log('Stored dark mode:', storedDarkMode);

    // Vérifier et définir les valeurs de signal
    this.currentTheme = signal(
      storedTheme && this.isValidTheme(storedTheme)
        ? (storedTheme as ThemeEnum)
        : ThemeEnum.BLUE,
    );
    this.darkMode = signal(
      storedDarkMode && this.isValidDarkMode(storedDarkMode)
        ? (storedDarkMode as DarkModeEnum)
        : DarkModeEnum.LIGHT,
    );

    // Appliquer le thème au démarrage
    this.applyTheme();
  }

  private applyTheme(): void {
    console.log(`Applying theme: ${this.currentTheme()}-${this.darkMode()}`);
    this.renderer.addClass(
      document.body,
      `${this.currentTheme()}-${this.darkMode()}`,
    );
  }

  changeTheme(theme: ThemeEnum): void {
    if (theme === this.currentTheme()) {
      return;
    }

    this.renderer.removeClass(
      document.body,
      `${this.currentTheme()}-${this.darkMode()}`,
    );

    this.renderer.addClass(document.body, `${theme}-${this.darkMode()}`);

    // Mettre à jour le signal et stocker dans le localStorage
    this.currentTheme.set(theme);
    localStorage.setItem(this.THEME_STORAGE_KEY, theme);

    console.log(`${this.currentTheme()}-${this.darkMode()}`);
  }

  changeThemeMode(): void {
    const currentMode = this.darkMode();
    const newMode =
      currentMode === DarkModeEnum.DARK
        ? DarkModeEnum.LIGHT
        : DarkModeEnum.DARK;

    this.darkMode.set(newMode);

    this.renderer.removeClass(
      document.body,
      `${this.currentTheme()}-${currentMode}`,
    );

    this.renderer.addClass(document.body, `${this.currentTheme()}-${newMode}`);

    // Mettre à jour le localStorage
    localStorage.setItem(this.DARK_MODE_STORAGE_KEY, newMode);

    console.log(`${this.currentTheme()}-${newMode}`);
  }

  private isValidTheme(value: string): value is ThemeEnum {
    return Object.values(ThemeEnum).includes(value as ThemeEnum);
  }

  private isValidDarkMode(value: string): value is DarkModeEnum {
    return Object.values(DarkModeEnum).includes(value as DarkModeEnum);
  }
}
