import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OpResponse } from '../domain/responses';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';


const PATH = `${environment.url_base}/random`;

@Injectable({
  providedIn: 'root'
})
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

    (lang != null) && (params = params.append("lang", lang));
    (gender != null) && (params = params.append("gender", gender));

    return this.http.get<OpResponse>(`${PATH}/names`, { params: params });
  }

  public askOracle(questionType: 'YES_NO' | 'YES_NO_MAYBE', question?: string): Observable<OpResponse> {
    let params = new HttpParams();
    params = params.append("type", questionType);

    (!!question) && (params = params.append("question", question));

    return this.http.get<OpResponse>(`${PATH}/oracle`, { params: params });
  }

}
