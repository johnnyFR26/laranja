export interface StorageConfig {
  region: string;
  bucket: string;
  /** URL base do CDN, sem barra final. */
  cdnUrl: string;
  accessKeyId: string;
  secretAccessKey: string;
}

/** Leitor mínimo de variáveis (compatível com ConfigService.get). */
export interface EnvReader {
  get(key: string): string | undefined;
}

/**
 * Lê e valida as variáveis de ambiente de storage.
 * Lança Error('Variável de ambiente ausente: <NOME>') se alguma faltar.
 */
export function loadStorageConfig(env: EnvReader): StorageConfig {
  const required = (name: string): string => {
    const value = env.get(name);
    if (value === undefined || value === null || value.trim() === '') {
      throw new Error(`Variável de ambiente ausente: ${name}`);
    }
    return value.trim();
  };

  return {
    region: required('AWS_REGION'),
    bucket: required('AWS_S3_BUCKET'),
    cdnUrl: required('AWS_CDN_URL').replace(/\/+$/, ''),
    accessKeyId: required('AWS_ACCESS_KEY_ID'),
    secretAccessKey: required('AWS_SECRET_ACCESS_KEY'),
  };
}
