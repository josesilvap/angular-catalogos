import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { PersonaSearchService } from './persona-search.service';
import { Persona } from './persona';

@Component({
  selector: 'persona-search',
  templateUrl: './persona-search.component.html',
  styleUrls: [ './search.component.css' ],
  providers: [PersonaSearchService]
})
export class PersonaSearchComponent implements OnInit {
  personas: Observable<Persona[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private personaSearchService: PersonaSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.personas = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.personaSearchService.search(term)
        // or the observable of empty personas if there was no search term
        : Observable.of<Persona[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Persona[]>([]);
      });
  }

  gotoDetail(persona: Persona): void {
    let link = ['/persona', persona.id];
    this.router.navigate(link);
  }
}