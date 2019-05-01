import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
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
    TableModule,
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
