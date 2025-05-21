import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Corregido: 'router' no 'routes'
import { PersonaService } from '../../services/persona.service'; // Nombre correcto del servicio

@Component({
  selector: 'app-crear-persona', // Corregido: sin guión extra
  standalone: true,
  imports: [CommonModule, FormsModule], // Corregido: imports como array
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.scss'] // Corregido: "styleUrls"
})
export class CrearPersonaComponent {
  nuevaPersona = { 
    nombre: '', 
    apellido: '', // Campo faltante
    correo: ''    // Nombre correcto (no "email")
  };

  constructor(
    private personaService: PersonaService, // Nombre correcto del servicio
    private router: Router
  ) {}

  crearPersona(): void { // Corregido: sintaxis del método
    this.personaService.createPersona(this.nuevaPersona).subscribe({
      next: () => this.router.navigate(['/lista']), // Redirige a la lista
      error: (err) => console.error('Error al crear:', err)
    });
  }
}