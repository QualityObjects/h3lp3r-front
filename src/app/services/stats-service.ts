import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { OperationsByDateRange } from '@app/domain/stats';
import { take } from 'rxjs/operators';


const PATH = `${environment.url_base}/stats`;

@Injectable({
    providedIn: 'root'
  })
export class StatsService {

    constructor(private http: HttpClient) {
    }

    /**
     * 
     * @param since Data in iso format with seconds
     * @param interval Interval in an expressión like: 10m, 30s, 1d, ...
     */
    public getStats(since? : string, interval?: string): Observable<OperationsByDateRange> {
        let params = new HttpParams({
            fromObject: {
                since: since || '',
                interval: interval || ''
            }
        });
        return this.http.get<OperationsByDateRange>(`${PATH}/since_date`, { params: params }).pipe(take(1));
    }

}
