from task_controller import getConstellation, setIslConfig, addGroundStation, modifyGroundStation, deleteGroundStation, setCplConfig, makeSimulationResult, setSimuConfig, process_task, process_special_task

def process_tasks(task):
    if  task.api_id == "getConstellation":
        return getConstellation(task.task_id, task.data)
    elif task.api_id == "setIslConfig":
        return setIslConfig(task.task_id, task.data)
    elif task.api_id == "addGroundStation":
        return addGroundStation(task.task_id, task.data)
    elif task.api_id == "modifyGroundStation":
        return modifyGroundStation(task.task_id, task.data)
    elif task.api_id == "deleteGroundStation":
        return deleteGroundStation(task.task_id, task.data)
    elif task.api_id == "setCplConfig":
        return setCplConfig(task.task_id, task.data)
    elif task.api_id == "setSimuConfig":
        return setSimuConfig(task.task_id, task.data)
    elif task.api_id == "makeSimulationResult":
        return makeSimulationResult(task.task_id, task.data)
    elif task.api_id == "task":
        return process_task(task.task_id, task.data)
    elif task.api_id == "special_task":
        return process_special_task(task.task_id, task.data)
    else:
        return f"Unknown task type: {task.api_id}"