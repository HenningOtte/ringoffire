import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-player-mobile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-player-mobile.component.html',
  styleUrls: ['./app-player-mobile.component.scss'],
})
export class AppPlayerMobileComponent {
  @Input() name: string = 'Player';
  @Input() playerActive: boolean = false;
  @Input() image: string = '1.png';
}
