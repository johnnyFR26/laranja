import { Module } from '@nestjs/common';
import { ServiceOfferService } from './services/service-offer.service';
import { ServiceOfferController } from './controllers/service-offer.controller';
import { ServiceOfferRepository } from './repositories/service-offer.repository';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ServiceOfferController],
  providers: [ServiceOfferService, ServiceOfferRepository],
  exports: [ServiceOfferService, ServiceOfferRepository],
})
export class ServiceOffersModule {}
