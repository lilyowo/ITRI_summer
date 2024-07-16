import { Orbit } from './orbit.model';
import { Satellite } from './satellite.model';
import { ISL } from './isl.model';
import { Payload } from './payload.model';
import { UT } from './ut.model';
import { FT } from './ft.model';
import { RuleRoute } from './rule-route.model';
import { RuleSwitch } from './rule-switch.model';
import { RuleIsl } from './rule-isl.model';
import { RuleRandom } from './rule-random.model';

export interface DataGroup<T> {
  data_title: string;
  data_items: T[];
  read_only: boolean;
  items_num: number;
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
    DataGroup<RuleRoute>,
    DataGroup<RuleSwitch>,
    DataGroup<RuleIsl>,
    DataGroup<RuleRandom>
  ];
  '模擬項目': DataGroup<any>[];  // 根據需要更新模擬項目的結構
}