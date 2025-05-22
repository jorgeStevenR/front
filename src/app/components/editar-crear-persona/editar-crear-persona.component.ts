import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../../models/persona';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-editar-crear-persona',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-crear-persona.component.html',
  styleUrls: ['./editar-crear-persona.component.scss']
})
export class EditarCrearPersonaComponent implements OnInit {
  persona: Persona = { nombre: '', apellido: '', correo: '' };
  mostrarMensajeExito: boolean = false;
  errorMensaje: string | null = null;

  constructor(
    private personaService: PersonaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Cargar datos para edición
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.cargarPersona(id);
    }
  }

  private cargarPersona(id: number): void {
    this.personaService.getPersona(id).subscribe({
      next: (data) => this.persona = data,
      error: (err) => console.error('Error cargando persona:', err)
    });
  }

  guardarPersona(): void {
    this.errorMensaje = null;

    if (!this.validarCampos()) return;

    if (this.persona.id) {
      this.actualizarPersona();
    } else {
      this.crearPersona();
    }
  }

  private validarCampos(): boolean {
    if (!this.persona.nombre?.trim()) {
      this.errorMensaje = 'El nombre es requerido';
      return false;
    }

    if (!this.persona.apellido?.trim()) {
      this.errorMensaje = 'El apellido es requerido';
      return false;
    }

    if (!this.validarEmail(this.persona.correo)) {
      this.errorMensaje = 'Ingrese un correo válido';
      return false;
    }

    return true;
  }

  private validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  private crearPersona(): void {
    this.personaService.createPersona(this.persona).subscribe({
      next: () => this.manejarExito('creada'),
      error: (err) => this.manejarError(err)
    });
  }

  private actualizarPersona(): void {
    this.personaService.updatePersona(this.persona.id!, this.persona).subscribe({
      next: () => this.manejarExito('actualizada'),
      error: (err) => this.manejarError(err)
    });
  }

  private manejarExito(accion: string): void {
    this.mostrarMensajeExito = true;
    setTimeout(() => {
      this.router.navigate(['/lista']);
      this.mostrarMensajeExito = false;
    }, 2000);
  }

  private manejarError(err: any): void {
    console.error('Error:', err);
    this.errorMensaje = 'Ocurrió un error. Intente nuevamente.';
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }
}