import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LudoLogicComponent } from './ludo-logic/ludo-logic.component';
import { LudoFooterComponent } from './ludo-footer/ludo-footer.component';
import { HeaderComponent } from './Common/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LudoLogicComponent,
    LudoFooterComponent,
    HeaderComponent,
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'prit-ludo-frontend';
}
