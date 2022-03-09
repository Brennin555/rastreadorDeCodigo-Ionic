import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CorreioService {

  constructor(private http: HttpClient) { }

  localizarObjeto(codigoObjeto: string) {
    let url = 'https://cors-anywhere.herokuapp.com/https://proxyapp.correios.com.br/v1/sro-rastro/' + codigoObjeto;
    //let url = 'https://cors-anywhere.herokuapp.com/https://www.youtube.com/results?search_query=' + codigoObjeto;
    //let url = 'https://cors-anywhere.herokuapp.com/https://www.youtube.com/watch?v=lxHWfCzS5u' + codigoObjeto;

    var header = {
      headers: new HttpHeaders()
        //.set('Content-Type', `aplicattion/json`)
        .set('Content-Type', 'aplicattion/json')
    }
    return this.http.get(url, header).toPromise();
  }
}
