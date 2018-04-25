import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Square } from '../models/square';
import { Piece } from '../models/piece';
import { HIGHLIGHT_SQUARES, UNHIGHLIGHT_SQUARES } from '../stores/squares.store';

@Injectable()
export class SquareStateActions {
    private pieces: Array<Square>;
    public availablePositionOne: { row: number, col: number };
    public availablePositionTwo: { row: number, col: number };

    constructor(
        private _store: Store<any>,
    ) { }

    public availableMoves(position: any, pieceSelected: any): void {
        if (pieceSelected.color === 'red') {
            this.availablePositionOne = {
                row: position.row + 1,
                col: position.col + 1
            };
            this.availablePositionTwo = {
                row: position.row + 1,
                col: position.col - 1
            };
        } else if (pieceSelected.color === 'black') {
            this.availablePositionOne = {
                row: position.row - 1,
                col: position.col + 1
            };
            this.availablePositionTwo = {
                row: position.row - 1,
                col: position.col - 1
            };
        }
        this._store.dispatch({
            type: HIGHLIGHT_SQUARES,
            firstOption: this.availablePositionOne,
            secondOption: this.availablePositionTwo,
        });
    }
    //public availableMoves(first: any, second: any): void {
    //    this._store.dispatch({
    //        type: HIGHLIGHT_SQUARES,
    //        firstOption: first,
    //        secondOption: second,
    //    });
    //}

    public unhighlightSquares(): void {
        this._store.dispatch({
            type: UNHIGHLIGHT_SQUARES
        });
    }
}
