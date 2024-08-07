INSERT INTO "SimulationConf" ("projectId", "simuSettings", "simuItems") VALUES 
(
  7, 
  '{
    "路由規則": [
      {"dataTitle": "DSDV", "display": true},
      {"dataTitle": "OLSR", "display": false},
      {"dataTitle": "Babel", "display": false},
      {"dataTitle": "DREAM", "display": false},
      {"dataTitle": "BATMAN", "display": false}
    ],
    "換手規則": [
      {"dataTitle": "Adaptive RSS", "display": true},
      {"dataTitle": "Context-Aware", "display": false},
      {"dataTitle": "Energy-Efficient", "display": false},
      {"dataTitle": "Mobility Pattern", "display": false},
      {"dataTitle": "Multi-Criteria", "display": false},
      {"dataTitle": "Network-Based", "display": false},
      {"dataTitle": "Predictive", "display": false},
      {"dataTitle": "QoS-Oriented", "display": false}
    ],
    "ISL連線規則": [
      {"dataTitle": "MinMaxR", "display": true},
      {"dataTitle": "MinDiffAER", "display": false},
      {"dataTitle": "RelativePhasing", "display": false},
      {"dataTitle": "AlwaysMinR", "display": false}
    ],
    "隨機事件規則": [
      {
        "randomSeed": 0,
        "satLossRate": 0,
        "ISLDisconnectRate": 0,
        "ISLLossRate": 0,
        "CPLLossRate": 0,
        "PacketLossRate": 0
      }
    ]
  }'::jsonb,
  '{
    "衛星間連線": [
      {"dataTitle": "計算指定衛星與相鄰軌道衛星的最小距離", "display": true},
      {"dataTitle": "計算指定衛星與相鄰軌道衛星的平均距離", "display": false},
      {"dataTitle": "計算指定衛星與相鄰軌道衛星的最大距離", "display": false},
      {"dataTitle": "計算指定衛星與相鄰軌道衛星的方位角(A)變化區間", "display": false},
      {"dataTitle": "計算指定衛星與相鄰軌道衛星的幅角(E)變化區間", "display": false},
      {"dataTitle": "計算指定衛星與相鄰軌道衛星的距離(R)變化區間", "display": false},
      {"dataTitle": "計算指定衛星與相鄰軌道衛星的AER標準化變化區間", "display": false},
      {"dataTitle": "計算指定衛星兩條intra ISL的AER隨時間的變化", "display": false},
      {"dataTitle": "計算指定衛星兩條intra ISL的距離隨時間的變化", "display": false},
      {"dataTitle": "計算指定衛星兩條inter ISL的距離隨時間的變化", "display": false},
      {"dataTitle": "計算造成星網中斷的ISL損壞數量比例分佈", "display": false},
      {"dataTitle": "計算造成星網中斷的衛星損壞數量比例分佈", "display": false}
    ],
    "對地輻射": [
      {"dataTitle": "計算指定緯度範圍的輻射覆蓋時間", "display": true},
      {"dataTitle": "計算指定地面站可連線衛星數隨時間的變化", "display": true},
      {"dataTitle": "計算指定地面站可連線衛星的數量分佈", "display": true},
      {"dataTitle": "計算指定地面站理論訊號強度隨時間的變化", "display": true}
    ],
    "路由效能": [
      {"dataTitle": "計算星網任兩衛星最大和平均hop count", "display": true},
      {"dataTitle": "計算星網任兩衛星最大和平均distance", "display": true},
      {"dataTitle": "計算星網任兩衛星路由經過的intra ISL數量分佈", "display": true},
      {"dataTitle": "計算星網任兩衛星路由經過的inter ISL數量分佈", "display": true},
      {"dataTitle": "計算星網任兩衛星路由經過的各條ISL的次數", "display": true},
      {"dataTitle": "計算星網的Routing Table Update控制封包數量", "display": true},
      {"dataTitle": "計算星網任兩衛星的packet loss變化", "display": true}
    ],
    "換手效能": [
      {"dataTitle": "計算所有地面站的衛星換手次數", "display": true},
      {"dataTitle": "計算衛星平均服務時間", "display": true},
      {"dataTitle": "計算換手失敗率", "display": true}
    ]
  }'::jsonb
);