import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation: boolean = false;
  game!: Game;

  constructor() {}

  ngOnInit(): void {
    this.newGame();
    console.log(this.game);
  }

  newGame() {
    this.game = new Game();
  }

  takekCard() {
    this.pickCardAnimation = true;
  }
}
