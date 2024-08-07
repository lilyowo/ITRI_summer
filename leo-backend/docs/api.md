## User

- User Login

  - method: POST
  - URL: `/auth/login`
  - Description: User login and get token
  - request:
    ```json
    {
      "email": "k200@itri.org.tw",
      "password": "k200"
    }
    ```
  - response:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

- Forget Password

  - method: POST
  - URL: `/auth/forget-password`
  - Description: User login and get token
  - request:
    ```json
    {
      "email": "k200@itri.org.tw"
    }
    ```
  - response:
    ```json
    {
      "message": "Please contact email: k200support@itri.org.tw"
    }
    ```

- Loing History

  - method: Post
  - URL: `/auth/loginHistory`
  - Description: Record User login timestamp
  - request:
    ```json
    {
        "userId":
    }
    ```
  - response:
    ```json
    {
      "historyId": 1,
      "userId": 1,
      "timestamp": "2024-07-22 15:28:29.951457"
    }
    ```

## Project

- Get all projects

  - method: GET
  - URL: `/project/user/:userId`
  - Description: use userId get all projects of this user.
  - request:
    ```json
    {
      "userId": 1
    }
    ```
  - response:
    ```json
    {
      "projectId": 1,
      "projectName": "project 1 ",
      "lastEditTime": "2024-07-22 15:28:29.951457"
    }
    ```

- Create project

  - method: PSOT
  - URL: `/project`
  - Description: create new project for this user.
  - request:
    ```json
    {
      "userId": 1,
      "projectName": "Project number one"
    }
    ```
  - response:
    ```json
    {
      "message": "Project added successfully"
    }
    ```

- Delete project

  - method: DELETE
  - URL: `/project/delete/:projectId`
  - Description: delete the project by projectId
  - request:
    ```json
    {
      "projectId": 1
    }
    ```
  - response:
    ```json
    {
      "message": "Project deleted successfully"
    }
    ```

- Search project

  - method: GET
  - URL: `/project/search/user/:userId`
  - Description: search projects by its name prefix
  - request:
    ```json
    {
      "userId": 1,
      "query": "Project"
    }
    ```
  - response:
    ```json
    {
      "projectId": 1,
      "projectName": "project 1 ",
      "lastEditTime": "2024-07-22 15:28:29.951457"
    }
    ```

## Project - Report

- Get all reports

  - method: GET
  - URL: `/project/report/:projectId`
  - Description: Get all reports by projectId.
  - request:
    ```json
    {
      "projectId": 3
    }
    ```
  - response:
    ```json
    {
      "reportId": 1,
      "reportName": "[simulation] Project 1",
      "simuTime": "2024-07-22 15:28:29.951457"
    }
    ```

- Get recent reports

  - method: GET
  - URL: `/project/recent/:userId`
  - Description: Get recent report of this user by userId.
  - request:
    ```json
    {
      "userId": 3
    }
    ```
  - response:
    ```json
    {
      "reportId": 1,
      "reportName": "[simulation] Project 1"
    }
    ```

## Project - Simulation Configuration

- Get Simulation settings

  - method: GET
  - URL: `/project/simuSettings/:projectId`
  - Description: Get simulation settings by projectId
  - request:
    ```json
    {
      "projectId": 3
    }
    ```
  - response:
    ```json
    {
      "路由規則": [
        { "dataTitle": "DSDV", "display": true },
        { "dataTitle": "OLSR", "display": false },
        { "dataTitle": "Babel", "display": false },
        { "dataTitle": "DREAM", "display": false },
        { "dataTitle": "BATMAN", "display": false }
      ],
      "換手規則": [
        { "dataTitle": "Adaptive RSS", "display": true },
        { "dataTitle": "Context-Aware", "display": false },
        { "dataTitle": "Energy-Efficient", "display": false },
        { "dataTitle": "Mobility Pattern", "display": false },
        { "dataTitle": "Multi-Criteria", "display": false },
        { "dataTitle": "Network-Based", "display": false },
        { "dataTitle": "Predictive", "display": false },
        { "dataTitle": "QoS-Oriented", "display": false }
      ],
      "ISL連線規則": [
        { "dataTitle": "MinMaxR", "display": true },
        { "dataTitle": "MinDiffAER", "display": false },
        { "dataTitle": "RelativePhasing", "display": false },
        { "dataTitle": "AlwaysMinR", "display": false }
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
    }
    ```

