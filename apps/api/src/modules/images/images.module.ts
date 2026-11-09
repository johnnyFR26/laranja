import { Module } from '@nestjs/common';
import { StorageModule } from '../storage/storage.module';
import { EstablishmentImagesController } from './controllers/establishment-images.controller';
import { ServiceOfferImagesController } from './controllers/service-offer-images.controller';
import { UserImagesController } from './controllers/user-images.controller';
import { ImageAuthorizationService } from './services/image-authorization.service';
import { ImageCleanupService } from './services/image-cleanup.service';
import { ImagesService } from './services/images.service';
import { EstablishmentImageTarget } from './targets/establishment-image.target';
import { ImageTargetRegistry } from './targets/image-target.registry';
import { ServiceOfferImageTarget } from './targets/service-offer-image.target';
import { UserImageTarget } from './targets/user-image.target';

/**
 * Não importa Users/Establishments/ServiceOffers: os targets acessam o Prisma
 * (DatabaseModule é global), evitando dependência circular.
 */
@Module({
  imports: [StorageModule],
  controllers: [
    UserImagesController,
    EstablishmentImagesController,
    ServiceOfferImagesController,
  ],
  providers: [
    UserImageTarget,
    EstablishmentImageTarget,
    ServiceOfferImageTarget,
    ImageTargetRegistry,
    ImageAuthorizationService,
    ImagesService,
    ImageCleanupService,
  ],
  exports: [ImageCleanupService],
})
export class ImagesModule {}
