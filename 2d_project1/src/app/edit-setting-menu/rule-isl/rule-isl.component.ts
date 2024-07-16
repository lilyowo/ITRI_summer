import { RuleSwitch } from './../../models/rule-switch.model';
import { Component, OnInit } from '@angular/core';
import { RuleIsl } from 'src/app/models/rule-isl.model';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-rule-isl',
  templateUrl: './rule-isl.component.html',
  styleUrls: ['./rule-isl.component.css']
})
export class RuleIslComponent implements OnInit {
  ruleIsl: RuleIsl | undefined;
  ruleIslKeys: (keyof RuleIsl)[]=[];
  readOnly:boolean = false;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe(settings => {
      const ruleIslSetting = settings['模擬設定'].find(setting => setting.data_title === 'ISL連線規則');
      if(ruleIslSetting && this.isRuleIsl(ruleIslSetting.data_items[0])){
        this.ruleIsl = ruleIslSetting.data_items[0];
        this.ruleIslKeys = Object.keys(this.ruleIsl) as (keyof RuleIsl)[];
        this.readOnly = ruleIslSetting.read_only;
      }
    });
  }

  isRuleIsl(item: any): item is RuleIsl {
    return true;
    //item && typeof item.AdaptiveRSS === 'boolean' && typeof item.ContextAware === 'boolean' && typeof item.Babel === 'boolean' && typeof item.DREAM === 'boolean' && typeof item.BATMAN === 'boolean';
  }

  onSelectionChange(selectedKey: keyof RuleIsl): void {
    if (this.ruleIsl && !this.readOnly) {
      // Update the ruleRoute object
      this.ruleIslKeys.forEach(key => {
        this.ruleIsl![key] = (key === selectedKey);
      });

      // Function to update JSON (to be implemented)
      this.updateSettings();
    }
  }
  updateSettings(): void {
    // Implement the logic to update the JSON file with new settings
    // This function should call a service method to update the backend or JSON file
  }

}
