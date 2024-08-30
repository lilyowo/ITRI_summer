## Upload TLE

- Get Constellation

  - method: getConstellation
  - Description: Get constellation by TLE.
  - request:
    ```json
    {
      "apiId": "getConstellation",
      "param": {
        "tleString": "..."
      }
    }
    ```
  - response:
    ```json
    {
      "apiId": "getConstellation",
      "result": {
        "Planes": [
            {
                "planeId": 1,
                "inclination": 29.0155,
                "raan": 0.0186,
                "eccentricity": 0.000511,
                "arg_pe": 264.8931,
                "altitude": 800.0,
                "Satellites": [
                  {
                    "satelliteId":1,
                    "latitude": -0.0048443,
                    "longitude": -40.4956,
                    "altitude": 800.0,
                    "meanAnomaly": 0.0,
                    "meanMotion": 0.0
                },...
              ]
            },
            {
                "planeId": 2,
                .....
            }
        ]
    },
      "error": "Failed message"
    }
    ```

- Set ISL config

  - method: setIslConfig
  - Description: Make isl connect info with default isl connection algorithm and tle string
  - request:
    ```json
    {
      "apiId": "setIslConfig",
      "param": {
        "islConfig": {
          "satAzimuth": 1,
          "satElevation": 2,
          "laserAzimuth": 3,
          "laserElevation": 4,
          "laserRange": 5
        }
      }
    }
    ```
  - response:
    ```json
    {
      "apiId": "setIslConfig",
      "result": [
        [101,102],
        [102,103],...
      ]
    }
    ```

- Add Ground Station

  - method: setGroundStation
  - Description: set Ground Station (type: 0 for UT, 1 for FT)
  - request:
    ```json
    {
      "apiId": "addGroundStation",
      "param": {
        "latitude": -0.0048443,
        "longitude": -40.4956,
        "type": 1,
        "gsId": 8
      }
    }
    ```
  - response: groundStationId: -1 for failure
    ```json
    {
      "apiId": "addGroundStation",
      "result": {
        "groundStationId": 8
      }
    }
    ```

- Delete Ground Station

  - method: setGroundStation
  - Description: set Ground Station (type: 0 for UT, 1 for FT)
  - request:
    ```json
    {
      "apiId": "deleteGroundStation",
      "param": {
        "gsId": 1
      }
    }
    ```
  - response:
    ```json
    {
      "apiId": "deleteGroundStation",
      "result": {
        "message": "Delete ground station"
      }
    }
    ```

- Modify Ground Station
  - method: setGroundStation
  - Description: set Ground Station (type: 0 for UT, 1 for FT). In addition to gsId and type, which are always transmitted, the rest, such as latitude, come from the modified field and value, so they may be different in each time.
  - request:
    ```json
    {
      "apiId": "modifyGroundStation",
      "param": {
        "gsId": 1,
        "latitude": -0.0048443,
        "type": 0
      }
    }
    ```
  - response:
    ```json
    {
      "apiId": "modifyGroundStation",
      "result": {
        "message": "Modify ground station"
      }
    }
    ```
- Set CPL config

  - method: setCplConfig
  - Description: Send CPL settings to server
  - request:
    ```json
    {
      "apiId": "setCplConfig",
      "param": {
        "cplSettings": {
          "viewAngle": 45,
          "beamAngle": 90,
          "beamCount": 1,
          "bandwidth": 1450,
          "beamBandwidth": 3000
        }
      }
    }
    ```
  - response:
    ```json
    {
      "message": "set cpl config"
    }
    ```

- Set Simulation Config

  - method: setSimConfig
  - Description: Send Simulation configuration to server
  - request:

  ```json
  {
    "apiId": "setSimConfig",
    "param":{
      "simSettings":{
        "handoverStrategy": "Adaptive RSS",
        "routingStrategy": "DSDV",
        "islMethod": "MinMaxR",
        "randomEvent": {
          "randomSeed": 1234,
          "satBreak": 0.0001,
          "islBreak": 0.0001,
          "cplBreak": 0.0001,
          "packetLoss": 0.0001,
        }
      },
      "simuItems"{
        "constellation": ["minDistance", "avgDistance", "maxDistance", "angel", "elavation", "range", "aer", "intraIslAer", "intraIslDistance", "interIslDistance", "islBreakDistribution", "satBreakDistributin" ],
        "ground": ["coverage", "connectedSatTime", "connectedSatCount", "connectedSatSignal"],
        "routing": ["hopCount", "distance", "intraIslDistribution", "interIslDistribution", "islDistribution", "rtuCount", "packetLoss"],
        "handover": ["handoverCount", "AverageSatServiceTime", "HandoverFailCount"],
      }
    }
  }
  ```

  - response:

  ```json
  {
    "message": "set simulation config"
  }
  ```

## Simulation result

- Get Satellite Info

  - method: makeSimulationResult
  - Description: use simulation time, settings, items to make simulation result. The result include satellites' positions and connections with time and report information.
  - request:

  ```json
  {
    "apiId": "makeSimulationResult",
    "param": {
      "simuTime": 6000
    }
  }
  ```

- Make Simulation Result

  - method: makeSimulationResult
  - Description: use simulation time, settings, items to make simulation result. The result include satellites' positions and connections with time and report information.
  - request:

  ```json
  {
    "apiId": "makeSimulationResult",
    "param": {
      "simuTime": 60
    }
  }
  ```

  - response:

  ```json
  {
    "simulationResult":{
      "simulationInfo":[
        {
            "time":1,
            "satellitesPos":[
                {
                    "satelliteId":1,
                    "latitude": 121.123,
                    "longitude":23.456,
                    "altitude":30.5
                },
                {
                    "satelliteId":2,
                    "latitude": 121.123,
                    "longitude":23.456,
                    "altitude":30.5
                }
            ],
            "islConnect":[[1,2],[2,3]], //sat id - sat id
            "cplConnect":[[1,2],[2,3]], //sat id - ground station id
        },{
            "time":2,
            "satellitesPos":[],
            "islConnect":[],
            "cplConnect":[]
        }

      ],
      "reportInfo":[
        {
            "dataTitle":"計算指定衛星與相鄰軌道衛星的最小距離",
            "description": "這個描述留給 +title+ 的資料來使用",
            "data":{
              "header":["throughput", "latency", "hop", "distance", "loss", "rx_buffer", "tx_buffer"],
              "content":[[0.000914962, 59.0556, 6.00462, 17695.7, 0.0814261, 4500, 0],...]
            }
        },
      ]
    }
  }
  ```
