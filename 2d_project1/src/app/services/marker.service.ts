import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopUpGroundStationService } from './popupGroundStation.service';
import { ProjectService } from './project.service';
import * as L from 'leaflet';
import * as satellite from 'satellite.js';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  constructor(
    private http: HttpClient,
    private popupService: PopUpGroundStationService,
    private projectService: ProjectService,
  ) {}

  makeGroundStationMarkers(map: L.Map, projectId: number): void {
    const markers: L.CircleMarker[] = [];
    this.projectService.getFormattedGroundStations(projectId).subscribe(
      (groundStationData) => {
        // 處理 UT 數據
        this.processGroundStations(groundStationData.ut, map, markers, 'green');
        // 處理 FT 數據
        this.processGroundStations(groundStationData.ft, map, markers, 'blue');

        // 如果需要，可以在這裡調整地圖範圍
        // const bounds = L.featureGroup(markers).getBounds();
        // map.fitBounds(bounds);
      },
      (error) => {
        console.error('Error fetching ground station data:', error);
      },
    );
  }

  private processGroundStations(
    data: any,
    map: L.Map,
    markers: L.CircleMarker[],
    color: string,
  ): void {
    for (const feature of data.features) {
      const lon = feature.geometry.coordinates[0];
      const lat = feature.geometry.coordinates[1];
      const circle = L.circleMarker([lat, lon], {
        radius: 5,
        color: color,
      }).addTo(map);
      circle.bindPopup(
        this.popupService.makeGroundStationPopup(feature.properties),
      );
      // circle;
      markers.push(circle);
    }
  }

  makePlaneMarkers(map: L.Map, projectId: number): void {
    this.projectService
      .getPlanesByProjectId(projectId)
      .subscribe((planes: any) => {
        planes.forEach((plane: any) => {
          const points = this.calculateOrbitPoints(plane);
          const latlngs = points.map((point) => [point.lat, point.lng]);
          const polyline = L.polyline(latlngs, {
            color: 'lightgray',
            weight: 1,
          }).addTo(map);
        });
      });
  }

  calculateOrbitPoints(plane: any): any[] {
    const { inclination, raan, eccentricity, arg_pe, altitude } = plane;
    const points = [];

    // 創建一個更準確的TLE
    const epochYear = new Date().getUTCFullYear().toString().substr(-2);
    const epochDay = (Date.now() / (1000 * 60 * 60 * 24)) % 365.25;
    const meanMotion =
      (Math.sqrt(398600.4418 / Math.pow(altitude + 6378.137, 3)) * 86400) /
      (2 * Math.PI);

    const tle1 = `1 00000U 00000A   ${epochYear}${epochDay.toFixed(8).padStart(12, '0')}  .00000000  00000-0  00000-0 0  9999`;
    const tle2 = `2 00000 ${inclination.toFixed(4).padStart(8, ' ')} ${raan.toFixed(4).padStart(8, ' ')} ${eccentricity.toFixed(7).slice(2).padStart(7, '0')} ${arg_pe.toFixed(4).padStart(8, ' ')} 000.0000 ${meanMotion.toFixed(8).padStart(11, ' ')}`;

    const satrec = satellite.twoline2satrec(tle1, tle2);

    for (let i = 0; i < 1440; i += 10) {
      const time = new Date();
      time.setMinutes(time.getMinutes() + i);
      const positionAndVelocity = satellite.propagate(satrec, time);
      if (positionAndVelocity.position) {
        const gmst = satellite.gstime(time);
        if (
          positionAndVelocity.position &&
          typeof positionAndVelocity.position !== 'boolean'
        ) {
          const positionGd = satellite.eciToGeodetic(
            positionAndVelocity.position,
            gmst,
          );
          const longitude = satellite.degreesLong(positionGd.longitude);
          const latitude = satellite.degreesLat(positionGd.latitude);
          points.push({ lat: latitude, lng: longitude });
        }
      }
    }
    return points;
  }
}
