import { Module } from '@nestjs/common';
import { EstablishmentService } from './services/establishment.service';
import { EstablishmentController } from './controllers/establishment.controller';
import { EstablishmentRepository } from './repositories/establishment.repository';
import { DatabaseModule } from '../../database/database.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [DatabaseModule, ImagesModule],
  controllers: [EstablishmentController],
  providers: [EstablishmentService, EstablishmentRepository],
  exports: [EstablishmentService, EstablishmentRepository],
})
export class EstablishmentsModule {}
