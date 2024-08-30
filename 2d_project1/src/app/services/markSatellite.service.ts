import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopUpSatelliteService } from './popupSatellite.service';
import { ProjectService } from './project.service';
import { SimulationService } from './simulation.service';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MarkSatelliteService {
  constructor(
    private http: HttpClient,
    private popupSatellite: PopUpSatelliteService,
    private projectService: ProjectService,
    private simulationService: SimulationService,
  ) {}
  makeSatelliteMarkers(layer: L.LayerGroup, projectId: number) {
    const markers: L.CircleMarker[] = [];
    this.projectService
      .getFormattedSatellites(projectId)
      .subscribe((satelliteData) => {
        for (const feature of satelliteData.features) {
          const lon = feature.geometry.coordinates[0];
          const lat = feature.geometry.coordinates[1];
          const circle = L.circleMarker([lat, lon], {
            radius: 5,
            // color: '#7f1084',
            color: 'red',
            pane: 'satellitePane',
          });
          circle.bindPopup(
            this.popupSatellite.makeSatellitePopup(feature.properties),
            { pane: 'popupPane' },
          );
          markers.push(circle);
          layer.addLayer(circle);

          const lonMirror = lon < 0 ? lon + 360 : lon - 360;
          const circleMirror = L.circleMarker([lat, lonMirror], {
            radius: 5,
            // color: '#7f1084',
            color: 'red',
            pane: 'satellitePane',
          });
          circleMirror.bindPopup(
            this.popupSatellite.makeSatellitePopup(feature.properties),
            { pane: 'popupPane' },
          );
          markers.push(circleMirror);
          layer.addLayer(circleMirror);
        }
      });
  }

  makeSatelliteConnections(layer: L.LayerGroup, projectId: number) {
    console.log('makeSatelliteConnections called');
    this.projectService.getFormattedIsls(projectId).subscribe((islData) => {
      console.log('makeSatelliteConnections:islData', islData);
      for (const feature of islData.features) {
        const coordinates = feature.geometry.coordinates;
        const lon1 = coordinates[0][1];
        const lat1 = coordinates[0][0];
        const lon2 = coordinates[1][1];
        const lat2 = coordinates[1][0];
        const lonAdjusted1 = lon1 < 0 ? lon1 + 360 : lon1 - 360;
        const lonAdjusted2 = lon2 < 0 ? lon2 + 360 : lon2 - 360;

        // 檢查是否跨越換頁線
        if (Math.abs(lon1 - lon2) > 180) {
          // 繪製線段的左側部分
          const lineLeft = L.polyline(
            [
              [lat1, lon1],
              [lat2, lonAdjusted2],
            ],
            { color: 'gray', pane: 'planePane' },
          );
          layer.addLayer(lineLeft);

          // 繪製線段的右側部分
          const lineRight = L.polyline(
            [
              [lat1, lonAdjusted1],
              [lat2, lon2],
            ],
            { color: 'gray', pane: 'planePane' },
          );
          layer.addLayer(lineRight);
        } else {
          // 線段不跨越換頁線，直接繪製
          const line = L.polyline(
            [
              [lat1, lon1],
              [lat2, lon2],
            ],
            { color: 'gray', pane: 'planePane' },
          );
          layer.addLayer(line);
          if (
            (lonAdjusted1 >= 0 && lonAdjusted2 >= 0) ||
            (lonAdjusted1 < 0 && lonAdjusted2 < 0)
          ) {
            const lineMirror = L.polyline(
              [
                [lat1, lonAdjusted1],
                [lat2, lonAdjusted2],
              ],
              { color: 'gray', pane: 'planePane' },
            );
            layer.addLayer(lineMirror);
          }
        }
      }
    });
  }
  makeSatelliteMarkersAtTime(
    layer: L.LayerGroup,
    projectId: number,
    time: number,
  ) {
    const data = this.simulationService.getDataAtTime(time);
    if (!data) return;

    layer.clearLayers();

    for (const satellite of data.satellitesPos) {
      const lon = satellite.longitude;
      const lat = satellite.latitude;
      const alt = satellite.altitude;
      const circle = L.circleMarker([lat, lon], {
        radius: 5,
        color: 'red',
        pane: 'satellitePane',
      });

      // 添加 click 事件監聽器
      circle.on('click', () => {
        this.popupSatellite
          .makeSatellitePopupWithDB(
            projectId,
            satellite.satelliteId,
            lon,
            lat,
            alt,
          )
          .then((popupContent) => {
            circle.bindPopup(popupContent, { pane: 'popupPane' });
          });
        console.log("show satellite's info");
      });
      layer.addLayer(circle);

      // 添加鏡像衛星標記
      const lonMirror = lon < 0 ? lon + 360 : lon - 360;
      const circleMirror = L.circleMarker([lat, lonMirror], {
        radius: 5,
        color: 'red',
        pane: 'satellitePane',
      });
      // 添加 click 事件監聽器
      circleMirror.on('click', () => {
        this.popupSatellite
          .makeSatellitePopupWithDB(
            projectId,
            satellite.satelliteId,
            lon,
            lat,
            alt,
          )
          .then((popupContent) => {
            circleMirror.bindPopup(popupContent, { pane: 'popupPane' });
          });
        console.log("show satellite's info");
      });
      layer.addLayer(circleMirror);
    }
  }

  makeSatelliteConnectionsAtTime(
    layer: L.LayerGroup,
    projectId: number,
    time: number,
  ) {
    const data = this.simulationService.getDataAtTime(time);
    if (!data) return;

    // layer.clearLayers();

    for (const connection of data.islConnect) {
      const satA = data.satellitesPos.find(
        (s: { satelliteId: number }) => s.satelliteId === connection[0],
      );
      const satB = data.satellitesPos.find(
        (s: { satelliteId: number }) => s.satelliteId === connection[1],
      );

      if (!satA || !satB) continue;

      const lon1 = satA.longitude;
      const lat1 = satA.latitude;
      const lon2 = satB.longitude;
      const lat2 = satB.latitude;

      const lonAdjusted1 = lon1 < 0 ? lon1 + 360 : lon1 - 360;
      const lonAdjusted2 = lon2 < 0 ? lon2 + 360 : lon2 - 360;

      if (Math.abs(lon1 - lon2) > 180) {
        // 跨越換頁線的情況
        const lineLeft = L.polyline(
          [
            [lat1, lon1],
            [lat2, lonAdjusted2],
          ],
          { color: 'gray', pane: 'planePane' },
        );
        layer.addLayer(lineLeft);

        const lineRight = L.polyline(
          [
            [lat1, lonAdjusted1],
            [lat2, lon2],
          ],
          { color: 'gray', pane: 'planePane' },
        );
        layer.addLayer(lineRight);
      } else {
        // 不跨越換頁線的情況

        const line = L.polyline(
          [
            [lat1, lon1],
            [lat2, lon2],
          ],
          { color: 'gray', pane: 'planePane' },
        );
        layer.addLayer(line);

        if (
          (lonAdjusted1 >= 0 && lonAdjusted2 >= 0) ||
          (lonAdjusted1 < 0 && lonAdjusted2 < 0)
        ) {
          const lineMirror = L.polyline(
            [
              [lat1, lonAdjusted1],
              [lat2, lonAdjusted2],
            ],
            { color: 'gray', pane: 'planePane' },
          );
          layer.addLayer(lineMirror);
        }
      }
    }
  }
}
