import { IsDate, IsIn, IsNotEmpty, IsString, Matches, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEstudianteDTO {
    @ApiProperty({
        description: 'Nombre completo del alumno',
        example: 'Carlos Fernando Ovalle Lúc',
    })
    @IsString({ message: 'El nombre del alumno debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El nombre del alumno no puede estar vacío.' })
    nombreAlumno: string;
    @ApiProperty({
        description: 'Fecha de nacimiento del alumno (formato ISO 8601)',
        example: '2012-07-20T00:00:00.000Z',
        type: String, // Se indica String porque el input es una cadena de fecha
        format: 'date-time'
    })
    @Type(() => Date)//transforma cadena a un objeto Date
    @IsDate({ message: 'Debe ser una fecha válida.' })
    @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacía.' })
    fechaNacimiento: Date;
    @ApiProperty({
        description: 'Nombre completo del padre o encargado',
        example: 'Carlos Enrique',
    })
    @IsString({ message: 'El nombre del padre deber ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El nombre del padre no puede estar vacío.' })
    nombrePadre: string;
    @ApiProperty({
        description: 'Nombre completo de la madre o encargada',
        example: 'Rosa Catarina',
    })
    @IsString({ message: 'El nombre de la madre deber ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El nombre de la madre no puede estar vacío.' })
    nombreMadre: string;
    @ApiProperty({
        description: 'Grado académico del alumno (ejemplo. "1ro", "5to", "12mo")',
        enum: ['1ro', '2do', '3ro', '4to', '5to', '6to', '7mo', '8vo', '9no', '10mo', '11vo', '12mo'],
        example: '12mo',
    })
    @IsString({ message: 'El grado debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El grado no puede estar vacío' })
    @IsIn(['1ro', '2do', '3ro', '4to', '5to', '6to', '7mo', '8vo', '9no', '10mo', '11vo', '12mo'], { message: 'El grado debe ser uno de los grados escolares válidos.' })
    gradoAcademico: string;
    @ApiProperty({
        description: 'Sección del grado (ejemplo. "A", "B", "C")',
        example: 'A',
    })
    @IsString({ message: 'La sección debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'La sección no puede estar vacía.' })
    @Matches(/^[A-Z0-9]+$/, { message: 'La sección solo puede contener letras mayúsculas o números.' })
    seccion: string;
    @ApiProperty({
        description: 'Fecha de ingreso del alumno a la institución (formato ISO 8601)',
        example: '2023-08-15T00:00:00.000Z',
        type: String, // Se indica String porque el input es una cadena de fecha
        format: 'date-time',
        required: false,
    })
    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: 'La fecha de ingreso debe ser una fecha válida.' })
    fechaIngreso?: Date;
}