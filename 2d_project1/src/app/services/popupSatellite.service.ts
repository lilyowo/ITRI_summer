import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopUpSatelliteService {
  constructor() {}

  makeSatellitePopup(data: any): string {
    return (
      `` +
      `<div>Satellite ID: ${data.satelliteId}</div>` +
      `<div>Plane ID: ${data.planeId}</div>` +
      `<div>Name: ${data.satName}</div>` +
      `<div>Longitude: ${data.longitude}</div>` +
      `<div>Latitude: ${data.latitude}</div>` +
      `<div>Altitude: ${data.altitude}</div>`
    );
  }
}
