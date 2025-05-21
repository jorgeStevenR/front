import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona'; // Asegúrate de que la ruta del modelo sea correcta

@Injectable({ providedIn: 'root' })
export class PersonaService {
  private apiUrl = 'https://crud-udqj.onrender.com/api/persona'; // URL base del backend

  constructor(private http: HttpClient) { }

  // Obtener todas las personas
  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiUrl}/ListaDePersonas`);
  }

  // Crear persona
  createPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.apiUrl}/guardar`, persona);
  }

  // Actualizar persona
  updatePersona(id: number, persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.apiUrl}/actualizar/${id}`, persona);
  }

  // Eliminar persona
  deletePersona(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminarPersona/${id}`);
  }
}
