import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OpResponse } from '../domain/responses';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';


const PATH = `${environment.url_base}/base`;

@Injectable()
export class BaseEncodingService {

  constructor(private http: HttpClient) {
  }

  public base64(action: 'encode' | 'decode', source_text: string): Observable<OpResponse> {
    let params = new HttpParams({
      fromObject: {
        text: source_text
      }
    });
    return this.http.get<OpResponse>(`${PATH}/64/${action}`, { params: params });
  }

}
