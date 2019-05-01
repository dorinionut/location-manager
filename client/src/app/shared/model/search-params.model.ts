import { Params } from '@angular/router';
import { ILocation } from './location.model';

export interface ISearchParams extends Params {
  page?: number;
  pageSize?: number;
  sort?: string;
}
