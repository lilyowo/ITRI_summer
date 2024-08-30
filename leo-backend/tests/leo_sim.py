import zmq
import json
from task_model import Task
from task_processor import process_tasks

context = zmq.Context()
socket = context.socket(zmq.DEALER)
socket.connect("tcp://localhost:5560")

# 發送 ready 消息
ready_msg = json.dumps({"apiId": "ready"})
socket.send_multipart([b'', ready_msg.encode()])
print(f"send: {ready_msg}")

while True:
    empty, message = socket.recv_multipart()
    print(f"recv: {message}")
    task_data = json.loads(message)
    if(task_data["apiId"] != "ready"):
        task = Task(task_data["taskId"], task_data["apiId"], task_data["data"])
        result = process_tasks(task)

        result_msg = json.dumps({
            "apiId": "result",
            "taskId": task_data["taskId"],
            "clientId": task_data["clientId"],
            "result": result
        })        
        print(f"send: {result_msg}")
        socket.send_multipart([b'', result_msg.encode()])