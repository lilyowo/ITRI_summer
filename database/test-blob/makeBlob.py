import os

def convert_to_blob(file_path):
    with open(file_path, 'rb') as file:
        blob = file.read()
    return blob

def process_images(image_folder, output_file):
    with open(output_file, 'w') as outfile:
        for filename in os.listdir(image_folder):
            if filename.endswith('.jpg') or filename.endswith('.png'):
                file_path = os.path.join(image_folder, filename)
                image_blob = convert_to_blob(file_path)
                outfile.write(image_blob.hex() + '\n\n\n\n')

# 指定圖片資料夾路徑和輸出檔案
image_folder = "./images"
output_file = "image_blobs.txt"

process_images(image_folder, output_file)
