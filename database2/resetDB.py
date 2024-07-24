import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os

# Database connection parameters
db_params = {
    'user': 'postgres',
    'host': '127.0.0.1',
    'password': 'Hamster@@',
    'port': 5432,
    'database': "StarDB"
}

# SQL scripts paths
sql_scripts_path = './'
sql_scripts = [
    'UserTable.sql',
    'LoginHistoryTable.sql',
    'ProjectTable.sql',
    'ReportTable.sql',
    'ChartTable.sql',
    'ConstellationTable.sql',
    'SimulationConfTable.sql',
    'PlaneTable.sql',
    'SatelliteTable.sql',
    'CellTable.sql',
    'GroundStationTable.sql',
    'ISLTable.sql',
    'CPLTable.sql',
    'BeamTable.sql',
    'InsertUser.sql',
    'InsertLoginHistory.sql',
    'InsertProject.sql',
    'InsertReport.sql'
]

def execute_sql_script(conn, script_path):
    with conn.cursor() as cursor:
        with open(script_path, 'r', encoding='utf-8') as file:
            sql = file.read()
            cursor.execute(sql)
            print(f"Executed script: {script_path}")

def main():
    # Connect to the postgres database to drop and create the target database
    conn = psycopg2.connect(
        user=db_params['user'],
        host=db_params['host'],
        password=db_params['password'],
        port=db_params['port'],
        database=db_params['database']
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()

    # Drop all tables in the target database
    with open('./DropAll.sql', 'r', encoding='utf-8') as file:
        sql = file.read()
        cursor.execute(sql)
        print(f"Executed script: {'./DropAll.sql'}")

    # Drop the target database if it exists
    cursor.execute(f"DROP DATABASE IF EXISTS {db_params['database']}")
    print(f"Dropped database {db_params['database']}")

    # Create the target database
    cursor.execute(f"CREATE DATABASE {db_params['database']}")
    print(f"Created database {db_params['database']}")
    cursor.close()
    conn.close()

    # Connect to the newly created database
    conn = psycopg2.connect(**db_params)
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()

    # Create tables in specified order
    for script in sql_scripts:
        script_path = os.path.join(sql_scripts_path, script)
        execute_sql_script(conn, script_path)

    cursor.close()
    conn.close()
    print("Database and tables recreated successfully")

if __name__ == "__main__":
    main()
