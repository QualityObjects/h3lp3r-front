import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OpResponse } from '../domain/responses';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';


const PATH = `${environment.url_base}/hash`;

@Injectable({
    providedIn: 'root'
  })
export class HashService {

    constructor(private http: HttpClient) {
    }


    public hash(algorithm: string, source_text: string): Observable<OpResponse> {
        let params = new HttpParams({
            fromObject: {
                text: source_text
            }
        });
        return this.http.get<OpResponse>(`${PATH}/${algorithm}`, { params: params });
    }

}
