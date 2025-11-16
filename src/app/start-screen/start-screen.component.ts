import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent {
  test: string = 'Hello World';
  constructor(private router: Router) {}

  newGame() {
    this.router.navigate(['/game']);
  }
}
