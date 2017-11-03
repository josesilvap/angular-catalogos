import { Component, OnInit } from '@angular/core';

import { Persona } from './persona';
import { PersonaService } from './persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
  providers: [PersonaService]
})
export class PersonasComponent implements OnInit {
  personas: Persona[];
  selectedPersona: Persona;

  constructor(
    private router: Router,
    private personaService: PersonaService) { }

  getPersonas(): void {
    this.personaService.getPersonas().then(personas => this.personas = personas);
  }

  ngOnInit(): void {
    this.getPersonas();
  }

  onSelect(persona: Persona): void {
    this.selectedPersona = persona;
  }
  gotoDetail(): void {
    this.router.navigate(['/persona', this.selectedPersona.id]);
  }
  add(firstName: string, lastName: string): void {
    
    if (!firstName) { return; }
    this.personaService.create(firstName,lastName)
      .then(persona => {
        //this.personas.push(persona);
        this.selectedPersona = null;
        this.getPersonas();
      });
  }
  delete(persona: Persona): void {
    this.personaService
      .delete(persona.id)
      .then(() => {
        this.personas = this.personas.filter(h => h !== persona);
        if (this.selectedPersona === persona) { this.selectedPersona = null; }
      });
  }
}
