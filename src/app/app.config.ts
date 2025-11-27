import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCbBOseh_mVdFVNYLuP7YgXCFLFhjtP8EU',
  authDomain: 'ring-of-fire-52740.firebaseapp.com',
  projectId: 'ring-of-fire-52740',
  storageBucket: 'ring-of-fire-52740.firebasestorage.app',
  messagingSenderId: '555229842516',
  appId: '1:555229842516:web:50a079b7aa335f015c71c1',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore())
    ),
  ],
};