- Get simulation items

  - method: GET
  - URL: `/project/simuItems/:projectId`
  - Description: Get simulation Items by projectId
  - request:
    ```json
    {
      "projectId": 3
    }
    ```
  - response:
    ```json
    {
      "衛星間連線": [
        {
          "dataTitle": "計算指定衛星與相鄰軌道衛星的最小距離",
          "display": true
        },
        {
          "dataTitle": "計算指定衛星與相鄰軌道衛星的平均距離",
          "display": false
        },
        {
          "dataTitle": "計算指定衛星與相鄰軌道衛星的最大距離",
          "display": false
        },
        {
          "dataTitle": "計算指定衛星與相鄰軌道衛星的方位角(A)變化區間",
          "display": false
        },
        {
          "dataTitle": "計算指定衛星與相鄰軌道衛星的幅角(E)變化區間",
          "display": false
        },
        {
          "dataTitle": "計算指定衛星與相鄰軌道衛星的距離(R)變化區間",
          "display": false
        },
        {
          "dataTitle": "計算指定衛星與相鄰軌道衛星的AER標準化變化區間",
          "display": false
        },
        {
          "dataTitle": "計算指定衛星兩條intra ISL的AER隨時間的變化",
          "display": false
        },
        {
          "dataTitle": "計算指定衛星兩條intra ISL的距離隨時間的變化",
          "display": false
        },
        {
          "dataTitle": "計算指定衛星兩條inter ISL的距離隨時間的變化",
          "display": false
        },
        {
          "dataTitle": "計算造成星網中斷的ISL損壞數量比例分佈",
          "display": false
        },
        {
          "dataTitle": "計算造成星網中斷的衛星損壞數量比例分佈",
          "display": false
        }
      ],
      "對地輻射": [
        { "dataTitle": "計算指定緯度範圍的輻射覆蓋時間", "display": true },
        {
          "dataTitle": "計算指定地面站可連線衛星數隨時間的變化",
          "display": true
        },
        { "dataTitle": "計算指定地面站可連線衛星的數量分佈", "display": true },
        {
          "dataTitle": "計算指定地面站理論訊號強度隨時間的變化",
          "display": true
        }
      ],
      "路由效能": [
        { "dataTitle": "計算星網任兩衛星最大和平均hop count", "display": true },
        { "dataTitle": "計算星網任兩衛星最大和平均distance", "display": true },
        {
          "dataTitle": "計算星網任兩衛星路由經過的intra ISL數量分佈",
          "display": true
        },
        {
          "dataTitle": "計算星網任兩衛星路由經過的inter ISL數量分佈",
          "display": true
        },
        {
          "dataTitle": "計算星網任兩衛星路由經過的各條ISL的次數",
          "display": true
        },
        {
          "dataTitle": "計算星網的Routing Table Update控制封包數量",
          "display": true
        },
        { "dataTitle": "計算星網任兩衛星的packet loss變化", "display": true }
      ],
      "換手效能": [
        { "dataTitle": "計算所有地面站的衛星換手次數", "display": true },
        { "dataTitle": "計算衛星平均服務時間", "display": true },
        { "dataTitle": "計算換手失敗率", "display": true }
      ]
    }
    ```

- Update Simulation settings

  - method: PUT
  - URL: `/project/simuSettings/:projectId`
  - Description: Update simulation settings by projectId
  - request:

    ```json
    [
      {
        "路由規則": [
          { "dataTitle": "DSDV", "display": true },
          { "dataTitle": "OLSR", "display": false },
          { "dataTitle": "Babel", "display": false },
          { "dataTitle": "DREAM", "display": false },
          { "dataTitle": "BATMAN", "display": false }
        ],
        "換手規則": [
          { "dataTitle": "Adaptive RSS", "display": true },
          { "dataTitle": "Context-Aware", "display": false },
          { "dataTitle": "Energy-Efficient", "display": false },
          { "dataTitle": "Mobility Pattern", "display": false },
          { "dataTitle": "Multi-Criteria", "display": false },
          { "dataTitle": "Network-Based", "display": false },
          { "dataTitle": "Predictive", "display": false },
          { "dataTitle": "QoS-Oriented", "display": false }
        ],
        "ISL連線規則": [
          { "dataTitle": "MinMaxR", "display": true },
          { "dataTitle": "MinDiffAER", "display": false },
          { "dataTitle": "RelativePhasing", "display": false },
          { "dataTitle": "AlwaysMinR", "display": false }
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
      },
      {
        "projectId": 3
      }
    ]
    ```

  - response:
    ```json
    {
      "路由規則": [
        { "dataTitle": "DSDV", "display": true },
        { "dataTitle": "OLSR", "display": false },
        { "dataTitle": "Babel", "display": false },
        { "dataTitle": "DREAM", "display": false },
        { "dataTitle": "BATMAN", "display": false }
      ],...
    }
    ```

