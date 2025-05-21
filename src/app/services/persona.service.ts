import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = 'https://crud-udqj.onrender.com/personas'; // Ajusta si tu endpoint es diferente

  constructor(private http: HttpClient) { }

  // Obtener todas las personas
  getPersonas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear persona
  createPersona(persona: any): Observable<any> {
    return this.http.post(this.apiUrl, persona);
  }

  // Actualizar persona
  updatePersona(id: number, persona: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, persona);
  }

  // Eliminar persona
  deletePersona(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}