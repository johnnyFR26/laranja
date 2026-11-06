import { randomUUID } from 'node:crypto';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Inject, Injectable, Logger } from '@nestjs/common';
import type { ImageEntityType, ImageSlot } from '../../images/image.constants';
import type { StorageConfig } from '../storage.config';
import { S3_CLIENT, STORAGE_CONFIG } from '../storage.constants';
import { StorageException } from '../storage.exception';

export const IMAGE_CACHE_CONTROL = 'public, max-age=31536000, immutable';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);

  constructor(
    @Inject(S3_CLIENT) private readonly s3: S3Client,
    @Inject(STORAGE_CONFIG) private readonly config: StorageConfig,
  ) {}

  /** Gera `{entidade}/{slug}/{papel}/{uuid}.{ext}`. */
  buildKey(
    entity: ImageEntityType,
    slug: string,
    role: ImageSlot,
    ext: string,
  ): string {
    const cleanExt = ext.replace(/^\./, '');
    return `${entity}/${slug}/${role}/${randomUUID()}.${cleanExt}`;
  }

  async upload(params: {
    key: string;
    body: Buffer;
    contentType: string;
  }): Promise<{ key: string; url: string }> {
    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.config.bucket,
          Key: params.key,
          Body: params.body,
          ContentType: params.contentType,
          CacheControl: IMAGE_CACHE_CONTROL,
        }),
      );
    } catch (error) {
      this.logFailure('upload', params.key, error);
      throw new StorageException();
    }
    return { key: params.key, url: this.toUrl(params.key) };
  }

  toUrl(key: string): string {
    return `${this.config.cdnUrl}/${key}`;
  }

  /** Retorna a chave do objeto ou `null` se a URL não for do CDN. */
  toKey(url: string): string | null {
    const prefix = `${this.config.cdnUrl}/`;
    if (typeof url !== 'string' || !url.startsWith(prefix)) return null;
    const key = url.slice(prefix.length);
    return key.length > 0 ? key : null;
  }

  /** Retorna false (sem remover) se a URL não pertencer ao CDN. */
  async deleteByUrl(url: string): Promise<boolean> {
    const key = this.toKey(url);
    if (key === null) {
      this.logger.warn(`URL fora do CDN ignorada na remoção: ${url}`);
      return false;
    }
    try {
      await this.s3.send(
        new DeleteObjectCommand({ Bucket: this.config.bucket, Key: key }),
      );
    } catch (error) {
      this.logFailure('delete', key, error);
      throw new StorageException();
    }
    return true;
  }

  /** Best effort: nunca lança; devolve as URLs que falharam. */
  async deleteManyByUrl(urls: string[]): Promise<{ failed: string[] }> {
    const results = await Promise.allSettled(
      urls.map((url) => this.deleteByUrl(url)),
    );
    const failed = urls.filter((_, i) => results[i].status === 'rejected');
    return { failed };
  }

  private logFailure(operation: string, key: string, error: unknown): void {
    const message = error instanceof Error ? error.message : String(error);
    this.logger.error(`Falha em ${operation} do objeto "${key}": ${message}`);
  }
}
