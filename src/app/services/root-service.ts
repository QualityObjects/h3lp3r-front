import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


const PATH = `${environment.url_base}`;

@Injectable({
    providedIn: 'root'
  })
export class RootService {

    constructor(private http: HttpClient) {
    }

    public remoteIp(): Observable<string> {
        return this.http.get(`${PATH}/ip`, {responseType: "text"});
    }

}
