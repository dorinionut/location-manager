import { initialSearchState, ISearchState } from './search.state';
import { SearchActionsTypes, SearchActions } from './search.actions';

export function getNewState(oldState: ISearchState, newState?: Partial<ISearchState>) {
  return Object.assign({}, oldState, newState);
}

export function SearchReducer(state: ISearchState = initialSearchState, action: SearchActions) {

  switch (action.type) {
    case SearchActionsTypes.LOAD_RESULTS:
      return getNewState(state, {
        results: action.payload
      });

    case SearchActionsTypes.LOAD_SEARCH_PARAMS:
      return getNewState(state, {
        searchParams: action.payload
      });

    case SearchActionsTypes.UPDATE_RESULT:
      const locationIndex = state.results.findIndex(location => action.payload.id === location.id);

      if (locationIndex !== -1) {
        state.results[locationIndex] = action.payload;
      }

      return getNewState(state);

    default:
      return state;
  }
}
