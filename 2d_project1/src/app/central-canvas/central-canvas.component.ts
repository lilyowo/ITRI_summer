import { Component, AfterViewInit, Input} from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../services/marker.service';

@Component({
  selector: 'app-central-canvas',
  templateUrl: './central-canvas.component.html',
  styleUrls: ['./central-canvas.component.css']
})
export class CentralCanvasComponent implements AfterViewInit {
  
  @Input() view: string='2D View';
  private map!:L.Map;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      // center: [ 25.0374, 121.5645 ],
      zoom: 3,
      worldCopyJump: true // 環繞地圖
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);
  }
}
