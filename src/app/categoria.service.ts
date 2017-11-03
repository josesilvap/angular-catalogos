import { Injectable } from '@angular/core';

import { Categoria } from './categoria';
import 'rxjs/add/operator/toPromise';
import { Http, Headers } from '@angular/http';

@Injectable()
export class CategoriaService {
  private categoriasUrl = 'http://localhost:8080/categories';  // URL to web api
  
 constructor(private http: Http) { }
  
 getCategorias(): Promise<Categoria[]> {
   return this.http.get(this.categoriasUrl)
              .toPromise()
              .then(response => response.json() as Categoria[])
              .catch(this.handleError);
 }
  
 private handleError(error: any): Promise<any> {
   console.error('An error occurred', error); // for demo purposes only
   return Promise.reject(error.message || error);
 }
  getCategoria(id: number): Promise<Categoria> {
    const url = `${this.categoriasUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Categoria)
      .catch(this.handleError);
  }
  private headers = new Headers({'Content-Type': 'application/json'});
  
  update(categoria: Categoria): Promise<Categoria> {
    const url = `${this.categoriasUrl}/${categoria.id}`;
    return this.http
      .put(url, JSON.stringify(categoria), {headers: this.headers})
      .toPromise()
      .then(() => categoria)
      .catch(this.handleError);
  }
  create(name: string): Promise<Categoria> {
    let c = new Categoria();
    c.id = 0;
    c.name = name;
    return this.http
      .post(this.categoriasUrl, JSON.stringify(c), {headers: this.headers})
      .toPromise()
      .then(res => {})
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    const url = `${this.categoriasUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}