export interface IBaseRepository<T> {
  findAll(params?: any): Promise<T[]>;
  findBySlug(slug: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(slug: string, data: Partial<T>): Promise<T>;
  delete(slug: string): Promise<void>;
  count(params?: any): Promise<number>;
}

export interface IPaginationParams {
  page: number;
  limit: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export interface IPaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
