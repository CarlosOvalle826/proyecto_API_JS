import { Prop, Schema, SchemaFactory}from'@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
export type DocumentoEstudiante = HydratedDocument<Estudiante>;
@Schema()
export class Estudiante{
    @Prop({required: true})
    nombreAlumno: string;
    @Prop({required: true})
    fechaNacimineto: Date;
    @Prop({required: true})
    nombrePadre: string;
    @Prop({required: true})
    nombreMadre: string;
    @Prop({required: true})
    gradoAcademico: string;
    @Prop({required: true})
    seccion: string;
    @Prop({required: true, default: Date.now})
    fechaIngreso: Date;
}
export const EsquemaEstudiante = SchemaFactory.createForClass(Estudiante);