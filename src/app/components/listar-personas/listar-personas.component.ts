import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../models/persona'; 
import { ChangeDetectorRef } from '@angular/core';

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

  // Variables para el formulario manual de envío PDF
  idEnviarPdf: number | null = null;
  correoEnviarPdf: string = '';

  constructor(private personaService: PersonaService) {}

  ngOnInit(): void {
    this.cargarPersonas();
  }

  cargarPersonas(): void {
    this.personaService.getPersonas().subscribe({
      next: (data) => {
        console.log('Personas cargadas:', data);  
        this.personas = data;
      },
      error: (err) => console.error('Error al cargar:', err)
    });
  }

  eliminarPersona(id: number): void {
    this.personaService.deletePersona(id).subscribe({
      next: () => {
        console.log('Eliminado correctamente, recargando lista...');
        this.cargarPersonas();
      },
      error: (err) => console.error('Error al eliminar:', err)
    });  
  }

  editarPersona(persona: Persona): void {
    this.personaEditando = { ...persona };
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

  enviarPdfPorEmail(id: number, correo: string) {
    if (!correo) {
      alert('La persona no tiene correo asignado');
      return;
    }

    this.personaService.generarPdfYEnviarEmail(id, correo).subscribe({
      next: (mensaje) => alert(mensaje),
      error: (err) => {
        console.error('Error enviando PDF:', err);
        alert('Error enviando el PDF. Intenta nuevamente.');
      }
    });
  }

  // Método para enviar PDF usando el formulario manual
  enviarPdfPorEmailManual() {
    if (this.idEnviarPdf == null || this.idEnviarPdf <= 0) {
      alert('Por favor ingresa un ID válido');
      return;
    }
    if (!this.correoEnviarPdf || this.correoEnviarPdf.trim() === '') {
      alert('Por favor ingresa un correo válido');
      return;
    }

    this.enviarPdfPorEmail(this.idEnviarPdf, this.correoEnviarPdf);
  }
}