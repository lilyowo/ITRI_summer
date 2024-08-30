import zmq
import json
from collections import defaultdict

context = zmq.Context()

frontend = context.socket(zmq.ROUTER)
frontend.bind("tcp://*:5559")

backend = context.socket(zmq.ROUTER)
backend.bind("tcp://*:5560")

poller = zmq.Poller()
poller.register(frontend, zmq.POLLIN)
poller.register(backend, zmq.POLLIN)

workers = set()
task_responses = defaultdict(list)
task_workers = defaultdict(set)

while True:
    socks = dict(poller.poll())

    if backend in socks:
        worker_id, empty, message = backend.recv_multipart()
        print(f"recv {message} from {worker_id.hex()}")
        msg = json.loads(message)

        if msg['apiId'] == 'ready':
            workers.add(worker_id)
            backend.send_multipart([worker_id, b'', json.dumps({
                    'apiId': 'ready',
                    'taskId': 'ready',
                    'result': 'ok',
                }).encode()])
        elif msg['apiId'] == 'result':
            task_id = msg['taskId']
            client_id = bytes.fromhex(msg['clientId'])  # Convert hex string to bytes
            task_responses[task_id].append(msg['result'])
            task_workers[task_id].remove(worker_id)
            workers.add(worker_id)

            if not task_workers[task_id]:
                frontend.send_multipart([client_id, b'', json.dumps({
                    'apiId': 'result',
                    'taskId': task_id,
                    'results': task_responses[task_id]
                }).encode()])
                del task_responses[task_id]
                del task_workers[task_id]

    if frontend in socks:
        client_id, empty, message = frontend.recv_multipart()
        print(f"recv {message} from {client_id.hex()}")
        msg = json.loads(message)
        
        # if msg['apiId'] == 'task' or msg['apiId'] == 'special_task':
        task_id = msg['taskId']
        if not workers:
            print(f"send {msg['data']} to {worker_id.hex()}")
            frontend.send_multipart([client_id, b'', json.dumps({
                'apiId': 'error',
                'message': 'No workers available'
            }).encode()])
        else:
            for worker_id in list(workers):
                print(f"send {msg['data']} to {worker_id.hex()}")
                backend.send_multipart([worker_id, b'', json.dumps({
                    'apiId': msg['apiId'],
                    'taskId': task_id,
                    'clientId': client_id.hex(),
                    'data': msg['data']
                }).encode()])
                workers.remove(worker_id)
                task_workers[task_id].add(worker_id)
