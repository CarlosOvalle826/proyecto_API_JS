import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstudiantesController } from './estudiantes.controller';
import { EstudiantesService } from './estudiantes.service';
import { Estudiante, EsquemaEstudiante} from './schemas/estudiante.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Estudiante.name, schema: EsquemaEstudiante}]),
  ],
  controllers: [EstudiantesController],
  providers: [EstudiantesService]
})
export class EstudiantesModule {}
