import time
import random
from skyfield.api import load, EarthSatellite
from skyfield.sgp4lib import Satrec
from skyfield.toposlib import wgs84
import json
from os import getpid
from datetime import timedelta

plane_list_keep = []
simu_config_keep = {}
satellites_keep = []
ISL_keep = []
def getConstellation(apiId, param):
    global plane_list_keep
    global satellites_keep
    tleString = param["tleString"]
    # Parse the TLE string
    tle_lines = tleString.split("\n")
    # for i in range(0,21):
    #     print("Line " + str(i) + ": " + tle_lines[i])
    # Ensure we have a valid number of TLE lines (multiples of 3)
    if (len(tle_lines)-5) % 6 != 0:
        return {"error": "Invalid TLE format"}
    # satellites_keep = []
    # planes = {}
    # ts = load.timescale()
    # cnt = 0
    # for i in range(5, len(tle_lines), 6):
    #     cnt += 1
    #     # Extract TLE lines for each satellite
    #     line1 = tle_lines[i + 3]
    #     line2 = tle_lines[i + 4]
    #     sat_name = i
    #     # Create EarthSatellite object
    #     satellite = EarthSatellite(line1, line2, str(sat_name), ts)
    #     satrec = satellite.model
    #     satellites_keep.append(satellite)
    #     # Plane identification based on inclination and RAAN
    #     plane_id = (satrec.inclo, satrec.nodeo)

    #     # Calculate satellite position (latitude, longitude, altitude)
    #     t = ts.now()
    #     geocentric = satellite.at(t)
    #     subpoint = wgs84.subpoint(geocentric)

    #     # Satellite-specific data
    #     satellite_data = {
    #         "satelliteId": sat_name,
    #         "latitude": subpoint.latitude.degrees,
    #         "longitude": subpoint.longitude.degrees,
    #         "altitude": subpoint.elevation.km,
    #         "meanAnomaly": satrec.mo,  # Mean Anomaly
    #         "meanMotion": satrec.no_kozai,  # Mean Motion (revs per day)
    #     }

    #     # Check if the plane already exists
    #     if plane_id not in planes:
    #         # Plane data (shared by satellites on the same plane)
    #         planes[plane_id] = {
    #             "planeId": len(planes) + 1,
    #             "inclination": satrec.inclo,  # Inclination (degrees)
    #             "raan": satrec.nodeo,  # Right Ascension of Ascending Node (RAAN)
    #             "eccentricity": satrec.ecco,  # Eccentricity
    #             "arg_pe": satrec.argpo,  # Argument of Perigee
    #             "altitude": satrec.altp / 1000.0,  # Perigee altitude in km
    #             # "altitude_apogee": satrec.alta / 1000.0,  # Apogee altitude in km
    #             "Satellites": []
    #         }

    #     # Append the satellite data to the appropriate plane
    #     planes[plane_id]["Satellites"].append(satellite_data)
    satellites_keep = []
    planes = {}
    ts = load.timescale()
    cnt = 0

    for i in range(5, len(tle_lines), 6):
        cnt += 1
        # Extract TLE lines for each satellite
        line1 = tle_lines[i + 3]
        line2 = tle_lines[i + 4]
        
        # Create EarthSatellite object
        satellite = EarthSatellite(line1, line2, str(i), ts)
        satrec = satellite.model
        satellites_keep.append(satellite)
        
        # Plane identification based on inclination and RAAN
        plane_id = (satrec.inclo, satrec.nodeo)

        # Calculate satellite position (latitude, longitude, altitude)
        t = ts.now()
        geocentric = satellite.at(t)
        subpoint = wgs84.subpoint(geocentric)

        # Check if the plane already exists, if not, create it
        if plane_id not in planes:
            planes[plane_id] = {
                "planeId": len(planes) + 1,
                "inclination": satrec.inclo,  # Inclination (degrees)
                "raan": satrec.nodeo,  # Right Ascension of Ascending Node (RAAN)
                "eccentricity": satrec.ecco,  # Eccentricity
                "arg_pe": satrec.argpo,  # Argument of Perigee
                "altitude": satrec.altp / 1000.0,  # Perigee altitude in km
                "Satellites": []
            }

        # Generate satellite ID based on plane ID and satellite count
        satellite_count = len(planes[plane_id]["Satellites"]) + 1
        satellite_id = planes[plane_id]["planeId"] * 100 + satellite_count

        # Satellite-specific data
        satellite_data = {
            "satelliteId": satellite_id,
            "latitude": subpoint.latitude.degrees,
            "longitude": subpoint.longitude.degrees,
            "altitude": subpoint.elevation.km,
            "meanAnomaly": satrec.mo,  # Mean Anomaly
            "meanMotion": satrec.no_kozai,  # Mean Motion (revs per day)
        }

        # Append the satellite data to the appropriate plane
        planes[plane_id]["Satellites"].append(satellite_data)
    # Convert planes dict to a list of plane data
    plane_list = list(planes.values())
    # print("Number of planes: " + str(len(plane_list)))
    # for sat in plane_list[0]["Satellites"]:
    #     print(sat["satelliteId"])      
    plane_list_keep = plane_list  
    return {"Planes": plane_list}

