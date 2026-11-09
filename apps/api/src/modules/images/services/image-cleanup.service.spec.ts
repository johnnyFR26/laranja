import { ImageCleanupService } from './image-cleanup.service';

describe('ImageCleanupService', () => {
  const collectUrls = jest.fn();
  const registry = { get: jest.fn(() => ({ collectUrls })) };
  const storage = {
    deleteManyByUrl: jest.fn(),
    toKey: jest.fn((u: string) => u.replace('https://cdn/', '')),
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const service = new ImageCleanupService(registry as any, storage as any);

  beforeEach(() => jest.clearAllMocks());

  it('collect delega ao target da entidade', async () => {
    collectUrls.mockResolvedValue(['https://cdn/a']);
    await expect(service.collect('establishment', 's1')).resolves.toEqual([
      'https://cdn/a',
    ]);
    expect(registry.get).toHaveBeenCalledWith('establishment');
    expect(collectUrls).toHaveBeenCalledWith('s1');
  });

  it('purge deduplica URLs e ignora vazias', async () => {
    storage.deleteManyByUrl.mockResolvedValue({ failed: [] });
    await service.purge(['https://cdn/a', 'https://cdn/a', '']);
    expect(storage.deleteManyByUrl).toHaveBeenCalledWith(['https://cdn/a']);
  });

  it('purge não chama o storage sem URLs', async () => {
    await service.purge([]);
    expect(storage.deleteManyByUrl).not.toHaveBeenCalled();
  });

  it('purge não lança quando o storage falha', async () => {
    storage.deleteManyByUrl.mockRejectedValue(new Error('boom'));
    await expect(service.purge(['https://cdn/a'])).resolves.toBeUndefined();
  });

  it('purge não lança quando há URLs com falha', async () => {
    storage.deleteManyByUrl.mockResolvedValue({ failed: ['https://cdn/a'] });
    await expect(service.purge(['https://cdn/a'])).resolves.toBeUndefined();
  });
});
