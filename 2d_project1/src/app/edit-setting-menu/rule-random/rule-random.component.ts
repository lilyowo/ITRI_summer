import { Component, OnInit } from '@angular/core';
import { RuleRandom } from 'src/app/models/rule-random.model';
import { SettingsService } from '../../services/settings.service';
import { DataGroup, Settings } from '../../models/settings.model';


@Component({
  selector: 'app-rule-random',
  templateUrl: './rule-random.component.html',
  styleUrls: ['./rule-random.component.css']
})
export class RuleRandomComponent implements OnInit {
  ruleRandomData: DataGroup<RuleRandom> | undefined;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((settings:Settings) => {
      const ruleRandomGroup = settings['模擬設定'].find(group => group.dataTitle=='隨機事件規則');
      this.ruleRandomData = ruleRandomGroup as DataGroup<RuleRandom>;
    })
  }

}
