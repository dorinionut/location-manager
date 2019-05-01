import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {DialogService} from 'primeng/api';
import { ILocation } from 'src/app/shared/model/location.model';
import { LocationService } from 'src/app/shared/service/location.service';
import { LocationFormComponent } from '../../component/location-form/location-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DialogService]
})
export class HomeViewComponent implements OnInit {

  public locations: Observable<ILocation[]>;

  constructor(
    public dialogService: DialogService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.locations = this.locationService.search();
  }

  openLocation(location) {
    this.dialogService.open(LocationFormComponent, {
      data: {location}
    });
  }

}
