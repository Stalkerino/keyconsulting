import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideStore } from '@ngrx/store';
import { reducers } from './app/store';
import { AppComponent } from './app/app.component';
import { localStorageReducer } from './app/store/localStorage.reducer';

export function loadState() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '{}');
  console.log('Loaded tasks from local storage:', tasks);
  return { tasks };
}

appConfig.providers.push(provideStore(reducers));
appConfig.providers.push(provideStore(reducers, { initialState: loadState, metaReducers: [localStorageReducer]}));
 
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));