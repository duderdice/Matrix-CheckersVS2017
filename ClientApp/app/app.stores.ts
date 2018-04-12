import { compose } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

import { pieces } from './stores/pieces.store';
import { squares } from './stores/squares.store';
import { points } from './stores/point.store';






export const APP_STORES = {
    pieces,
    squares,
    points
};
