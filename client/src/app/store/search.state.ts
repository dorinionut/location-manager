import { ISearchParams } from '@app/model/search-params.model';
import { ILocation } from '@app/model/location.model';

export interface ISearchState {
  searchParams: ISearchParams;
  results: ILocation[];
}

export const initialSearchState = {
  searchParams: {},
  results: []
};
