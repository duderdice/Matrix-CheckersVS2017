import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import * as Constants from '../constants/constants';
import { Point } from '../models/point';

@Injectable()
export class MockPointInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method === 'GET' && req.url === `${Constants.ApiBaseUrl}/points`) {
            const pointResponse = this.getPoints();
            const response = new HttpResponse({
                body: pointResponse
            });
            return Observable.of(response);
        }
        return next.handle(req);
    }

    getPoints(): Array<Point> {
        const points = [
            {
            'color': 'red',
            'count':0
        }, 
        {
            'color': 'black',
            'count': 0
            }];
        return points;
    }


}
