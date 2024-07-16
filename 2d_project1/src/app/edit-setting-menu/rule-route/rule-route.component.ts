import { Component, OnInit } from '@angular/core';
import { RuleRoute } from '../../models/rule-route.model';
import { SettingsService } from '../../services/settings.service';
// import { Settings, DataGroup } from '../../models/settings.model';

@Component({
  selector: 'app-rule-route',
  templateUrl: './rule-route.component.html',
  styleUrls: ['./rule-route.component.css']
})
export class RuleRouteComponent implements OnInit {
  ruleRoute: RuleRoute | undefined;
  ruleRouteKeys: (keyof RuleRoute)[] = [];
  readOnly: boolean = false;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe(settings => {
      const ruleRouteSetting = settings['模擬設定'].find(setting => setting.data_title === '路由規則');
      if (ruleRouteSetting && this.isRuleRoute(ruleRouteSetting.data_items[0])) {
        this.ruleRoute = ruleRouteSetting.data_items[0];
        this.ruleRouteKeys = Object.keys(this.ruleRoute) as (keyof RuleRoute)[];
        this.readOnly = ruleRouteSetting.read_only;
      }
    });
  }
  isRuleRoute(item: any): item is RuleRoute {
    return item && typeof item.DSDV === 'boolean' && typeof item.OLSR === 'boolean' && typeof item.Babel === 'boolean' &&
           typeof item.DREAM === 'boolean' && typeof item.BATMAN === 'boolean';
  }

  onSelectionChange(selectedKey: keyof RuleRoute): void {
    if (this.ruleRoute && !this.readOnly) {
      // Update the ruleRoute object
      this.ruleRouteKeys.forEach(key => {
        this.ruleRoute![key] = (key === selectedKey);
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
