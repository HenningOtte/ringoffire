import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  pickCardAnimation: boolean = false;
  game!: Game;

  constructor() {}

  newGame() {
    this.game = new Game();
  }

  takekCard() {
    this.pickCardAnimation = true;
  }
}
