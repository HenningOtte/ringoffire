import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from 'src/models/game';
import { PlayerComponent } from 'src/app/player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from 'src/app/dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';

import { AsyncPipe } from '@angular/common';
import { inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  getDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    DialogAddPlayerComponent,
    GameInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation: boolean = false;
  currentCard: string = '';
  game!: Game;
  firestore = inject(Firestore);
  docRef;

  constructor(private dialog: MatDialog) {
    this.docRef = doc(this.firestore, 'Cards', '5AQrj49bG1N6HHNoyoy8');
    this.logListData();
  }

  ngOnInit(): void {
    this.newGame();
    // console.log(this.game);
  }

  async logListData() {
    const snap = await getDoc(this.docRef);
    console.log('Card: ', snap.data());
  }

  listCollection() {
    return collection(this.firestore, 'Cards');
  }

  newGame() {
    this.game = new Game();
  }

  takekCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        this.nextPlayer();
      }, 1000);
    }
  }

  nextPlayer() {
    if (this.game.players.length > 0) {
      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (!name || name.length == 0) return;
      this.game.players.push(name);
    });
  }
}
