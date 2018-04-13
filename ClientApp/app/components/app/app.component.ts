import { Component, OnInit } from '@angular/core';
import { AppStartUpActions } from '../../actionHandlers/appStartUp.actions';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private _appStartUpActions: AppStartUpActions,
  ) { }

  ngOnInit() {
    this._appStartUpActions.initializeGame();
    this._appStartUpActions.initializeSquares();
    this._appStartUpActions.initializeScores();
  }
}
