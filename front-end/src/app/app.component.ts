import { Component, OnInit } from '@angular/core';
import { EstudiantesService, Estudiante, CreateEstudianteDTO } from './services/estudiantes.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Gestión de Alumnos';
  newEstudiante: CreateEstudianteDTO = {
    nombreAlumno: '',
    fechaNacimiento: '',
    nombrePadre: '',
    nombreMadre: '',
    gradoAcademico: '1ro',
    seccion: '',
    fechaIngreso: '',
  };
  gradoBuscar: string = '1ro';
  estudiantes: Estudiante[] = [];
  message: string = '';
  error: string = '';
  gradosDisponibles = ['1ro', '2do', '3ro', '4to', '5to', '6to', '7mo', '8vo', '9no', '10mo', '11vo', '12mo'];
  constructor(private estudiantesService: EstudiantesService) { }
  ngOnInit() {
    this.fetchEstudiantesByGrado(); // Cargar alumnos del primer grado al iniciar
  }
  async onCreateSubmit() {
    this.message = '';
    this.error = '';
    try {
      // Asegurarse de que las fechas se envíen en formato ISO
      const payload: CreateEstudianteDTO = {
        ...this.newEstudiante,
        fechaNacimiento: this.newEstudiante.fechaNacimiento ? new Date(this.newEstudiante.fechaNacimiento).toISOString() : '',
        fechaIngreso: this.newEstudiante.fechaIngreso ? new Date(this.newEstudiante.fechaIngreso).toISOString() : undefined,
      };

      const response = await this.estudiantesService.createStudent(payload).toPromise();
      if (response) { // <-- ¡Añade esta verificación!
        this.message = response.message;
        this.resetCreateForm();
        this.fetchEstudiantesByGrado();
      } else {
        // Manejar caso donde la respuesta es inesperadamente undefined
        this.error = 'Error: No se recibió respuesta del servidor.';
      }
    } catch (err: any) {
      console.error(err);
      if (err.error && err.error.message) {
        this.error = `Error al crear alumno: ${JSON.stringify(err.error.message)}`;
      } else {
        this.error = 'Error desconocido al crear alumno.';
      }
    }
  }
  async fetchEstudiantesByGrado() {
    this.estudiantes = [];
    this.message = '';
    this.error = '';
    try {
      const response = await this.estudiantesService.getStudentsByGrado(this.gradoBuscar).toPromise();
      if (response && response.data) { // <-- ¡Añade esta verificación!
            if (response.data.length === 0) {
              this.message = `No se encontraron alumnos para el grado ${this.gradoBuscar}.`;
            } else {
              this.estudiantes = response.data;
              this.message = `Alumnos encontrados para el grado ${this.gradoBuscar}.`;
            }
          } else {
            // Manejar caso donde la respuesta es inesperadamente undefined o data no existe
            this.error = 'Error: No se pudieron cargar los datos de alumnos.';
          }
    } catch (err: any) {
      console.error(err);
      if (err.error && err.error.message) {
        this.error = `Error al consultar alumnos: ${JSON.stringify(err.error.message)}`;
      } else {
        this.error = 'Error desconocido al consultar alumnos.';
      }
    }
  }

  resetCreateForm() {
    this.newEstudiante = {
      nombreAlumno: '',
      fechaNacimiento: '',
      nombrePadre: '',
      nombreMadre: '',
      gradoAcademico: '1ro',
      seccion: '',
      fechaIngreso: '',
    };
  }
}
