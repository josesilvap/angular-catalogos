import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Persona }           from './persona';

@Injectable()
export class PersonaSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Persona[]> {
    return this.http
               .get(`api/personas/?name=${term}`)
               .map(response => response.json().data as Persona[]);
  }
}