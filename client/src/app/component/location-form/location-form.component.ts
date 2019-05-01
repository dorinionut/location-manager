import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILocation } from '@app/model/location.model';
import { LocationService } from '@app/service/location.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { LOCATION_FUNCTION } from '@app/constant/location-function';
import { CONTINENT } from '@app/constant/continent.enum';
import { SearchFacade } from '@app/store/search.facade';
import { deleteEmptyKeys, createDropdownOptions } from '../util/helper';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

  public continentList: any = [];
  public functionList: any = [];
  public location: ILocation;
  public locationForm: FormGroup;
  public updateMode: boolean = false;

  constructor(
    public config: DynamicDialogConfig,
    public dialogRef: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private searchFacade: SearchFacade
  ) { }

  ngOnInit() {

    this.location = this.config.data.location;

    if (this.location) {
      this.updateMode = true;
    }

    this.functionList = createDropdownOptions(LOCATION_FUNCTION).sort();
    this.continentList = createDropdownOptions(CONTINENT).sort();

    this.locationForm = this.formBuilder.group({
      name: [this.location.name, [
        Validators.minLength(1),
        Validators.maxLength(60),
        Validators.required
      ]],
      coordinates: this.formBuilder.group({
        latitudeInDegrees: [this.location.coordinates.latitudeInDegrees, [
          Validators.max(90),
          Validators.min(-90),
          Validators.required
        ]],
        longitudeInDegrees: [this.location.coordinates.longitudeInDegrees, [
          Validators.max(180),
          Validators.min(-180),
          Validators.required
        ]]
      }),
      address: this.formBuilder.group({
        city: [this.location.address.city, [
          Validators.minLength(1),
          Validators.maxLength(60),
          Validators.required
        ]],
        country: [this.location.address.country, [
          Validators.minLength(2),
          Validators.maxLength(2),
          Validators.required
        ]],
        continent: [this.location.address.continent,
          Validators.required
        ],
        streetName: [this.location.address.streetName, Validators.required],
        streetNumber: [this.location.address.streetNumber],
        postalCode: [this.location.address.postalCode]
      }),
      function: [this.location.function]
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.locationForm.valid) {

      const newLocation = Object.assign({}, this.location, this.locationForm.value);

      deleteEmptyKeys(newLocation.address);

      newLocation.normalizedName = newLocation.name.normalize();

      if (this.updateMode) {
        this.locationService
          .update(newLocation)
          .subscribe(location => {
            this.location = location;

            this.searchFacade.updateResult(location);
          });
      } else {
        this.locationService
          .add(newLocation)
          .subscribe(location => {
            this.location = location;
            this.updateMode = true;
          });
      }
    }
  }
}

