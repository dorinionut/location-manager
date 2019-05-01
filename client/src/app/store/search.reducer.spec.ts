import { async, TestBed } from '@angular/core/testing';
import { SearchReducer } from './search.reducer';
import { initialSearchState } from './search.state';
import { LoadResults, LoadSearchParams, UpdateResult } from './search.actions';
import { mockLocationList, mockLocation } from 'testing/constant/locations';
import { mockSearchParams } from 'testing/constant/search-params';

describe('SearchReducer', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({});
  }));

  it('should return initialState', () => {
    const state = SearchReducer.call(this, undefined, {type: 'Initial action'});
    expect(state).toBe(initialSearchState);
  });

  it('should load results', () => {
    const state = SearchReducer(undefined, new LoadResults(mockLocationList));
    expect(state.results).toEqual(mockLocationList);
  });

  it('should load search params', () => {
    const state = SearchReducer(undefined, new LoadSearchParams(mockSearchParams));
    expect(state.searchParams).toEqual(mockSearchParams);
  });

  it('should update location', () => {
    const initialState = {
      results: [mockLocation],
      searchParams: mockSearchParams
    };

    const mockInput = Object.assign({}, mockLocation, {name: 'Test'});

    const state = SearchReducer(initialState, new UpdateResult(mockInput));

    expect(state.results[0].name).toBe('Test');
  });
});
