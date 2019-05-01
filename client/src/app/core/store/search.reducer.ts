import { initialSearchState, ISearchState } from './search.state';
import { SearchActionsTypes, SearchActions } from './search.actions';

export function getNewState(oldState: ISearchState, newState: Partial<ISearchState>) {
  return Object.assign({}, oldState, newState);
}

export function SearchReducer(initialState: ISearchState = initialSearchState, action: SearchActions) {

  switch (action.type) {
    case SearchActionsTypes.LOAD_RESULTS:
      return getNewState(initialState, {
        results: action.payload
      });

    case SearchActionsTypes.LOAD_SEARCH_PARAMS:
      return getNewState(initialState, {
        searchParams: action.payload
      });

    default:
      return initialState;
  }
}
