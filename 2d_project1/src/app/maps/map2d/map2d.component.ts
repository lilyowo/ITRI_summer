import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../../services/marker.service';
import { ProjectService } from 'src/app/services/project.service';
import { MarkSatelliteService } from 'src/app/services/markSatellite.service';

@Component({
  selector: 'app-map2d',
  templateUrl: './map2d.component.html',
  styleUrls: ['./map2d.component.css'],
})
export class Map2dComponent implements AfterViewInit {
  private map!: L.Map;
  @Input() projectId!: number;
  private satelliteLayer: L.LayerGroup = L.layerGroup(); 

  constructor(
    private markerService: MarkerService,
    private projectService: ProjectService,
    private markSatelliteService: MarkSatelliteService,
  ) {}

  private initMap(): void {
    this.map = L.map('map', {
      // center: [39.8282, -98.5795],
      center: [25.0374, 121.5645],
      zoom: 4,
      worldCopyJump: true, // 環繞地圖
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 2,
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
    this.markerService.makePlaneMarkers(this.map, this.projectId);
  }
  private loadSatellites(): void {
    this.markSatelliteService.makeSatelliteMarkers(this.satelliteLayer, this.projectId);
  }

  public reloadMap(): void {
    if (this.map) {
      this.map.remove(); // Remove the existing map instance
    }
    this.initMap(); // Reinitialize the map
    this.loadMarkers(); // Reload markers
    this.loadSatellites();// Reload satellite markers
  }

  handleDataUpdated(): void {
    setTimeout(() => {
      this.reloadMap(); // Reload the map after 1 second
      console.log('map 2D has been reloaded.');
    }, 1000);
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    const data = event.dataTransfer?.getData('text');
    if (data === 'UT') {
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        const rect = mapContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const latlng = this.map.containerPointToLatLng([x, y]);

        L.circleMarker(latlng, { radius: 5, color: 'green' }).addTo(this.map);

        this.insertDataIntoDatabase(latlng.lat, latlng.lng, 0);

        
      }
    }

    if (data === 'FT') {
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        const rect = mapContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const latlng = this.map.containerPointToLatLng([x, y]);

        L.circleMarker(latlng, { radius: 5, color: 'blue' }).addTo(this.map);

        this.insertDataIntoDatabase(latlng.lat, latlng.lng,1);
      }
    }
  }

  insertDataIntoDatabase(lat: number, lng: number, type: number) {
    console.log(
      `Inserting data into database: Latitude = ${lat}, Longitude = ${lng}`,
    );
    this.projectService
          .insertGroundStation(this.projectId, lng, lat, type)
          .subscribe(
            (response) => {
              console.log('Ground Station added successfully', response);
            },
            (error) => {
              console.error('Error adding Ground Station', error);
            },
          );
        setTimeout(() => {
          this.reloadMap(); // Reload the map after 1 second
          console.log('map 2D has been reloaded.');
        }, 1000);
  }
}
