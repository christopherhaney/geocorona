import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapDetailContainerComponent } from './map-detail/map-detail-container/map-detail-container.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { UsMapComponent } from './map-detail/us-map/us-map.component';
import { UsStatePopUpComponent } from './map-detail/us-state-pop-up/us-state-pop-up.component';
import { AboutComponent } from './about/about.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MapDetailContainerComponent,
    UsMapComponent,
    UsStatePopUpComponent,
    AboutComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxCsvParserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
