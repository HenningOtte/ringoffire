import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-player-edit',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.scss'],
})
export class PlayerEditComponent {
  allProfilePictures = ['1.png', '2.png', 'cactus.png', 'skull.png'];
}
