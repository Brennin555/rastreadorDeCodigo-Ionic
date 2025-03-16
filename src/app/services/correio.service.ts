import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CorreioService {

  constructor(private http: HttpClient) { }

  localizarObjeto(codigoObjeto: string) {
    let url = 'https://cors-anywhere.herokuapp.com/https://proxyapp.correios.com.br/v1/sro-rastro/' + codigoObjeto;
    var header = {
      headers: new HttpHeaders().set('Content-Type', 'aplicattion/json')
    }

    return this.http.get(url, header).toPromise()
      .then(response => response)
      .catch(error => {
        console.error(error);
        return Promise.resolve({}); // Retorna um objeto vazio em caso de erro
      });
  }
}
