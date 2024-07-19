import { Component, OnInit } from '@angular/core';
import { RuleItem } from '../../models/rule-item.model';
import { SettingsService } from '../../services/settings.service';
import { DataGroup, Settings } from '../../models/settings.model';
@Component({
  selector: 'app-rule-isl',
  templateUrl: './rule-isl.component.html',
  styleUrls: ['./rule-isl.component.css']
})
export class RuleIslComponent implements OnInit {
  dataTitle: string='ISL連線規則';
  dataGroup: DataGroup<RuleItem> | undefined;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe(settings => {
      const ruleItemGroup = settings['模擬設定'].find(group => group.dataTitle === this.dataTitle)
      if(this.isRuleItem(ruleItemGroup)){
        this.dataGroup = ruleItemGroup;
      }
    });
  }
  isRuleItem(item: any): item is DataGroup<RuleItem>|undefined {
    return true;
  }
  onRadioChange(item: RuleItem): void {
    item.display = !item.display;
    
    if(this.dataGroup){// 遍歷所有項目並將它們的 display 設置為 false
      this.dataGroup.dataItems.forEach((i: any) => i.display = false);
    }
    // 將選中的項目的 display 設置為 true
    item.display = true;
    this.updateSettings();
  }

  updateSettings(): void {
    // Function to update settingsItem.json
    // (Implementation will be added later)
  }

}
