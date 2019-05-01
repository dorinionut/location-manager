import { Params } from '@angular/router';

export interface ISearchParams extends Params {
  page?: number;
  pageSize?: number;
  sort?: string;
}
