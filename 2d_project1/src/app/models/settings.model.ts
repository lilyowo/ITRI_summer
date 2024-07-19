import { Orbit } from './orbit.model';
import { Satellite } from './satellite.model';
import { ISL } from './isl.model';
import { Payload } from './payload.model';
import { UT } from './ut.model';
import { FT } from './ft.model';
import { RuleItem } from './rule-item.model';
import { SimuItem } from './simu-item.model';
import { RuleRandom } from './rule-random.model';

export interface DataGroup<T> {
  dataTitle: string;
  dataItems: T[];
  readOnly: boolean;
  itemsNum: number;
}

export interface Settings {
  '星網物件': [
    DataGroup<Orbit>,
    DataGroup<Satellite>,
    DataGroup<ISL>,
    DataGroup<Payload>,
    DataGroup<UT>,
    DataGroup<FT>
  ];
  '模擬設定': [
    DataGroup<RuleItem>,
    DataGroup<RuleRandom>
  ];
  '模擬項目': [
    DataGroup<SimuItem> 
  ];
  
}