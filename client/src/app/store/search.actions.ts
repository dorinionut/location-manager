import { Action } from '@ngrx/store';
import { ILocation } from '@app/model/location.model';
import { ISearchParams } from '@app/model/search-params.model';

export enum SearchActionsTypes {
  LOAD_RESULTS = '[Search] Load locations',
  LOAD_SEARCH_PARAMS = '[Search] Load search params',
  UPDATE_RESULT = '[Search] Update result'
}

export class LoadResults implements Action {
  readonly type = SearchActionsTypes.LOAD_RESULTS;

  constructor(public payload: ILocation[]) {}
}

export class LoadSearchParams implements Action {
  readonly type = SearchActionsTypes.LOAD_SEARCH_PARAMS;

  constructor(public payload: ISearchParams) {}
}

export class UpdateResult implements Action {
  readonly type = SearchActionsTypes.UPDATE_RESULT;

  constructor(public payload: ILocation) {}
}

export type SearchActions =
  | LoadResults
  | LoadSearchParams
  | UpdateResult;
