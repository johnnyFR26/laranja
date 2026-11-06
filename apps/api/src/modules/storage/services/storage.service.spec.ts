import { StorageException } from '../storage.exception';
import { StorageService } from './storage.service';

const config = {
  region: 'us-east-1',
  bucket: 'bucket',
  cdnUrl: 'https://cdn.example.com',
  accessKeyId: 'id',
  secretAccessKey: 'secret',
};

describe('StorageService', () => {
  let send: jest.Mock;
  let service: StorageService;

  beforeEach(() => {
    send = jest.fn().mockResolvedValue({});
    service = new StorageService({ send } as never, config);
  });

  it('buildKey segue o formato entidade/slug/papel/uuid.ext', () => {
    const key = service.buildKey('user', 'abc', 'avatar', 'png');
    expect(key).toMatch(/^user\/abc\/avatar\/[0-9a-f-]{36}\.png$/);
    expect(service.buildKey('user', 'abc', 'avatar', 'png')).not.toBe(key);
  });

  it('upload envia Bucket, Key, ContentType e CacheControl', async () => {
    const result = await service.upload({
      key: 'k/a.png',
      body: Buffer.from('x'),
      contentType: 'image/png',
    });
    expect(result).toEqual({ key: 'k/a.png', url: 'https://cdn.example.com/k/a.png' });
    expect(send.mock.calls[0][0].input).toMatchObject({
      Bucket: 'bucket',
      Key: 'k/a.png',
      ContentType: 'image/png',
      CacheControl: 'public, max-age=31536000, immutable',
    });
  });

  it('upload converte falha do SDK em StorageException', async () => {
    send.mockRejectedValue(new Error('boom'));
    await expect(
      service.upload({ key: 'k', body: Buffer.from('x'), contentType: 'image/png' }),
    ).rejects.toBeInstanceOf(StorageException);
  });

  it('toKey(toUrl(k)) === k e retorna null fora do CDN', () => {
    const key = service.buildKey('establishment', 's', 'gallery', 'webp');
    expect(service.toKey(service.toUrl(key))).toBe(key);
    expect(service.toKey('https://evil.com/x.png')).toBeNull();
    expect(service.toKey('https://cdn.example.com.evil.com/x.png')).toBeNull();
  });

  it('deleteByUrl ignora URL fora do CDN sem chamar o S3', async () => {
    await expect(service.deleteByUrl('https://evil.com/x.png')).resolves.toBe(false);
    expect(send).not.toHaveBeenCalled();
  });

  it('deleteByUrl remove objeto do CDN e relança erro do SDK', async () => {
    await expect(service.deleteByUrl('https://cdn.example.com/a/b.png')).resolves.toBe(true);
    expect(send.mock.calls[0][0].input).toEqual({ Bucket: 'bucket', Key: 'a/b.png' });
    send.mockRejectedValue(new Error('boom'));
    await expect(
      service.deleteByUrl('https://cdn.example.com/a/b.png'),
    ).rejects.toBeInstanceOf(StorageException);
  });

  it('deleteManyByUrl reporta falhas sem lançar', async () => {
    send.mockRejectedValueOnce(new Error('boom')).mockResolvedValue({});
    const res = await service.deleteManyByUrl([
      'https://cdn.example.com/a.png',
      'https://cdn.example.com/b.png',
    ]);
    expect(res.failed).toEqual(['https://cdn.example.com/a.png']);
  });
});
