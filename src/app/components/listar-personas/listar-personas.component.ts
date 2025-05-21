import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../models/persona'; // Asegurar extensión .model

@Component({
  selector: 'app-listar-personas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './listar-personas.component.html',
  styleUrls: ['./listar-personas.component.scss']
})
export class ListarPersonasComponent implements OnInit {
  personas: Persona[] = [];
  personaEditando: Persona | null = null;

  constructor(private personaService: PersonaService) {}

  ngOnInit(): void {
    this.cargarPersonas();
  }

  cargarPersonas(): void {
    this.personaService.getPersonas().subscribe({
      next: (data) => this.personas = data,
      error: (err) => console.error('Error al cargar:', err)
    });
  }

  eliminarPersona(id: number): void {
    if (confirm('¿Eliminar persona?')) {
      this.personaService.deletePersona(id).subscribe({
        next: () => this.cargarPersonas(),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  editarPersona(persona: Persona): void {
    this.personaEditando = { ...persona }; // Clonación correcta
  }

  guardarCambios(): void {
    if (this.personaEditando && this.personaEditando.id) {
      this.personaService.updatePersona(
        this.personaEditando.id, 
        this.personaEditando
      ).subscribe({
        next: () => {
          this.cargarPersonas();
          this.personaEditando = null;
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    }
  }
}