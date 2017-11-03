import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { PersonaService } from './persona.service';
import { Persona } from './persona';
@Component({
  selector: 'persona-detail',
  templateUrl: './persona-detail.component.html',
  styleUrls: [ './detail.component.css' ]
})

export class PersonaDetailComponent implements OnInit {
  persona: Persona;
  constructor(
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.personaService.getPersona(+params.get('id')))
      .subscribe(persona => this.persona = persona);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.personaService.update(this.persona)
      .then(() => this.goBack());
  }
}
