import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILocation } from '@app/shared/model/location.model';
import { LocationService } from '@app/shared/service/location.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { LOCATION_FUNCTION } from '@app/shared/constant/location-function';
import { TitleCasePipe } from '@angular/common';
import { CONTINENT } from '@app/shared/constant/continent.enum';
import { SearchFacade } from '@app/core/store/search.facade';

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
    const titlePipe = new TitleCasePipe();

    this.location = this.config.data.location;

    if (this.location) {
      this.updateMode = true;
    }
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

    for (const fkey in LOCATION_FUNCTION) {
      if (LOCATION_FUNCTION.hasOwnProperty(fkey)) {
        const func = LOCATION_FUNCTION[fkey];
        this.functionList.push({
          label: titlePipe.transform(func.replace('_', ' ')),
          value: func
        });
      }
    }

    for (const ckey in CONTINENT) {
      if (CONTINENT.hasOwnProperty(ckey)) {
        const continent = CONTINENT[ckey];
        this.continentList.push({
          label: titlePipe.transform(continent.replace('_', ' ')),
          value: continent
        });
      }
    }

    this.functionList.sort();
    this.continentList.sort();
  }

  cancel() {
    this.dialogRef.close();
  }

  getLocation() {
    this.locationService
      .getById(this.location.id)
      .subscribe(location => this.location = location);
  }

  save() {
    if (this.locationForm.valid) {

      const newLocation = Object.assign({}, this.location, this.locationForm.value);

      for (const key in newLocation.address) {
        if (newLocation.address.hasOwnProperty(key)) {
          if (newLocation.address[key] === '') {
            delete newLocation.address[key];
          }
        }
      }

      newLocation.normalizedName = newLocation.name.normalize();

      if (this.updateMode) {
        this.locationService
          .update(newLocation)
          .subscribe(location => {
            this.location = location;

            this.searchFacade.updateResult(location);
          });
      }
      else {
        this.locationService
          .add(newLocation)
          .subscribe(location => this.location = location);
      }
    }
  }
}
