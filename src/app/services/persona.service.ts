import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({ providedIn: 'root' })
export class PersonaService {
  private apiUrl = 'https://crud-udqj.onrender.com/api/persona';

  constructor(private http: HttpClient) {}

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

  // Obtener persona por id
  getPersona(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/obtenerPorId/${id}`);
  }

  // Método para generar PDF y enviar email
  generarPdfYEnviarEmail(id: number, correoDestino: string): Observable<string> {
    const params = new HttpParams().set('correoDestino', correoDestino);
    return this.http.post(
      `${this.apiUrl}/generar-pdf/${id}/enviar-email`,
      null, // No body, solo query params
      { params, responseType: 'text' }
    );
  }
}