- Update simulation items

  - method: PUT
  - URL: `/project/simuItems/:projectId`
  - Description: Update simulation Items by projectId
  - request:

    ```json
    [
      {
        "衛星間連線": [
          {
            "dataTitle": "計算指定衛星與相鄰軌道衛星的最小距離",
            "display": true
          },
          {
            "dataTitle": "計算指定衛星與相鄰軌道衛星的平均距離",
            "display": false
          },
          {
            "dataTitle": "計算指定衛星與相鄰軌道衛星的最大距離",
            "display": false
          },
          {
            "dataTitle": "計算指定衛星與相鄰軌道衛星的方位角(A)變化區間",
            "display": false
          },
          {
            "dataTitle": "計算指定衛星與相鄰軌道衛星的幅角(E)變化區間",
            "display": false
          },
          {
            "dataTitle": "計算指定衛星與相鄰軌道衛星的距離(R)變化區間",
            "display": false
          },
          {
            "dataTitle": "計算指定衛星與相鄰軌道衛星的AER標準化變化區間",
            "display": false
          },
          {
            "dataTitle": "計算指定衛星兩條intra ISL的AER隨時間的變化",
            "display": false
          },
          {
            "dataTitle": "計算指定衛星兩條intra ISL的距離隨時間的變化",
            "display": false
          },
          {
            "dataTitle": "計算指定衛星兩條inter ISL的距離隨時間的變化",
            "display": false
          },
          {
            "dataTitle": "計算造成星網中斷的ISL損壞數量比例分佈",
            "display": false
          },
          {
            "dataTitle": "計算造成星網中斷的衛星損壞數量比例分佈",
            "display": false
          }
        ],
        "對地輻射": [
          { "dataTitle": "計算指定緯度範圍的輻射覆蓋時間", "display": true },
          {
            "dataTitle": "計算指定地面站可連線衛星數隨時間的變化",
            "display": true
          },
          {
            "dataTitle": "計算指定地面站可連線衛星的數量分佈",
            "display": true
          },
          {
            "dataTitle": "計算指定地面站理論訊號強度隨時間的變化",
            "display": true
          }
        ],
        "路由效能": [
          {
            "dataTitle": "計算星網任兩衛星最大和平均hop count",
            "display": true
          },
          {
            "dataTitle": "計算星網任兩衛星最大和平均distance",
            "display": true
          },
          {
            "dataTitle": "計算星網任兩衛星路由經過的intra ISL數量分佈",
            "display": true
          },
          {
            "dataTitle": "計算星網任兩衛星路由經過的inter ISL數量分佈",
            "display": true
          },
          {
            "dataTitle": "計算星網任兩衛星路由經過的各條ISL的次數",
            "display": true
          },
          {
            "dataTitle": "計算星網的Routing Table Update控制封包數量",
            "display": true
          },
          { "dataTitle": "計算星網任兩衛星的packet loss變化", "display": true }
        ],
        "換手效能": [
          { "dataTitle": "計算所有地面站的衛星換手次數", "display": true },
          { "dataTitle": "計算衛星平均服務時間", "display": true },
          { "dataTitle": "計算換手失敗率", "display": true }
        ]
      },
      {
        "projectId": 3
      }
    ]
    ```

  - response:
    ```json
    {
      "衛星間連線": [
        {
          "dataTitle": "計算指定衛星與相鄰軌道衛星的最小距離",
          "display": true
        },
        {
          "dataTitle": "計算指定衛星與相鄰軌道衛星的平均距離",
          "display": false
        },...]
        ...
    }
    ```

- Initialize Simulation Conf

  - method: POST
  - URL: `/project/initializeSimulationConf/:projectId`
  - Description: Initialize Simulation Conf of a project, if it does not exist.
  - request:

    ```json
    [
      {
        "projectId": 3
      },
      {
        "路由規則": [...],
        "換手規則": [...],
        ...
      },
      {
        "衛星間連線": [...],
        "對地輻射": [...],
        ...
      }
    ]
    ```

  - response:
    ```json
    {
      "message": "SimulationConf initialized successfully."
    }
    ```

## Project - Constellation

