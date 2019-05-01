import { Component, OnInit } from '@angular/core';
import {DialogService, LazyLoadEvent} from 'primeng/api';
import { ILocation } from 'src/app/shared/model/location.model';
import { LocationService } from 'src/app/shared/service/location.service';
import { LocationFormComponent } from '../../component/location-form/location-form.component';
import { ISearchParams } from 'src/app/shared/model/search-params.model';
import { LOCATION_FUNCTION } from 'src/app/shared/constant/location-function';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DialogService]
})
export class HomeViewComponent implements OnInit {

  public locations: ILocation[] = [];
  public locationFunctions: any;
  public rowsPerPageOptions: number[] = [10, 25, 50, 100];
  private searchParams: ISearchParams = {};
  public totalRecords: number = this.rowsPerPageOptions[1];

  constructor(
    public dialogService: DialogService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.locationFunctions = [
      {label: 'Airport', value: LOCATION_FUNCTION[LOCATION_FUNCTION.AIRPORT]},
      {label: 'Rail terminal', value: LOCATION_FUNCTION[LOCATION_FUNCTION.RAIL_TERMINAL]},
      {label: 'Seaport', value: LOCATION_FUNCTION[LOCATION_FUNCTION.SEAPORT]}
    ];
  }

  openLocation(location) {
    this.dialogService.open(LocationFormComponent, {
      data: {location},
      showHeader: false
    });
  }

  loadLocations(event: LazyLoadEvent) {
    let sortString = '';

    if (event.multiSortMeta) {
      sortString = event.multiSortMeta.reduce((sortStringAggregate, sorter, index) => {
        sortStringAggregate += (sorter.order === -1) ? '-' : '';
        sortStringAggregate += sorter.field;
        sortStringAggregate += (index !== event.multiSortMeta.length - 1) ? ',' : '';
        return sortStringAggregate;
      }, '');
    }

    for (const key in event.filters) {
      if (event.filters.hasOwnProperty(key)) {
        this.searchParams[key] = event.filters[key].value;
      }
    }

    if (sortString !== this.searchParams.sort || Object.keys(event.filters).length > 0) {
      this.totalRecords = event.rows;
      this.searchParams.page = 0;
    }
    else {
      this.searchParams.page = event.first / event.rows;
    }

    this.searchParams.pageSize = event.rows;
    this.searchParams.sort = sortString;

    this.locationService
      .search(this.searchParams)
      .subscribe(locations => {
        if (locations.length) {
          this.locations = locations;
          this.totalRecords += (locations.length === event.rows) ? this.locations.length : 0;
        }
      });
  }
}
