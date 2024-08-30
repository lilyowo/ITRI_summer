import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopUpGroundStationService } from './popupGroundStation.service';
import { ProjectService } from './project.service';
import { TaskService } from './task.service';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  deleteStart = new EventEmitter<void>();
  deleteEnd = new EventEmitter<void>();
  constructor(
    private http: HttpClient,
    private popupService: PopUpGroundStationService,
    private projectService: ProjectService,
    private taskService: TaskService,
  ) {}

  makeGroundStationMarkers(map: L.Map, projectId: number): void {
    const markers: L.CircleMarker[] = [];
    this.projectService.getFormattedGroundStations(projectId).subscribe(
      (groundStationData) => {
        // 處理 UT 數據
        this.processGroundStations(
          groundStationData.ut,
          map,
          markers,
          'green',
          0,
        );
        // 處理 FT 數據
        this.processGroundStations(
          groundStationData.ft,
          map,
          markers,
          'blue',
          1,
        );
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
    type: number,
  ): void {
    for (const feature of data.features) {
      const lon = feature.geometry.coordinates[0];
      const lat = feature.geometry.coordinates[1];

      // 原始位置的 marker
      const circle = L.circleMarker([lat, lon], {
        radius: 5,
        color: color,
        pane: 'gsPane',
      }).addTo(map);
      circle.bindPopup(
        this.popupService.makeGroundStationPopup(feature.properties),
        { pane: 'popupPane' },
      );
      this.addDeleteContextMenu(circle, feature, map, type);
      markers.push(circle);

      // 镜像位置的 marker
      const lonMirror = lon < 0 ? lon + 360 : lon - 360;
      const circleMirror = L.circleMarker([lat, lonMirror], {
        radius: 5,
        color: color,
        pane: 'gsPane',
      }).addTo(map);
      circleMirror.bindPopup(
        this.popupService.makeGroundStationPopup(feature.properties),
        { pane: 'popupPane' },
      );
      this.addDeleteContextMenu(circleMirror, feature, map, type);
      markers.push(circleMirror);
    }
  }

  // 分离出来的删除功能，便于代码重用
  private addDeleteContextMenu(
    circle: L.CircleMarker,
    feature: any,
    map: L.Map,
    type: number,
  ): void {
    circle.on('contextmenu', (e) => {
      if (confirm('Are you sure you want to delete this marker?')) {
        this.deleteStart.emit();
        this.projectService
          .deleteGroundStation(feature.properties.gsId, type)
          .subscribe(
            (response) => {
              console.log('Ground station deleted successfully', response);
              map.removeLayer(circle);
            },
            (error) => {
              console.error('Error deleting ground station', error);
            },
          );
        this.taskService.deleteGroundStation(feature.properties.gsId).subscribe(
          () => {
            console.log('GroundStation deleted.');
            this.deleteEnd.emit();
          },
          (error) => {
            console.error('Error deleting GroundStation:', error);
            this.deleteEnd.emit();
          },
        );
      }
    });
  }
}