- Get planes

  - method: GET
  - URL: `/project/planes/:projectId`
  - Description: Get all planes by projectId
  - request:
    ```json
    {
      "projectId": 3
    }
    ```
  - response:
    ```json
    {
      "planeId": 1,
      "constellationId": 3,
      "inclination": 29.0155,
      "raan": 0.0186,
      "eccentricity": 0.000511,
      "arg_pe": 264.8931,
      "altitude": 800
    }
    ```

- Get satellites

  - method: GET
  - URL: `/project/satellites/:projectId`
  - Description: Get all satellites by projectId
  - request:
    ```json
    {
      "projectId": 3
    }
    ```
  - response:
    ```json
    {
      "satelliteId": 1,
      "planeId": 3,
      "latitude": 25.0374,
      "longitude": 121.5645,
      "altitude": 800,
      "meanAnomaly": 16.4602,
      "meanMotion": 14.2872,
      "mass": 96.1,
      "satName": "Test1"
    }
    ```

- Get ISLs

  - method: GET
  - URL: `/project/isls/:projectId`
  - Description: Get all ISLs by projectId
  - request:
    ```json
    {
      "projectId": 3
    }
    ```
  - response:
    ```json
    {
      "islId": 1,
      "satelliteId": 3,
      "connectIslId": 1,
      "satAzimuth": 0.0,
      "satElevation": 0.0,
      "lazerAzimuth": 160,
      "lazerElevation": 55,
      "lazerRange": 7000
    }
    ```

- Get CPLs

  - method: GET
  - URL: `/project/cpls/:projectId`
  - Description: Get all CPLs by projectId
  - request:
    ```json
    {
      "projectId": 3
    }
    ```
  - response:
    ```json
    {
      "cplId": 1,
      "satelliteId": 3,
      "viewAngle": 29.0155,
      "beamAngle": 0.0186,
      "beamCount": 0.000511,
      "bandwidth": 264.8931
    }
    ```

## Project - GroundStations

- Get ground stations

  - method: GET
  - URL: `/project/groundStations/:projectId/:type`
  - Description: Get all groundStations by projectId and type, type=0 is ut, type=1 is ft
  - request:
    ```json
    {
      "projectId": 3,
      "type": 0
    }
    ```
  - response:
    ```json
    {
      "gsId": 1,
      "cellId": 3,
      "connectedSatId": null,
      "type": 0,
      "latitude": 121.0,
      "longitude": 25.0,
      "altitude": 0.5,
      "acceptElevation": 1.5
    }
    ```

- Update ground stations

  - method: PUT
  - URL: `/project/groundStation/:gsId/:type`
  - Description: Update one ground station by gsid and type, type=0 is ut, type=1 is ft
  - request:
    ```json
    {
      "gsId": 3,
      "type": 0
    }
    ```
  - response:
    ```json
    {
      "message": "GroundStation updated successfully."
    }
    ```

- Insert ground stations

  - method: POST
  - URL: `/project/groundStation`
  - Description: Insert a ground station into GroundStation with its longitude, latitude, type, type=0 is ut, type=1 is ft. If cell or constellation does not exist, create one.
  - request:
    ```json
    {
      "projectId": 3,
      "longitude": 121.123,
      "latitude": 25.123,
      "type": 0
    }
    ```
  - response:
    ```json
    {
      "message": "GroundStation inserted successfully"
    }
    ```

## Chart

- Get all charts

  - method: GET
  - URL: `/chart`
  - Description: Get all charts by reportId.
  - request:
    ```json
    {
      "reportId": 3
    }
    ```
  - response:
    ```json
    {
      "chartId": 1,
      "reportId": 3,
      "description": "Example description...",
      "image": "'image'::bytea"
    }
    ```

- Get report title

  - method: GET
  - URL: `/chart/report/:reportId`
  - Description: Get report title by reportId.
  - request:
    ```json
    {
      "reportId": 3
    }
    ```
  - response:
    ```json
    {
      "reportName": "[simulation] Project 1",
      "simuTime": "2024-07-22 15:28:29.951457"
    }
    ```

- Export chart
- method: GET
  - URL: `/chart/:reportId/:format`
  - Description: Get all chart by reportId, then make pdf or docx or csv file, download it.
  - request:
    ```json
    {
      "reportId": 3,
      "foamat": "pdf"
    }
    ```
  - response:
  ```
    HTTP/1.1 200 OK
    Content-Disposition: attachment; filename="example.txt"
    Content-Type: text/plain
  ```
