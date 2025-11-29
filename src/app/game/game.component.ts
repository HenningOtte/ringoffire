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
  addDoc,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/firebase-services/game-service.service';

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
  game!: Game;
  gameId: string = '';
  unsubParams;
  unsubGame: any;

  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute);
  private gameService = inject(GameService);

  constructor(private dialog: MatDialog) {
    this.unsubParams = this.getGameId();
  }

  updateGame(game: any) {
    this.game.currentPlayer = game.currentPlayer;
    this.game.playedCards = game.playedCards;
    this.game.players = game.players;
    this.game.stack = game.stack;
    this.game.pickCardAnimation = game.pickCardAnimation;
    this.game.currentCard = game.currentCard;
  }

  ngOnInit(): void {
    this.newGame();
    this.unsubGame = onSnapshot(
      this.gameService.getDocRef('games', this.gameId),
      (game) => {
        this.updateGame(game.data());
      }
    );
  }

  loadGame() {}

  getGameId() {
    return this.route.params.subscribe((params) => {
      this.gameId = params['id'];
    });
  }

  newGame() {
    this.game = new Game();
  }

  async addDoc(game: {}) {
    let listRef = collection(this.firestore, 'games');
    const docRef = await addDoc(listRef, game).catch((err) => {
      console.error(err);
    });
  }

  takekCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      this.gameService.saveGame(this.gameId, this.game.toJson());

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.nextPlayer();
        this.gameService.saveGame(this.gameId, this.game.toJson());
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
      this.gameService.saveGame(this.gameId, this.game.toJson());
    });
  }
}
