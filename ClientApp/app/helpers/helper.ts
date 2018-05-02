﻿import { Piece } from '../models/game-piece';
import { Position } from '../models/position';
import * as Constants from '../constants/constants';

export class Helper {

    public skippedPosition: Position;

    public findSelectedPiece(row: number, col: number, pieces: Array<Piece>): Piece | false {
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].row === row && pieces[i].col === col) {
                const requiredPiece = pieces[i];
                return requiredPiece;
            }
        }
        return false;
    }

    public checkIfPieceSelectedCanBeKing(piece: Piece, row: number): boolean {
        if (piece.color === Constants.ColorForFirstPlayer && row === 7) {
            return true;
        } else if (piece.color === Constants.ColorForSecondPlayer && row === 0) {
            return true;
        }
        return false;
    }

    public checkIfMoveCorrectForRed(pieceSelected: Piece, from: Position, to: Position) {
        if (!pieceSelected.isKing) {
            if (to.row > from.row) {
                if (from.column === to.column - 1 || from.column === to.column + 1) {
                    return true;
                }
            }
        } else if (pieceSelected.isKing) {
            if (to.row > from.row || to.row < from.row) {
                if (from.column === to.column - 1 || from.column === to.column + 1) {
                    return true;
                }
            }
        }
    }

    public checkIfMoveCorrectForBlack(pieceSelected: Piece, from: Position, to: Position) {
        if (!pieceSelected.isKing) {
            if (to.row < from.row) {
                if (from.column === to.column - 1 || from.column === to.column + 1) {
                    return true;
                }
            }

        } else if (pieceSelected.isKing) {
            if (to.row < from.row || to.row > from.row) {
                if (from.column === to.column - 1 || from.column === to.column + 1) {
                    return true;
                }
            }
        }
    }

    public ifPieceNotKingSkippedPositionCaseOne(from: Position) {
        this.skippedPosition = {
            row: from.row + 1,
            column: from.column + 1
        };
        return this.skippedPosition;
    }

    public ifPieceNotKingSkippedPositionCaseTwo(from: Position) {
        this.skippedPosition = {
            row: from.row + 1,
            column: from.column - 1
        };
        return this.skippedPosition;
    }

    public ifPieceNotKingSkippedPositionCaseThree(from: Position) {
        this.skippedPosition = {
            row: from.row - 1,
            column: from.column + 1
        };
        return this.skippedPosition;
    }

    public ifPieceNotKingSkippedPositionCaseFour(from: Position) {
        this.skippedPosition = {
            row: from.row - 1,
            column: from.column - 1
        };
        return this.skippedPosition;
    }

    public ifPieceKingSkippedPositionCaseOne(from: Position) {
        this.skippedPosition = {
            row: from.row + 1,
            column: from.column + 1
        };
        return this.skippedPosition;
    }

    public ifPieceKingSkippedPositionCaseTwo(from: Position) {
        this.skippedPosition = {
            row: from.row + 1,
            column: from.column - 1
        };
        return this.skippedPosition;
    }

    public ifPieceKingSkippedPositionCaseThree(from: Position) {
        this.skippedPosition = {
            row: from.row - 1,
            column: from.column - 1
        };
        return this.skippedPosition;
    }

    public ifPieceKingSkippedPositionCaseFour(from: Position) {
        this.skippedPosition = {
            row: from.row - 1,
            column: from.column - 1
        };
        return this.skippedPosition;
    }
}

