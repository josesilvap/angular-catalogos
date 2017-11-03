import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria';
@Component({
  selector: 'categoria-detail',
  templateUrl: './categoria-detail.component.html',
  styleUrls: [ './detail.component.css' ]
})

export class CategoriaDetailComponent implements OnInit {
  categoria: Categoria;
  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.categoriaService.getCategoria(+params.get('id')))
      .subscribe(categoria => this.categoria = categoria);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.categoriaService.update(this.categoria)
      .then(() => this.goBack());
  }
}
