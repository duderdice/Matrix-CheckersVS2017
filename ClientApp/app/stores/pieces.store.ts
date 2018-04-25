import { Action } from '@ngrx/store';
import { Piece } from '../models/game-piece';


export type State = Array<Piece>;

export const DISPLAY_PIECES = 'DISPLAY_PIECES';
export const MOVE_PIECES = 'MOVE_PIECES';
export const JUMP_PIECES = 'JUMP_PIECES';
export const MAKE_KING = 'MAKE_KING';

export class DisplayPieceAction implements Action {
    readonly type = DISPLAY_PIECES;
    payload: Array<Piece>;
}

export class MovePieceAction implements Action {
    readonly type = MOVE_PIECES;
    origin: { row: number, col: number };
    destination: { row: number, col: number };
}

export class JumpPieceAction implements Action {
    readonly type = JUMP_PIECES;
    // payload: Array<Piece>;
    origin: { row: number, col: number };
    destination: { row: number, col: number };
    skipped: { row: number, col: number };
}

export class MakeKingAction implements Action {
    readonly type = MAKE_KING;
    payload: Piece;
}

export type Actions = DisplayPieceAction | MovePieceAction | JumpPieceAction | MakeKingAction;

export function pieces(state: State = [], action: Actions): State {
    switch (action.type) {

        case DISPLAY_PIECES:
        return action.payload;

        case MOVE_PIECES:
            const piece = state.find((p) => {
                if (p.row === action.origin.row && p.col === action.origin.col) {
                    return true;
                }
                return false;
            });
            if (piece) {
                piece.row = action.destination.row;
                piece.col = action.destination.col;
            }
            return state;

        case JUMP_PIECES:
            const skippedPiece = state.find((p) => {
                if (p.row === action.skipped.row && p.col === action.skipped.col) {
                    return true;
                }
                return false;
            });
            if (skippedPiece) {
                skippedPiece.color = 'null';
            }
            return state;

        case MAKE_KING:
            action.payload.isKing = true;
            return state;

        default:
            return state;
    }
}
