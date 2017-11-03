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

import { CategoriaSearchService } from './categoria-search.service';
import { Categoria } from './categoria';

@Component({
  selector: 'categoria-search',
  templateUrl: './categoria-search.component.html',
  styleUrls: [ './search.component.css' ],
  providers: [CategoriaSearchService]
})
export class CategoriaSearchComponent implements OnInit {
  categorias: Observable<Categoria[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private categoriaSearchService: CategoriaSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.categorias = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.categoriaSearchService.search(term)
        // or the observable of empty categorias if there was no search term
        : Observable.of<Categoria[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Categoria[]>([]);
      });
  }

  gotoDetail(categoria: Categoria): void {
    let link = ['/categoria', categoria.id];
    this.router.navigate(link);
  }
}