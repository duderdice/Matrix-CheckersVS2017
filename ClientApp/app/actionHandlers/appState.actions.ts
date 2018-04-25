import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as Constants from '../constants/constants';
import { UPDATE_APP_STATE } from '../stores/appState.store';


@Injectable()
export class AppStateActions {

    constructor(
        private _store: Store<any>
    ) { }

    public updateState(stateChanges: object): void {
        this._store.dispatch(
            {
                type: UPDATE_APP_STATE,
                payload: stateChanges
            }
        );
    }
}