import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { UiLanguageService } from './core/services/ui-language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private readonly uiLanguage = inject(UiLanguageService);

  ngOnInit(): void {
    this.uiLanguage.init();
  }
}
