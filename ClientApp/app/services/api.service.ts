import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';

import * as Constants from '../constants/constants';

export const
    REQUEST_TYPE_GET = 'GET',
    REQUEST_TYPE_POST = 'POST';

@Injectable()
export class ApiService {

    constructor(
        private _http: HttpClient

    ) { }

    public callApiService<T>(req: HttpRequest<any>): Observable<T> {
        let response : any;
        switch (req.method) {
            case REQUEST_TYPE_GET:
                this._http
                    .get<T>(req.url)
                    .subscribe(
                    (res) => {
                 
                            response = res;
                            return response;
                        },
                        (err) => {
                            response = err;
                            return response;
                        }
                    );
                break;
        }
        return Observable.of(response);
    }

}
