import { Component, OnInit } from '@angular/core';
import { ILocation } from 'src/app/shared/model/location.model';
import { LocationService } from 'src/app/shared/service/location.service';
import { switchMap } from 'rxjs/operators';
import { DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

  public location: ILocation;

  constructor(
    public config: DynamicDialogConfig,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.location = this.config.data.location;
  }

  getLocation() {
    this.locationService
      .get(this.location.resourceId.replace('/tenant1/locations/', ''))
      .subscribe(location => this.location = location);
  }

  updateLocation() {
    const newLocation = Object.assign({}, this.location);

    newLocation.name = Date.now().toString();

    this.locationService
      .update(newLocation)
      .pipe(
        switchMap(updatedLocation => this.locationService.get(updatedLocation.resourceId.replace('/tenant1/locations/', '')))
      )
      .subscribe(updatedLocation => this.location = updatedLocation);
  }
}
