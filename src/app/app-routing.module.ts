import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriasComponent }      from './categorias.component';
import { CategoriaDetailComponent }  from './categoria-detail.component';
import { PersonasComponent }      from './personas.component';
import { PersonaDetailComponent }  from './persona-detail.component';

const routes: Routes = [
  { path: 'persona/:id', component: PersonaDetailComponent },
  { path: 'personas',     component: PersonasComponent },
  { path: 'categoria/:id', component: CategoriaDetailComponent },
  { path: 'categorias',     component: CategoriasComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}