def setIslConfig(apiId, param):
    global plane_list_keep
    global ISL_keep
    ISL_keep = []
    islConfig = param["islConfig"]
    satellite_connections = []
    print(plane_list_keep)
    for plane in plane_list_keep:
        satellites = plane["Satellites"] 
        # 遍历每个卫星，生成 (satelliteId, satelliteId) 的配对
        for i in range(len(satellites) - 1):
            connection = (satellites[i]["satelliteId"], satellites[i + 1]["satelliteId"])
            satellite_connections.append(connection)
        connection = (satellites[0]["satelliteId"], satellites[len(satellites) - 1]["satelliteId"])
        satellite_connections.append(connection)
    # 再處理不同軌道之間第 n 個衛星的連接
    num_planes = len(plane_list_keep)
    num_satellites_per_plane = len(plane_list_keep[0]["Satellites"])
    # test_conn = (plane_list_keep[0]["Satellites"][0]["satelliteId"], 
    #                       plane_list_keep[1]["Satellites"][0]["satelliteId"])
    # satellite_connections.append(test_conn)
    if num_planes == 3:
        for i in range(num_satellites_per_plane):
            for j in range(num_planes - 1):
                target_id = (i +15) % num_satellites_per_plane  # 計算目標衛星的ID並處理邊界
                connection = (plane_list_keep[j]["Satellites"][i]["satelliteId"], 
                            plane_list_keep[j + 1]["Satellites"][target_id]["satelliteId"])
                satellite_connections.append(connection)
            # 讓最後一個軌道的衛星與第一個軌道連接
            target_id = (i + 16) % num_satellites_per_plane
            connection = (plane_list_keep[-1]["Satellites"][i]["satelliteId"], 
                        plane_list_keep[0]["Satellites"][target_id]["satelliteId"])
            satellite_connections.append(connection)
    else:
        print("Cannot link crossing planes: Cause we don't know how much them shift.")
    ISL_keep = satellite_connections
    return satellite_connections

def addGroundStation(apiId, param):
    print(param)
    return {"groundStationId": param["gsId"]}

def modifyGroundStation(apiId, param):
    print(param)
    return {"message":"Modify ground station"}

def deleteGroundStation(apiId, param):
    print(param)
    return {"message":"Delete ground station"}

def setCplConfig(apiId, param):
    print(param)
    # 可能就可以給cpl跟ground station的連線資料
    # 或者等路由規則跟換手規則設立好以後simulation再傳這個資料
    # 他們不用於顯示，CPL也沒有欄位寫跟誰連 (雖然groundStation有)
    return {"message":"set cpl config"}

def setSimuConfig(apiId, param):
    global simu_config_keep
    # print(param["simuSettings"])
    # print(param["simuItems"])
    simu_config_keep = param
    # 將param的simuItem、simuSetting存在global變數
    return {"message":"set simulation config"}

