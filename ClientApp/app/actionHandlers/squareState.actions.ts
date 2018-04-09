import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Square } from '../models/square';
import { HIGHLIGHT_SQUARES, UNHIGHLIGHT_SQUARES } from '../stores/squares.store';

@Injectable()
export class SquareStateActions {
    private pieces: Array<Square>;

    constructor(
        private _store: Store<any>,
    ) { }

    public availableMoves(first: any, second: any): void {
        this._store.dispatch({
            type: HIGHLIGHT_SQUARES,
            firstOption: first,
            secondOption: second,
        });
    }

    public unhighlightSquares(): void {
        this._store.dispatch({
            type: UNHIGHLIGHT_SQUARES
        });
    }
}
