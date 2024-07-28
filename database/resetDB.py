import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os
import subprocess

# Database connection parameters
db_params = {
    'user': "Hamster",
    'host': 'localhost',
    'password': 'hpassword',
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
    'InsertReport.sql',
    'InsertChart.sql'
]

def execute_sql_script(conn, script_path):
    with conn.cursor() as cursor:
        with open(script_path, 'r', encoding='utf-8') as file:
            sql = file.read()
            cursor.execute(sql)
            print(f"Executed script: {script_path}")

def check_database_exists(cursor, db_name):
    cursor.execute(f"SELECT 1 FROM pg_database WHERE datname='{db_name}'")
    return cursor.fetchone() is not None

def main():
    # Connect to the postgres database to drop and create the target database
    conn = psycopg2.connect(
        user=db_params['user'],
        host=db_params['host'],
        password=db_params['password'],
        port=db_params['port'],
        database='postgres' #default都會有的database
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()

    db_exists = check_database_exists(cursor, db_params['database'])

    if db_exists:
        # Drop all tables in the target database
        target_conn = psycopg2.connect(**db_params)
        target_conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        target_cursor = target_conn.cursor()

        with open('./DropAll.sql', 'r', encoding='utf-8') as file:
            sql = file.read()
            target_cursor.execute(sql)
            print(f"Executed script: {'./DropAll.sql'}")

        target_cursor.close()
        target_conn.close()

        # Drop the target database if it exists
        cursor.execute(f'DROP DATABASE IF EXISTS "{db_params["database"]}"')
        print(f"Dropped database {db_params['database']}")

    # # Drop all tables in the target database
    # with open('./DropAll.sql', 'r', encoding='utf-8') as file:
    #     sql = file.read()
    #     cursor.execute(sql)
    #     print(f"Executed script: {'./DropAll.sql'}")

    # # Drop the target database if it exists
    # cursor.execute(f"DROP DATABASE IF EXISTS {db_params['database']}")
    # print(f"Dropped database {db_params['database']}")

    # Create the target database
    cursor.execute(f'CREATE DATABASE "{db_params["database"]}"')
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

    # Execute external Python script
    script_path = './test-blob/testInsertBlob.py'
    try:
        result = subprocess.run(['python', script_path], check=True, capture_output=True, text=True)
        print("External script executed successfully")
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error executing script {script_path}")
        print(e.stderr)

if __name__ == "__main__":
    main()
