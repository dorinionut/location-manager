import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocationService } from '@app/service/location.service';
import { SearchFacade } from '@app/store/search.facade';

describe('HomeViewComponent', () => {
  let component: HomeViewComponent;
  let fixture: ComponentFixture<HomeViewComponent>;

  const mockLocationService = {
    search: () => {}
  };

  const mockSearchFacade = {
    getResults: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeViewComponent ],
      providers: [
        {provide: LocationService, useValue: mockLocationService},
        {provide: SearchFacade, useValue: mockSearchFacade}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
