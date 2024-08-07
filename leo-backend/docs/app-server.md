## Upload TLE

- Get Constellation

  - method: getConstellation
  - Description: Get constellation by TLE.
  - request:
    ```json
    {
      "apiId": "getConstellation",
      "tleString": "..."
    }
    ```
  - response:
    ```json
    {
      "apiId": "getConstellation",
      "result": {
        "constellationId": 1,
        "constellationName": "example constellation"
      },
      "error": "Failed message"
    }
    ```

- Get Plane
  - method: getPlane
  - Description: Get Plane by TLE.
  - request:
    ```json
    {
      "apiId": "getPlane",
      "tleString": "...",
      "constellationId": 1
    }
    ```
  - response:
    ```json
    {
      "apiId": "getPlane",
      "result":[
        {
          "planeId": 1,
          "inclination": 2.5,
          "raan":2.5,
          "eccentricity":1.5,
          "arg_pe":0.5,
          "altitude":3.0
        },{
          "planeId":2,...
        }
      ],
      "error": "Failed message"
    }
    ```
- Get Satellite
  - method: getSatellite
  - Description: Get Satellite by TLE.
  - request:
    ```json
    {
      "apiId": "getSatellite",
      "tleString": "...",
      "constellationId": 1,
      "planeId": 1
    }
    ```
  - response:
    ```json
    {
      "apiId": "getSatellite",
      "result":[
        {
          "satName": "example satellite",
          "latitude":121.234,
          "longitude":22.345,
          "altitude":20.3,
          "meanAnommaly": 1.5,
          "meanMotion": 2.5,
          "mass":2.5,
          "ISL":[//一個衛星應該四個ISL對吧
            {
              "islId":1,
              "satAzimuth":0.5,
              "satElevation":0.3,
              "lazerAzimuth":0.2,
              "lazerElevation":0.1,
              "lazerRange":0.5
            },{"islId":2~4}
          ],
          "CPL":{//一個衛星應該一個CPL對吧
            "viewAngle": 0.5,
            "beamAngle":0.4,
            "beamCount":0.3,
            "bandwidth":0.2,
            "Beam":[//如果一個CPL多個Beam的話
              {
                "beamId":1,
                "bandwidth":0.1
              }
            ]
          }
        },{
          "satelliteId":2,...
        }
      ],
      "error": "Failed message"
    }
    ```
- Get ISL connection
  - method: getIslConnection
  - Description: Get ISL connection by TLE.
  - request:
    ```json
    {
      "apiId": "getIslConnection",
      "tleString": "...",
      "constellationId": 1
    }
    ```
  - response:
    ```json
    {
      "apiId": "getIslConnection",
      "result": [
        [
          [2, 5, 3],
          [1, 4, 2]
        ],
        [
          [3, 6, 1],
          [4, 2, 3]
        ] //[planeId, satellliteId, islId]
      ],
      "error": "Failed message"
    }
    ```

## Simulation result

- Get Result Satellite Position
  - method: getResultSatellite
  - Description: Get Result satellite position by TLE, GroundStationData and simulation time.
  - request:
    ```json
    {
      "apiId": "getResultSatellite",
      "tleString": "...",
      "groundStation"[
        {
          "gsId":1,
          "cellId":1,
          "type":0, //0 for ut 1 for ft
          "latitude": 121.123,
          "longitude":23.456,
          "altitude":30.5,
          "acceptElevation":20.5
        },...
      ]:,
      "simulationTime": 6000
    }
    ```
  - response:
    ```json
    {
      "apiId": "getResultSatellite",
      "result":[
        {
          "time": 1,
          "position":[
            {
              "satId":1,
              "pos":[121.234, 25.456, 3000]
            },{
              "satId":2,
              "pos":[121.234, 25.456, 3000]
            },...
          ]
        },{
          "time":2,...
        },...,{"time":6000,...}
      ],
      "error": "Failed message"
    }
    ```
- Get Result description and image
  - method: getResultChart
  - Description: Get Result description and image by TLE, GroundStationData and simulation time.
  - request:
    ```json
    {
      "apiId": "getResultChart",
      "tleString": "...",
      "groundStation"[
        {
          "gsId":1,
          "cellId":1,
          "type":0, //0 for ut 1 for ft
          "latitude": 121.123,
          "longitude":23.456,
          "altitude":30.5,
          "acceptElevation":20.5
        },...
      ]:,
      "simulationTime": 6000
    }
    ```
  - response:
    ```json
    {
      "apiId": "getResultChart",
      "result": [
        {
          "description": "衛星編號 216 的最小距離為 460.297 km，是 22 個衛星中最小者；衛星編號 205 的最小距離為 13010.4 km，是 22 個衛星中最大者。",
          "image": "'image'::bytea"
        } //....
      ],
      "error": "Failed message"
    }
    ```
