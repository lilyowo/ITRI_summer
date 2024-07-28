import os
import psycopg2

# 資料庫連接資訊
db_config = {
    'user': "Hamster",
    'host': 'localhost',
    'password': 'hpassword',
    'port': 5432,
    'database': "StarDB"
}

def convert_to_blob(file_path):
    with open(file_path, 'rb') as file:
        blob = file.read()
    return blob

def insert_image_to_db(file_path):
    conn = psycopg2.connect(**db_config)
    cursor = conn.cursor()
    
    image_blob = convert_to_blob(file_path)
    description = "This is an example description.\n\nFollowing is an example image."
    report_id = 3
    
    insert_query = """INSERT INTO "Chart" ("reportId", "description", "image") VALUES (%s, %s, %s)"""
    cursor.execute(insert_query, (report_id, description, image_blob))
    
    conn.commit()
    cursor.close()
    conn.close()
    print(f"Image {file_path} inserted successfully.")

def process_images(image_folder):
    for filename in os.listdir(image_folder):
        if filename.endswith('.jpg') or filename.endswith('.png'):
            file_path = os.path.join(image_folder, filename)
            insert_image_to_db(file_path)

# 指定圖片資料夾路徑
image_folder = "./test-blob/images"
process_images(image_folder)
