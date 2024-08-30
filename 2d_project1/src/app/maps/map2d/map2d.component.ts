import {
  Component,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../../services/marker.service';
import { ProjectService } from 'src/app/services/project.service';
import { MarkSatelliteService } from 'src/app/services/markSatellite.service';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-map2d',
  templateUrl: './map2d.component.html',
  styleUrls: ['./map2d.component.css'],
})
export class Map2dComponent implements AfterViewInit {
  private map!: L.Map;
  @Input() projectId!: number;
  @Output() uploadStart = new EventEmitter<void>();
  @Output() uploadEnd = new EventEmitter<void>();
  private satelliteLayer: L.LayerGroup = L.layerGroup();

  constructor(
    private markerService: MarkerService,
    private projectService: ProjectService,
    private markSatelliteService: MarkSatelliteService,
    private taskService: TaskService,
  ) {
    // 訂閱 MarkerService 的事件
    this.markerService.deleteStart.subscribe(() => {
      this.uploadStart.emit(); // 開始 loading
    });

    this.markerService.deleteEnd.subscribe(() => {
      this.uploadEnd.emit(); // 結束 loading
    });
  }

  private initMap(): void {
    const southWest = L.latLng(-85, -360); // 最南西的坐標 (最小緯度, 最小經度)
    const northEast = L.latLng(85, 360); // 最北東的坐標 (最大緯度, 最大經度)
    const bounds = L.latLngBounds(southWest, northEast);
    this.map = L.map('map', {
      // center: [39.8282, -98.5795],//美洲
      center: [20.0374, 121.5645], //台灣上空
      // center: [4.8, 21.6],//非洲上方
      zoom: 3,
      worldCopyJump: true, // 環繞地圖
      maxBoundsViscosity: 1.0, // 控制用戶拖動時的粘性，1.0 表示完全無法拖出邊界
      maxBounds: bounds,
    });
    // 创建自定义的 pane
    this.map.createPane('satellitePane');
    this.map.getPane('satellitePane')!.style.zIndex = '700';
    this.map.createPane('planePane');
    this.map.getPane('planePane')!.style.zIndex = '600';
    this.map.createPane('gsPane');
    this.map.getPane('gsPane')!.style.zIndex = '700';
    this.map.createPane('popupPane');
    this.map.getPane('popupPane')!.style.zIndex = '800';
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      },
    );

    tiles.addTo(this.map);
    this.satelliteLayer.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.loadMarkers();
    this.loadSatellites();
  }

  private loadMarkers(): void {
    this.markerService.makeGroundStationMarkers(this.map, this.projectId);
  }
  private loadSatellites(): void {
    this.markSatelliteService.makeSatelliteConnections(
      this.satelliteLayer,
      this.projectId,
    );
    this.markSatelliteService.makeSatelliteMarkers(
      this.satelliteLayer,
      this.projectId,
    );
  }

  public reloadMap(): void {
    if (this.map) {
      this.map.remove(); // Remove the existing map instance
    }
    this.initMap(); // Reinitialize the map
    this.loadMarkers(); // Reload markers
    this.loadSatellites(); // Reload satellite markers
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    const data = event.dataTransfer?.getData('text');
    if (data === 'UT') {
      this.uploadStart.emit(); // 通知上層開始上傳
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        const rect = mapContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const latlng = this.map.containerPointToLatLng([x, y]);

        L.circleMarker(latlng, { radius: 5, color: 'green' }).addTo(this.map);

        // const gsId = this.insertDataIntoDatabase(latlng.lat, latlng.lng, 0);
        const res = this.addGroundStation(latlng, 0);
      }
    }

    if (data === 'FT') {
      this.uploadStart.emit(); // 通知上層開始上傳
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        const rect = mapContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const latlng = this.map.containerPointToLatLng([x, y]);

        L.circleMarker(latlng, { radius: 5, color: 'blue' }).addTo(this.map);

        // this.insertDataIntoDatabase(latlng.lat, latlng.lng, 1);
        const res = this.addGroundStation(latlng, 1);
      }
    }
  }

  insertDataIntoDatabase(
    lat: number,
    lng: number,
    type: number,
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      console.log(
        `Inserting data into database: Latitude = ${lat}, Longitude = ${lng}`,
      );
      this.projectService
        .insertGroundStation(this.projectId, lng, lat, type)
        .subscribe(
          (response) => {
            console.log('Ground Station added successfully', response);
            const gsId = response.gsId;

            setTimeout(() => {
              this.reloadMap(); // Reload the map after 1 second
              console.log('map 2D has been reloaded.');
              resolve(gsId);
            }, 1000);
          },
          (error) => {
            console.error('Error adding Ground Station', error);
            reject(error);
          },
        );
    });
  }

  async addGroundStation(latlng: L.LatLng, type: number) {
    try {
      const gsId = await this.insertDataIntoDatabase(
        latlng.lat,
        latlng.lng,
        type,
      );
      console.log('Ground station ID:', gsId);
      if (gsId) {
        const gsInfo = {
          gsId: gsId,
          latitude: latlng.lat,
          longitude: latlng.lng,
          type: type,
        };
        const result = await this.taskService
          .addGroundStation(this.projectId, gsInfo)
          .toPromise();
        console.log('Ground station added:', result);
        this.uploadEnd.emit(); // 通知上層上傳結束
      }
    } catch (error) {
      console.error('Error adding ground station:', error);
      // 在這裡處理錯誤
    }
  }

  updateSatellitePositions(time: number) {
    // this.satelliteLayer.clearLayers();
    this.markSatelliteService.makeSatelliteMarkersAtTime(
      this.satelliteLayer,
      this.projectId,
      time,
    );
    this.markSatelliteService.makeSatelliteConnectionsAtTime(
      this.satelliteLayer,
      this.projectId,
      time,
    );
    console.log(time);
  }
}
