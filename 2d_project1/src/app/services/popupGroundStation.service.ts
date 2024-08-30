import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopUpGroundStationService {
  constructor() {}

  makeGroundStationPopup(data: any): string {
    return (
      `` +
      `<div>Ground Station ID: ${data.gsId}</div>` +
      // `<div>Connected Satellite ID: ${data.connectedSatId}</div>` +
      `<div>Accept Elevation: ${data.acceptElevation}</div>`
    );
  } //To add more detail, see project.service.ts->getFormattedGroundStations->properties
}
