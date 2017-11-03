import { Injectable } from '@angular/core';

import { Persona } from './persona';
import 'rxjs/add/operator/toPromise';
import { Http, Headers } from '@angular/http';

@Injectable()
export class PersonaService {
  private personasUrl = 'http://localhost:8080/personas';  // URL to web api
  
 constructor(private http: Http) { }
  
 getPersonas(): Promise<Persona[]> {
   return this.http.get(this.personasUrl)
              .toPromise()
              .then(response => response.json() as Persona[])
              .catch(this.handleError);
 }
  
 private handleError(error: any): Promise<any> {
   console.error('An error occurred', error); // for demo purposes only
   return Promise.reject(error.message || error);
 }
  getPersona(id: number): Promise<Persona> {
    const url = `${this.personasUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Persona)
      .catch(this.handleError);
  }
  private headers = new Headers({'Content-Type': 'application/json'});
  
  update(persona: Persona): Promise<Persona> {
    const url = `${this.personasUrl}/${persona.id}`;
    return this.http
      .put(url, JSON.stringify(persona), {headers: this.headers})
      .toPromise()
      .then(() => persona)
      .catch(this.handleError);
  }
  create(firstName: string, lastName: string): Promise<Persona> {
    let p= new Persona();
    p.id=0;
    p.firstName=firstName;
    p.lastName=lastName;

    return this.http
      .post(this.personasUrl, JSON.stringify(p), {headers: this.headers})
      .toPromise()
      .then(res => {})
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    const url = `${this.personasUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}