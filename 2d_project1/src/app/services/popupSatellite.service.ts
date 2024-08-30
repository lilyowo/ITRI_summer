import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root',
})
export class PopUpSatelliteService {
  constructor(private projectService: ProjectService) {}

  makeSatellitePopup(data: any): string {
    return (
      //data come from project service getFormattedSatellites
      `` +
      `<div>Satellite ID: ${data.serverSatId}</div>` +
      `<div>Plane ID: ${data.serverPlaneId}</div>` +
      `<div>Longitude: ${data.longitude}</div>` +
      `<div>Latitude: ${data.latitude}</div>` +
      `<div>Altitude: ${data.altitude}</div>`
    );
  }
  async makeSatellitePopupWithDB(
    projectId: number,
    satId: number,
    lon: number,
    lat: number,
    alt: number,
  ): Promise<string> {
    const satData = await this.projectService
      .getFormattedSatelliteswithSatId(projectId, satId)
      .toPromise();
    return (
      `` +
      `<div>Satellite ID: ${satData.serverSatId}</div>` +
      `<div>Plane ID: ${satData.serverPlaneId}</div>` +
      `<div>Longitude: ${lon}</div>` +
      `<div>Latitude: ${lat}</div>` +
      `<div>Altitude: ${alt}</div>`
    );
    // data = this.projectService.getFormattedSatelliteswithSatId(projectId, satId)
  }
}
