import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILocation } from '@app/model/location.model';
import { LocationService } from '@app/service/location.service';
import { DynamicDialogConfig, DynamicDialogRef, MessageService } from 'primeng/api';
import { LOCATION_FUNCTION } from '@app/constant/location-function';
import { CONTINENT } from '@app/constant/continent.enum';
import { SearchFacade } from '@app/store/search.facade';
import { deleteEmptyKeys, createDropdownOptions } from '@app/util/helper';

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
    private messageService: MessageService,
    private locationService: LocationService,
    private searchFacade: SearchFacade
  ) { }

  ngOnInit() {
    if (this.config.data && this.config.data.location) {
      this.location = this.config.data.location;
      this.updateMode = true;
    }

    this.functionList = createDropdownOptions(LOCATION_FUNCTION).sort();
    this.continentList = createDropdownOptions(CONTINENT).sort();

    this.locationForm = this.formBuilder.group({
      name: ['', [
        Validators.minLength(1),
        Validators.maxLength(60),
        Validators.required
      ]],
      coordinates: this.formBuilder.group({
        latitudeInDegrees: ['', [
          Validators.max(90),
          Validators.min(-90),
          Validators.required
        ]],
        longitudeInDegrees: ['', [
          Validators.max(180),
          Validators.min(-180),
          Validators.required
        ]]
      }),
      address: this.formBuilder.group({
        city: ['', [
          Validators.minLength(1),
          Validators.maxLength(60),
          Validators.required
        ]],
        country: ['', [
          Validators.minLength(2),
          Validators.maxLength(2),
          Validators.required
        ]],
        continent: ['',
          Validators.required
        ],
        streetName: ['', Validators.required],
        streetNumber: [''],
        postalCode: ['']
      }),
      function: ['']
    });

    if (this.location) {
      this.locationForm.setValue({
        name: this.location.name || '',
        coordinates: {
          latitudeInDegrees: this.location.coordinates.latitudeInDegrees || '',
          longitudeInDegrees: this.location.coordinates.longitudeInDegrees
        },
        address: {
          continent: this.location.address.continent || '',
          country: this.location.address.country || '',
          city: this.location.address.city || '',
          streetName: this.location.address.streetName || '',
          streetNumber: this.location.address.streetNumber || '',
          postalCode: this.location.address.postalCode || ''
        },
        function: this.location.function || ''
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.locationForm.updateValueAndValidity();
    this.locationForm.markAsTouched();

    if (this.locationForm.valid) {

      const newLocation = Object.assign({}, this.location, this.locationForm.value);

      deleteEmptyKeys(newLocation);
      deleteEmptyKeys(newLocation.address);

      newLocation.normalizedName = newLocation.name.normalize();

      if (this.updateMode) {
        this.locationService
          .update(newLocation)
          .subscribe(location => {
            this.location = location;
            this.searchFacade.updateResult(location);

            this.messageService.add({
              severity: 'success',
              summary: 'Location updated',
              detail: `${location.name} was updated sucessfully.`});

            this.dialogRef.close();
          });
      } else {
        this.locationService
          .add(newLocation)
          .subscribe(location => {
            this.location = location;
            this.updateMode = true;

            this.messageService.add({
              severity: 'success',
              summary: 'Location saved',
              detail: `${location.name} was saved sucessfully.`
            });

            this.dialogRef.close();
          });
      }
    }
  }
}

