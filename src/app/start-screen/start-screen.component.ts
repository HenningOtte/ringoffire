import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';

import { Game } from 'src/models/game';
import { GameService } from 'src/app/firebase-services/game-service.service';

import { Firestore, collection, doc, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent {
  private firestore = inject(Firestore);
  private gameService = inject(GameService);

  constructor(private router: Router) {}

  async newGame() {
    let game = new Game();
    const id = await this.gameService
      .addGame(game.toJson())
      .then((gameInfo) => {
        this.router.navigateByUrl(`/game/${gameInfo.id}`);
      });
  }
}
