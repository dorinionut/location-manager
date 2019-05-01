import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DynamicDialogModule} from 'primeng/dynamicdialog';

import { HeaderComponent } from './component/header/header.component';
import { CoreRoutingModule } from './core-routing.module';
import { HomeViewComponent } from './view/home/home.component';
import { LocationFormComponent } from './component/location-form/location-form.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeViewComponent,
    LocationFormComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    DynamicDialogModule
  ],
  exports: [
    HeaderComponent
  ],
  entryComponents: [
    LocationFormComponent
  ]
})
export class CoreModule { }
