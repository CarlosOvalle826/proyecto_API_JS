import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Importa MongooseModule
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://covalle826:tHAw7225bfTycdXh@cluster0.ltoaoe2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0]'),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
