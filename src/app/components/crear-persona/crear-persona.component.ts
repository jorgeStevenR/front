import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../models/persona';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-persona',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.scss']
})
export class CrearPersonaComponent {
  nuevaPersona: Persona = { 
    nombre: '', 
    apellido: '', 
    correo: '' 
  };
  mostrarMensajeExito: boolean = false;
  errorMensaje: string | null = null;

  constructor(
    private personaService: PersonaService,
    private router: Router // Cambiado a private
  ) {}

  // Método nuevo añadido
  cancelar(): void {
    this.router.navigate(['/lista']);
  }

  crearPersona(): void {
    this.errorMensaje = null;
    
    if (!this.validarCampos()) return;

    this.personaService.createPersona(this.nuevaPersona).subscribe({
      next: () => this.manejarExito(),
      error: (err) => this.manejarError(err)
    });
  }

  private validarCampos(): boolean {
    if (!this.nuevaPersona.nombre?.trim()) {
      this.errorMensaje = 'El nombre es requerido';
      return false;
    }

    if (!this.nuevaPersona.apellido?.trim()) {
      this.errorMensaje = 'El apellido es requerido';
      return false;
    }

    if (!this.validarEmail(this.nuevaPersona.correo)) {
      this.errorMensaje = 'Ingrese un correo válido';
      return false;
    }

    return true;
  }

  private validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  private manejarExito(): void {
    this.mostrarMensajeExito = true;
    setTimeout(() => {
      this.router.navigate(['/lista']);
      this.resetFormulario();
    }, 2000);
  }

  private manejarError(err: any): void {
    console.error('Error:', err);
    this.errorMensaje = 'Error al crear la persona. Intente nuevamente.';
  }

  private resetFormulario(): void {
    this.nuevaPersona = { nombre: '', apellido: '', correo: '' };
    this.mostrarMensajeExito = false;
  }
}