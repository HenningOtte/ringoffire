import { Injectable } from '@angular/core';
import { Game } from 'src/models/game';
import { inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private firestore = inject(Firestore);

  gameId: string = '';

  constructor() {}

  async saveGame(id: string, game: any) {
    await updateDoc(this.getDocRef('games', id), game).catch((err) => {
      console.error(err);
    });
  }

  getDocRef(id: string, docId: string) {
    return doc(this.getListRef(id), docId);
  }

  getListRef(id: string) {
    return collection(this.firestore, id);
  }

  async addGame(game: any) {
    return addDoc(this.getListRef('games'), game);
  }
}
