import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Estudiante, DocumentoEstudiante } from './schemas/estudiante.schema';

@Injectable()
export class EstudiantesService {
    constructor(
        @InjectModel(Estudiante.name) private estudianteModel: Model<DocumentoEstudiante>,
    ) { }
    //crear nuevo registro en la base de datos
    async create(estudianteData: Partial<Estudiante>): Promise<Estudiante> {
        const createdEstudiante = new this.estudianteModel(estudianteData);
        return createdEstudiante.save();
    }
    //buscaar alumno por grado
    async findByGrado(gradoAcademico: string): Promise<Estudiante[]> {
        return this.estudianteModel.find({ gradoAcademico }).exec();
    }
}
