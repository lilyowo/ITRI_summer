import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopUpSatelliteService } from './popupSatellite.service';
import { ProjectService } from './project.service';
import * as L from 'leaflet';

@Injectable({
    providedIn: 'root',
  })
  export class MarkSatelliteService{
    constructor(
        private http: HttpClient,
        private popupSatellite: PopUpSatelliteService,
        private projectService: ProjectService,
      ) {}
    makeSatelliteMarkers(layer:L.LayerGroup, projectId: number){
        const markers: L.CircleMarker[] = [];
        this.projectService.getFormattedSatellites(projectId).subscribe(
            (satelliteData) => {
                for (const feature of satelliteData.features){
                    const lon = feature.geometry.coordinates[0];
                    const lat = feature.geometry.coordinates[1];
                    const circle = L.circleMarker([lat, lon],{
                        radius:5,
                        color:'yellow',
                    });
                    circle.bindPopup(this.popupSatellite.makeSatellitePopup(feature.properties),);
                    markers.push(circle);
                    layer.addLayer(circle);
                }
            }
        );
    }
  }