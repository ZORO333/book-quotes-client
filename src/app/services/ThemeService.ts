import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private key = 'theme';

  constructor() {
    const saved = localStorage.getItem(this.key);
    if (saved === 'dark') {
      document.body.classList.add('dark');
    }
  }

  toggle() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem(this.key, isDark ? 'dark' : 'light');
  }

  isDark() {
    return document.body.classList.contains('dark');
  }
}
