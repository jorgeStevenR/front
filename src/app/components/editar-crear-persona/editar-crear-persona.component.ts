import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Persona } from '../../models/persona';
import { PersonaService } from '../../services/persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-crear-persona',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-crear-persona.component.html',
  styleUrls: ['./editar-crear-persona.component.scss']
})
export class EditarCrearPersonaComponent {
  @Input() persona: Persona = { nombre: '', apellido: '', correo: '' };

  constructor(
    private personaService: PersonaService,
    private router: Router
  ) {}

  guardarPersona(): void {
    if (this.persona.id) {
      // Editar
      this.personaService.updatePersona(this.persona.id, this.persona).subscribe({
        next: () => this.router.navigate(['/lista']),
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      // Crear
      this.personaService.createPersona(this.persona).subscribe({
        next: () => this.router.navigate(['/lista']),
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }
}
