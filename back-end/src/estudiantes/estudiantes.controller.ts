import { Body, Controller, Get, Post, Param, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { Estudiante } from './schemas/estudiante.schema';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { userInfo } from 'node:os';
import { CreateEstudianteDTO } from './dto/create-estudiante.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBasicAuth } from '@nestjs/swagger';
@ApiTags('Estudiantes')
@ApiBasicAuth('BasicAuth')
@Controller()
export class EstudiantesController {
    constructor(private readonly estudiantesService: EstudiantesService) { }
    //endpoint para crear alumno, ruta: POST /api/crear-alumno
    //autentificación
    @UseGuards(AuthGuard('basic'))
    @Post('crear-alumno')
    @ApiOperation({ summary: 'Crea un nuevo alumno en la base de datos' }) // Descripción de la operación
    @ApiBody({ type: CreateEstudianteDTO, description: 'Datos del alumno a crear' }) // Describe el cuerpo de la solicitud
    @ApiResponse({ status: 201, description: 'Alumno creado exitosamente', type: Object }) // Tipo de respuesta para 201
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' }) // Respuesta para 400
    @ApiResponse({ status: 401, description: 'No autorizado' }) // Respuesta para 401 (debido a Basic Auth)
    @ApiResponse({ status: 500, description: 'Error interno del servidor' }) // Respuesta para 500
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
    @ApiOperation({ summary: 'Consulta alumnos por grado académico' }) // Descripción de la operación
    @ApiParam({ name: 'grado', description: 'Grado académico a consultar', example: '10mo' }) // Describe un parámetro de ruta
    @ApiResponse({ status: 200, description: 'Alumnos encontrados', type: [Object] }) // Tipo de respuesta para 200 (array de objetos)
    @ApiResponse({ status: 404, description: 'No se encontraron alumnos para el grado especificado' }) // Respuesta para 404
    @ApiResponse({ status: 401, description: 'No autorizado' }) // Respuesta para 401
    @ApiResponse({ status: 500, description: 'Error interno del servidor' }) // Respuesta para 500
    async findByGrado(@Param('grado') grado: string, @Res() res: Response) {
        try {
            const estudiantes = await this.estudiantesService.findByGrado(grado);
            if (estudiantes.length === 0) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: `No se encontraron alumnos para el grado ${grado}`,
                    data: [],
                });
            }
            return res.status(HttpStatus.OK).json({
                message: `Alumnos encontrados para el grado ${grado}`,
                data: estudiantes,
            });
        } catch (error) {
            console.error('Error al consultar alumnos por grado:', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Error al consultar los alumnos por grado',
                error: error.message,
            });
        }
    }

}