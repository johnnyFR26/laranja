import { S3Client } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageService } from './services/storage.service';
import { loadStorageConfig, StorageConfig } from './storage.config';
import { S3_CLIENT, STORAGE_CONFIG } from './storage.constants';

@Module({
  providers: [
    {
      provide: STORAGE_CONFIG,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): StorageConfig =>
        loadStorageConfig({
          get: (key: string) => configService.get<string>(key),
        }),
    },
    {
      provide: S3_CLIENT,
      inject: [STORAGE_CONFIG],
      useFactory: (config: StorageConfig): S3Client =>
        new S3Client({
          region: config.region,
          credentials: {
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
          },
        }),
    },
    StorageService,
  ],
  exports: [StorageService],
})
export class StorageModule {}
