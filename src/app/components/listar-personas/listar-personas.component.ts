import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-listar-personas',
  templateUrl: './listar-personas.component.html',
  styleUrls: ['./listar-personas.component.scss'] // Usa SCSS
})
export class ListarPersonasComponent implements OnInit {
  personas: any[] = [];

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.cargarPersonas();
  }

  cargarPersonas(): void {
    this.personaService.getPersonas().subscribe(
      (data) => {
        this.personas = data;
      },
      (error) => {
        console.error('Error al cargar personas:', error);
      }
    );
  }

  eliminarPersona(id: number): void {
    this.personaService.deletePersona(id).subscribe(
      () => {
        this.cargarPersonas(); // Recargar la lista
      },
      (error) => console.error('Error al eliminar:', error)
    );
  }
}