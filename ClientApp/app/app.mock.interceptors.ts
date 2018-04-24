import { HTTP_INTERCEPTORS } from '@angular/common/http';
//import { MockPieceInterceptor } from './mocks/piece.interceptor';
//import { MockSquareInterceptor } from './mocks/game-board.interceptor';
import { MockPointInterceptor } from './mocks/point.interceptor';


export const APP_MOCK_INTERCEPTORS = [
   //{ provide: HTTP_INTERCEPTORS, useClass: MockPieceInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: MockSquareInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MockPointInterceptor, multi: true },
];
