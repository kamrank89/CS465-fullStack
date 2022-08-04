import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Trip } from "../models/trip";

@Injectable()
export class TripDataService {
  constructor(private http: HttpClient) {}
  private apiBaseUrl = "http://localhost:3000/api/";
  private tripUrl = `${this.apiBaseUrl}trips/`;
  public getTrips(): Promise<Trip[]> {
    console.log("Inside TripDataService#getTrips");
    return this.http
      .get(`${this.apiBaseUrl}trips`)
      .toPromise()
      .then((response) => response as Trip[])
      .catch(this.handleError);
  }
  public addTrip(formData: Trip): Promise<Trip[]> {
    console.log("Inside TripDataService#addTrips");
    return this.http
      .post(this.tripUrl, formData)
      .toPromise()
      .then((response) => response as Trip[])
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error("Something has gone wrong", error);
    return Promise.reject(error.message || error);
  }
}
