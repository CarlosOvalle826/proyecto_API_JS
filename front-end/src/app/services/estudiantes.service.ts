import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateEstudianteDTO {
  nombreAlumno: string;
  fechaNacimiento: string; // Usaremos string para enviar (ISO)
  nombrePadre: string;
  nombreMadre: string;
  gradoAcademico: string;
  seccion: string;
  fechaIngreso?: string; // Usaremos string para enviar (ISO)
}

export interface Estudiante {
  _id: string;
  nombreAlumno: string;
  fechaNacimiento: string;
  nombrePadre: string;
  nombreMadre: string;
  gradoAcademico: string;
  seccion: string;
  fechaIngreso?: string;
}

interface ApiResponse<T> {
  message: string;
  data: T;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  private apiUrl = 'http://localhost:3000/api';
  private authHeaders: HttpHeaders;
  constructor(private http: HttpClient) {
    const username = 'admin';
    const password = 'secretpass1942';
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

    this.authHeaders = new HttpHeaders().set('Authorization', basicAuth);
  }
  createStudent(studentData: CreateEstudianteDTO): Observable<ApiResponse<Estudiante>> {
    return this.http.post<ApiResponse<Estudiante>>(`${this.apiUrl}/crear-alumno`, studentData, { headers: this.authHeaders });
  }

  getStudentsByGrado(grado: string): Observable<ApiResponse<Estudiante[]>> {
    return this.http.get<ApiResponse<Estudiante[]>>(`${this.apiUrl}/consultar-alumno/${grado}`, {
      headers: this.authHeaders
    });
  }
}
