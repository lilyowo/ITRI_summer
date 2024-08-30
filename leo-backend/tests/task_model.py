class Task:
    def __init__(self, task_id, api_id, data):
        self.task_id = task_id
        self.api_id = api_id
        self.data = data

    def to_dict(self):
        return {
            "taskId": self.task_id,
            "apiId": self.api_id,
            "data": self.data
        }