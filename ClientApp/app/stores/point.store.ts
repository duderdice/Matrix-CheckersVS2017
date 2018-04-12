import { Action } from '@ngrx/store';
import { Point } from '../models/point';


export type State = Array<Point>;

export const DISPLAY_POINTS = 'DISPLAY_POINTS';
export const ADD_POINTS = 'ADD_POINTS';


export class DisplayPointAction implements Action {
    readonly type = DISPLAY_POINTS;
    payload: Array<Point>;
}
export class AddPointAction implements Action {
    readonly type = ADD_POINTS;
    player: string;
}



export type Actions = DisplayPointAction | AddPointAction ;

export function points(state: State = [], action: Actions): State {
    switch (action.type) {

        case DISPLAY_POINTS:
            return action.payload;

        case ADD_POINTS:
            if (action.player === 'red') {
                state[0].count += 1;
            } else if (action.player === 'black') {
                state[1].count += 1;
            }
            console.log(state);
            return state;

         default:
            return state;
    }
}
