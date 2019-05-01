import { ISearchState } from './search.state';
import { createSelector } from '@ngrx/store';

export const selectSearchState = (state: any) => state.search;

export const selectSearchResults = createSelector(
  selectSearchState,
  (state: ISearchState) => {
    return state.results;
  }
);

export const selectSearchParams = createSelector(
  selectSearchState,
  (state: ISearchState) => {
    return state.searchParams;
  }
);
