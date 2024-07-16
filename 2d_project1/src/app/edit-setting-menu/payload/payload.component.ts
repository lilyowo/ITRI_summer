import { Component, OnInit } from '@angular/core';
import { Payload } from '../../models/payload.model';
import { SettingsService } from '../../services/settings.service';
import { DataGroup, Settings } from '../../models/settings.model';


@Component({
  selector: 'app-payload',
  templateUrl: './payload.component.html',
  styleUrls: ['./payload.component.css']
})
export class PayloadComponent implements OnInit {
  payloadData: DataGroup<Payload> | undefined;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((settings: Settings) => {
      const payloadGroup = settings['星網物件'].find(group => group.data_title === '通訊酬載');
      this.payloadData = payloadGroup as DataGroup<Payload>;  
    })
  }

}
