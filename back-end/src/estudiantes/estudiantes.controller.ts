import { Body, Controller, Get, Post, Param, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { Estudiante } from './schemas/estudiante.schema';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { userInfo } from 'node:os';
@Controller('estudiantes')
class CreateEstudianteDTO {
    nombreAlumno: string;
    fechaNacimiento: Date;
    nombrePadre: string;
    nombreMadre: string;
    gradoAcademico: string;
    seccion: string;
    fechaIngreso?: Date;
}
@Controller('api')
export class EstudiantesController {
    constructor(private readonly estudiantesService: EstudiantesService) {}
    //endpoint para crear alumno, ruta: POST /api/crear-alumno
    //autentificación
    @UseGuards(AuthGuard('basic'))
    @Post('crear-alumno')
    async create(@Body() CreateEstudianteDTO: CreateEstudianteDTO, @Res() res: Response) {
        try {
            const createdEstudiante = await this.estudiantesService.create(CreateEstudianteDTO);
            return res.status(HttpStatus.CREATED).json({
                message: 'Alumno creado exitosamente',
                data: createdEstudiante,
            });
        } catch (error) {
            console.error('Error al crear alumno', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Error al crear alumno',
                error: error.message,
            });
        }
    }
    //endpoint para consulta de alumnos, ruta: GET /api/consultar-alumno/{grado}
    //aplicar autentificación
    @UseGuards(AuthGuard('basic'))
    @Get('consultar-alumno/:grado')
    async findByGrado(@Param('grado') grado: string, @Res() res: Response){
        try{
            const estudiantes = await this.estudiantesService.findByGrado(grado);
            if(estudiantes.length===0){
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: `No se encontraron alumnos para el grado ${grado}`,
                    data: [],
                });
            }
            return res.status(HttpStatus.OK).json({
                message: `Alumnos encontrados para el grado ${grado}`,
                data: estudiantes,
            });
        }catch (error){
            console.error('Error al consultar alumnos por grado:', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Error al consultar los alumnos por grado',
                error: error.message,
            });
        }
    }

}