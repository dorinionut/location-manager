import { Store } from '@ngrx/store';
import { ISearchState } from './search.state';
import { selectSearchResults, selectSearchParams } from './search.selectors';
import * as SearchActions from './search.actions';
import { ILocation } from '@app/model/location.model';
import { ISearchParams } from '@app/model/search-params.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchFacade {
  constructor(private store: Store<ISearchState>) {}

  getResults() {
    return this.store.select(selectSearchResults);
  }

  getSearchParams() {
    return this.store.select(selectSearchParams);
  }

  loadResults(locations: ILocation[]) {
    this.store.dispatch(new SearchActions.LoadResults(locations));
  }

  loadSearchParams(searchParams: ISearchParams) {
    this.store.dispatch(new SearchActions.LoadSearchParams(searchParams));
  }

  updateResult(location: ILocation) {
    this.store.dispatch(new SearchActions.UpdateResult(location));
  }
}
