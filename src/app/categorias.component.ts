import { Component, OnInit } from '@angular/core';

import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'my-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  providers: [CategoriaService]
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[];
  selectedCategoria: Categoria;

  constructor(
    private router: Router,
    private categoriaService: CategoriaService) { }

  getCategorias(): void {
    this.categoriaService.getCategorias().then(categorias => this.categorias = categorias);
  }

  ngOnInit(): void {
    this.getCategorias();
  }

  onSelect(categoria: Categoria): void {
    this.selectedCategoria = categoria;
  }
  gotoDetail(): void {
    this.router.navigate(['/categoria', this.selectedCategoria.id]);
  }
  add(name: string, id: string): void { 
    name = name.trim();
    if (!name) { return; }
    this.categoriaService.create(name)
      .then(categoria => {
        /*this.categorias.push(categoria);
        this.selectedCategoria = null;*/
        this.getCategorias();
      });
  }
  toggleModal():void{
    $('.ui.modal').modal("toggle");
  }
  delete(categoria: Categoria): void {
    this.categoriaService
      .delete(categoria.id)
      .then(() => {
        this.categorias = this.categorias.filter(h => h !== categoria);
        if (this.selectedCategoria === categoria) { this.selectedCategoria = null; }
      });
    $('.ui.modal').modal("toggle");
  }
}
