import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { PersonaDetailComponent } from './persona-detail.component';
import { PersonasComponent }     from './personas.component';
import { PersonaService }         from './persona.service';
import { RouterModule }   from '@angular/router';
import { AppRoutingModule }     from './app-routing.module';
import { PersonaSearchComponent } from './persona-search.component';

import { CategoriaDetailComponent } from './categoria-detail.component';
import { CategoriasComponent }     from './categorias.component';
import { CategoriaService }         from './categoria.service';
import { CategoriaSearchComponent } from './categoria-search.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaDetailComponent,
    PersonasComponent,
    PersonaSearchComponent,
    CategoriaDetailComponent,
    CategoriasComponent,
    CategoriaSearchComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
   // InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  providers: [PersonaService, CategoriaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
