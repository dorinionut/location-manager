import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationFormComponent } from './location-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef, MessageService } from 'primeng/api';
import { LocationService } from '@app/service/location.service';
import { SearchFacade } from '@app/store/search.facade';
import { DropdownModule } from 'primeng/dropdown';

describe('LocationFormComponent', () => {
  let component: LocationFormComponent;
  let fixture: ComponentFixture<LocationFormComponent>;

  const mockDynamicDialogConfig = {
    data: {}
  };

  const mockLocationService = {
    add: () => {},
    update: () => {}
  };

  const mockSearchFacade = {
    updateResult: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationFormComponent ],
      imports: [
        ReactiveFormsModule,
        DropdownModule
      ],
      providers: [
        {provide: DynamicDialogConfig, useValue: mockDynamicDialogConfig},
        DynamicDialogRef,
        FormBuilder,
        MessageService,
        {provide: LocationService, useValue: mockLocationService},
        {provide: SearchFacade, useValue: mockSearchFacade}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
