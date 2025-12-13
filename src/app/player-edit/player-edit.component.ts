import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-player-edit',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.scss'],
})
export class PlayerEditComponent {
  allProfilePictures = ['1.png', '2.png', 'cactus.png', 'skull.png'];
  dialog = inject(MatDialog);
  dialogRef = inject(MatDialogRef);

  constructor() {}

  close() {
    this.dialogRef.close(null);
  }
}
