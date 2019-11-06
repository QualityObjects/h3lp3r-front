import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OpResponse } from '../domain/responses';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';


const PATH = `${environment.url_base}/random`;

@Injectable()
export class RandomService {

  constructor(private http: HttpClient) {
  }

  public number(num_type: 'int' | 'decimal', min?: number, max?: number): Observable<OpResponse> {
    let params = new HttpParams();

    (min !== undefined) && (params = params.append("min", `${min}`));
    (max !== undefined) && (params = params.append("max", `${max}`));

    return this.http.get<OpResponse>(`${PATH}/number/${num_type}`, { params: params });
  }


  public names(total: number = 1, lang?: string, gender?: string): Observable<OpResponse> {
    let params = new HttpParams();
    params = params.append("total", `${total}`);

    (lang !== undefined) && (params = params.append("lang", lang));
    (gender !== undefined) && (params = params.append("gender", lang));

    return this.http.get<OpResponse>(`${PATH}/names`, { params: params });
  }

}
