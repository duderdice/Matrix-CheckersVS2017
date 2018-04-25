import { AppStartUpActions } from './actionHandlers/appStartUp.actions';
import { PieceStateActions } from './actionHandlers/pieceState.actions';
import { SquareStateActions } from './actionHandlers/squareState.actions';
import { PointStateActions } from './actionHandlers/pointState.actions';
import { AppStateActions } from './actionHandlers/appState.actions';



export const APP_ACTION_HANDLERS = [
    AppStartUpActions,
    PieceStateActions,
    SquareStateActions,
    PointStateActions,
    AppStateActions
];
