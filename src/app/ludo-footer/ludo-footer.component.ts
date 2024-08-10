import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-ludo-footer',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule],
  providers: [],
  templateUrl: './ludo-footer.component.html',
  styleUrl: './ludo-footer.component.scss',
})
export class LudoFooterComponent {}
