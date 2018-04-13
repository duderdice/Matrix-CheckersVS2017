import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { APP_ACTION_HANDLERS } from './app.actionHandlers';
import { APP_STORES } from './app.stores';
import { APP_SERVICES } from './app.services';
import { APP_MOCK_INTERCEPTORS } from './app.mock.interceptors';
import { environment } from '../environments/environment';


import { AppComponent } from './components/app/app.component';
import { CellComponent } from './components/cell/cell.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { PieceComponent } from './components/piece/piece.component';
import { ScoreBoardComponent } from './components/score-board/score-board.component';



@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    GameBoardComponent,
    PieceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(APP_STORES)
  ],
  providers: [
    ...APP_ACTION_HANDLERS,
    ...APP_SERVICES,
    ...(environment.useMocking ? APP_MOCK_INTERCEPTORS : [])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