def makeSimulationResult(apiId, param):
    global simu_config_keep
    global ISL_keep
    global satellites_keep

    print("\n\n\nowo!!!!!!!!!!!!!!!!!!!")
    print(simu_config_keep)
    print("owo!!!!!!!!!!!!!!!!!!!\n\n\n")
    
    simuTime = param["simuTime"]
    gsIds = param["gsIds"] # It will keep in app server, but this fake server do not store gsIds. So we get them from database
    simuSettings = simu_config_keep["simuSettings"]

    simuItems = []
    for category, items in simu_config_keep["simuItems"].items():
        for item in items:
            simuItems.append(f"{category} - {item}")

    # 初始化 simulationInfo
    simulationInfo = []
    #  組裝 simulationInfo
    # 加载时间标尺
    ts = load.timescale()
    nowTime = ts.now()

    # 迴圈处理 t = 0 到 simuTime 的每一秒
    for t in range(0, simuTime + 1):
        time = nowTime + timedelta(seconds=t)
        satellitesPos = []
        islConnect = []
        cplConnect = []
        for sat in satellites_keep:
            # Calculate satellite position (latitude, longitude, altitude)
            geocentric = sat.at(time)
            subpoint = wgs84.subpoint(geocentric)
            
            # Satellite-specific data
            satellite_data = {
                "satelliteId": int(sat.name),
                "latitude": subpoint.latitude.degrees,
                "longitude": subpoint.longitude.degrees,
                "altitude": subpoint.elevation.km
            }
            satellitesPos.append(satellite_data)
        islConnect = ISL_keep
        for gsId in gsIds:
            cplConnect.append([
                random.choice(satellitesPos)['satelliteId'],
                gsId
            ])
        # 將時間點的資料添加到simulationInfo
        simulationInfo.append({
            "time": t,
            "satellitesPos": satellitesPos,
            "islConnect": islConnect,
            "cplConnect": cplConnect
        })

    # global plane_list_keep
    # # 初始化 simulationInfo
    # simulationInfo = []

    # # 組裝 simulationInfo
    # for t in range(0, simuTime + 1):
    #     satellitesPos = []
    #     islConnect = []
    #     cplConnect = []
        
    #     # 遍歷所有 plane
    #     for plane in plane_list_keep:
    #         satellites = plane['Satellites']
    #         num_satellites = len(satellites)
            
    #         # 更新衛星位置
    #         for sat in satellites:
    #             new_longitude = (sat['longitude'] + 5 * t) % 360
    #             # 將經度調整到 -180 到 +180 範圍內
    #             if new_longitude > 180:
    #                 new_longitude -= 360
    #             satellitesPos.append({
    #                 "satelliteId": sat['satelliteId'],
    #                 "latitude": sat['latitude'],
    #                 "longitude": new_longitude,
    #                 "altitude": sat['altitude']
    #             })
            
    #         # 建立islConnect（衛星間的連接）
    #         for i in range(num_satellites):
    #             islConnect.append([
    #                 satellites[i]['satelliteId'],
    #                 satellites[(i + 1) % num_satellites]['satelliteId']
    #             ])
    #     # 再處理不同軌道之間第 n 個衛星的連接
    #     num_planes = len(plane_list_keep)
    #     num_satellites_per_plane = len(plane_list_keep[0]["Satellites"])
    #     for i in range(num_satellites_per_plane):
    #         for j in range(num_planes - 1):
    #             connection = (plane_list_keep[j]["Satellites"][i]["satelliteId"], 
    #                         plane_list_keep[j + 1]["Satellites"][i]["satelliteId"])
    #             islConnect.append(connection)
    #     # 建立cplConnect（衛星與地面站的連接）
    #     # for sat in satellitesPos:
    #     #     cplConnect.append([
    #     #         sat['satelliteId'],
    #     #         random.choice(gsIds)
    #     #     ])
    #     for gsId in gsIds:
    #         cplConnect.append([
    #             random.choice(satellitesPos)['satelliteId'],
    #             gsId
    #         ])
        
    #     # 將時間點的資料添加到simulationInfo
    #     simulationInfo.append({
    #         "time": t,
    #         "satellitesPos": satellitesPos,
    #         "islConnect": islConnect,
    #         "cplConnect": cplConnect
    #     })

    


    # simulationInfo = [
    #     {
    #         "time":1,
    #         "satellitesPos":[
    #             {
    #                 "satelliteId":1,
    #                 "latitude": 121.123,
    #                 "longitude":23.456,
    #                 "altitude":30.5
    #             },
    #             {
    #                 "satelliteId":2,
    #                 "latitude": 121.123,
    #                 "longitude":23.456,
    #                 "altitude":30.5
    #             }
    #         ],
    #         "islConnect":[[1,2],[2,3]], #sat id - sat id
    #         "cplConnect":[[1,2],[2,3]], #sat id - ground station id
    #     },{
    #         "time":2,
    #         "satellitesPos":[],
    #         "islConnect":[],
    #         "cplConnect":[]
    #     }
    # ]
    reportInfo = []
    for title in simuItems:
        # Randomly choose how many times the content should appear
        content_count = random.randint(1, 5)
        content_array = [[0.000914962, 59.0556, 6.00462, 17695.7, 0.0814261, 4500, 0]] * content_count

        reportInfo.append({
            "dataTitle": title,
            "description": "這個描述留給 " + title + " 的資料來使用",
            "data": {
                "header": ["throughput", "latency", "hop", "distance", "loss", "rx_buffer", "tx_buffer"],
                "content": content_array
            }
        }) 
    # reportInfo = [
    #     {
    #         "dataTitle":"計算指定衛星與相鄰軌道衛星的最小距離",
    #         "data":[] # or description?
    #     },
    #     {
    #         "dataTitle":"計算星網任兩衛星路由經過的各條ISL的次數",
    #         "data":[]
    #     }
    # ]
    simulationResult = {
        "simulationInfo": simulationInfo,
        "reportInfo": reportInfo
    }
    
    return simulationResult

def process_task(task_id, task_data):
    time.sleep(1 + random.randint(0, 4))
    return f"Worker {getpid()} processed: {task_data}"

def process_special_task(task_id, task_data):
    time.sleep(2)
    return f"Worker {getpid()} processed special task: {task_data}"
