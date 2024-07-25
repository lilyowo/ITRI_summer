import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopUpService } from './popup.service';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/usa-capitals.geojson';
  utData: string = '/assets/data/ut.geojson';

  constructor(
    private http: HttpClient,
    private popupService: PopUpService
  ) { }

  makeCapitalMarkers(map: L.Map):void{
    const markers: L.CircleMarker[] = [];
    
    this.http.get(this.capitals).subscribe((res: any) => {
        for(const c of res.features){
            const lon = c.geometry.coordinates[0];
            const lat = c.geometry.coordinates[1];
            const circle = L.circleMarker([lat, lon], { radius: 5 ,color:'blue'} );
            // console.log("I'm working!!!!owo");
            // console.log([lat,lon]);
            circle.bindPopup(this.popupService.makeCapitalPopup(c.properties));
            circle.addTo(map);
            markers.push(circle);
        }
        // const bounds = L.featureGroup(markers).getBounds();
        // map.fitBounds(bounds);
    });

    this.http.get(this.utData).subscribe((res: any) => {
      for(const c of res.features){
          const lon = c.geometry.coordinates[0];
          const lat = c.geometry.coordinates[1];
          const circle = L.circleMarker([lat, lon], { radius: 5 ,color:'green'} );
          // console.log("I'm working!!!!owo");
          // console.log([lat,lon]);
          circle.addTo(map);
          markers.push(circle);
      }
      // const bounds = L.featureGroup(markers).getBounds();
      // map.fitBounds(bounds);
  });
    

  }
}