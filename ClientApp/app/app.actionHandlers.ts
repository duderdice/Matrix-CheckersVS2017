import { AppStartUpActions } from './actionHandlers/appStartUp.actions';
import { PieceStateActions } from './actionHandlers/pieceState.actions';
import { SquareStateActions } from './actionHandlers/squareState.actions';


export const APP_ACTION_HANDLERS = [
    AppStartUpActions,
    PieceStateActions,
    SquareStateActions
];
