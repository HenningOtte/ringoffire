import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-player-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.scss'],
})
export class PlayerEditComponent implements OnInit {
  allProfilePictures = ['1.png', '2.png', 'cactus.png', 'skull.png'];
  dialog = inject(MatDialog);
  dialogRef = inject(MatDialogRef);

  public data = inject(MAT_DIALOG_DATA);

  edit: boolean = false;
  newName: string = 'Max';
  player = {
    picture: '1.png',
    name: 'Max Mustermann',
  };

  constructor() {}

  ngOnInit(): void {
    this.player.name = this.data.playerName;
    this.newName = this.data.playerName;
    this.player.picture = this.data.picture;
  }

  editName() {
    if (this.edit == false) {
      this.edit = true;
    } else {
      this.edit = false;
    }
  }

  savePicture(picture: string) {
    this.player.picture = picture;
  }

  savaName(name: string) {
    if (name.length <= 0) return;
    this.player.name = name;
  }

  save() {
    this.savaName(this.newName);
    return this.player;
  }

  close() {
    this.edit = false;
    this.dialogRef.close(null);
  }
}
