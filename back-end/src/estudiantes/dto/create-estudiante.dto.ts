import { IsDate, IsIn, IsNotEmpty, IsString, Matches, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreateEstudianteDTO {
    @IsString({ message: 'El nombre del alumno debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El nombre del alumno no puede estar vacío.' })
    nombreAlumno: string;
    @Type(() => Date)//transforma cadena a un objeto Date
    @IsDate({ message: 'Debe ser una fecha válida.' })
    @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacía.' })
    fechaNacimiento: Date;
    @IsString({ message: 'El nombre del padre deber ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El nombre del padre no puede estar vacío.' })
    nombrePadre: string;
    @IsString({ message: 'El nombre de la madre deber ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El nombre de la madre no puede estar vacío.' })
    nombreMadre: string;
    @IsString({ message: 'El grado debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El grado no puede estar vacío' })
    @IsIn(['1ro', '2do', '3ro', '4to', '5to', '6to', '7mo', '8vo', '9no', '10mo', '11vo', '12mo'], { message: 'El grado debe ser uno de los grados escolares válidos.' })
    gradoAcademico: string;
    @IsString({ message: 'La sección debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'La sección no puede estar vacía.' })
    @Matches(/^[A-Z0-9]+$/, { message: 'La sección solo puede contener letras mayúsculas o números.' })
    seccion: string;
    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: 'La fecha de ingreso debe ser una fecha válida.' })
    fechaIngreso?: Date;
}