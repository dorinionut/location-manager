import { Component, OnInit } from '@angular/core';
import {DialogService, LazyLoadEvent} from 'primeng/api';
import { ILocation } from '@app/model/location.model';
import { LocationService } from '@app/service/location.service';
import { LocationFormComponent } from '../../component/location-form/location-form.component';
import { ISearchParams } from '@app/model/search-params.model';
import { LOCATION_FUNCTION } from '@app/constant/location-function';
import { SearchFacade } from '@app/store/search.facade';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createDropdownOptions } from '@app/util/helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DialogService]
})
export class HomeViewComponent implements OnInit {

  public locations: Observable<ILocation[]>;
  public locationFunctions: any;
  public rowsPerPageOptions: number[] = [10, 25, 50, 100];
  private searchParams: ISearchParams = {};
  public totalRecords: number = this.rowsPerPageOptions[1];

  constructor(
    public dialogService: DialogService,
    private locationService: LocationService,
    private searchFacade: SearchFacade
  ) { }

  ngOnInit() {
    this.locations = this.searchFacade.getResults();

    this.locationFunctions = createDropdownOptions(LOCATION_FUNCTION);
  }

  openLocationForm(location?: ILocation) {
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
    } else {
      this.searchParams.page = event.first / event.rows;
    }

    this.searchParams.pageSize = event.rows;
    this.searchParams.sort = sortString;

    this.locationService
      .search(this.searchParams)
      .subscribe(locations => {
        this.searchFacade.loadResults(locations);
        this.searchFacade.loadSearchParams(this.searchParams);

        if (locations.length) {
          this.totalRecords += (locations.length === event.rows) ? locations.length : 0;
        }
      });
  }
}
