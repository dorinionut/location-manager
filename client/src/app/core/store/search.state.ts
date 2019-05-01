import { ISearchParams } from '@app/shared/model/search-params.model';
import { ILocation } from '@app/shared/model/location.model';

export interface ISearchState {
  searchParams: ISearchParams;
  results: ILocation[];
}

export const initialSearchState = {
  searchParams: {},
  results: []
};
