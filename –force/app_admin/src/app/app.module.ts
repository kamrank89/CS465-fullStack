import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { TripListingComponent } from "./trip-listing/trip-listing.component";
import { TripCardComponent } from "./trip-card/trip-card.component";
import { TripDataService } from "./services/trip-data.service";
import { AddTripComponent } from "./add-trip/add-trip.component";
import { AppRoutingModule } from "./app-router.module";

@NgModule({
  declarations: [
    AppComponent,
    TripListingComponent,
    TripCardComponent,
    AddTripComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [TripDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
