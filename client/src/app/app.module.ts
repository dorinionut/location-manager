import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {TooltipModule} from 'primeng/tooltip';
import {ToastModule} from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '@env/environment';
import { StoreModule } from '@ngrx/store';
import { SearchReducer } from './store/search.reducer';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { LocationFormComponent } from './component/location-form/location-form.component';
import { HomeViewComponent } from './view/home/home.component';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    LocationFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({search: SearchReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    DynamicDialogModule,
    TooltipModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  entryComponents: [
    LocationFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
