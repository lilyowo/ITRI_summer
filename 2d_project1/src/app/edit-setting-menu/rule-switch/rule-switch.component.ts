import { Component, OnInit } from '@angular/core';
import { RuleSwitch } from 'src/app/models/rule-switch.model';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-rule-switch',
  templateUrl: './rule-switch.component.html',
  styleUrls: ['./rule-switch.component.css']
})
export class RuleSwitchComponent implements OnInit {
  ruleSwitch: RuleSwitch | undefined;
  ruleSwitchKeys: (keyof RuleSwitch)[]=[];
  readOnly:boolean = false;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe(settings => {
      const ruleSwitchSetting = settings['模擬設定'].find(setting => setting.data_title === '換手規則');
      if (ruleSwitchSetting && this.isRuleSwitch(ruleSwitchSetting.data_items[0])){
        this.ruleSwitch = ruleSwitchSetting.data_items[0];
        this.ruleSwitchKeys = Object.keys(this.ruleSwitch)  as (keyof RuleSwitch)[];
        this.readOnly = ruleSwitchSetting.read_only;
      }
    });
  }

  isRuleSwitch(item: any): item is RuleSwitch {
    return true;
    //item && typeof item.AdaptiveRSS === 'boolean' && typeof item.ContextAware === 'boolean' && typeof item.Babel === 'boolean' && typeof item.DREAM === 'boolean' && typeof item.BATMAN === 'boolean';
  }

  onSelectionChange(selectedKey: keyof RuleSwitch): void {
    if (this.ruleSwitch && !this.readOnly) {
      // Update the ruleRoute object
      this.ruleSwitchKeys.forEach(key => {
        this.ruleSwitch![key] = (key === selectedKey);
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
