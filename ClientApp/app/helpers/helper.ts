import { Piece } from '../models/game-piece';

export class Helper {

    public findSelectedPiece(row: number, col: number, pieces: Array<Piece>): Piece | false {
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].row === row && pieces[i].col === col) {
                const requiredPiece = pieces[i];
                return requiredPiece;
            }

        }
        return false;
    }

    public findEmptySpace(row: number, col: number, pieces: Array<Piece>): boolean | undefined {
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].row !== row && pieces[i].col !== col) {
                return true;
            }
        }
    }

    public checkIfPieceSelectedCanBeKing(piece: Piece, row: number): boolean {
        if (piece.color === 'red' && row === 7) {
            return true;
        } else if (piece.color === 'black' && row === 0) {
            return true;
        }
        return false;
    }
}

