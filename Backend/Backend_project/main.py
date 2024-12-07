from fastapi import FastAPI,HTTPException
from typing  import Optional

tasks=[]

app=FastAPI()
@app.get("/tasks/")
async def get_tasks():
    return tasks

@app.get("/tasks/{task_id}")
async def get_task(task_id: int):
    if task_id<0 or task_id>=len(tasks):
        raise HTTPException(status_code=404,detail="Task not found")
    return tasks[task_id]

@app.post("/tasks/")
async def create_task(name: str,description: Optional[str]=None):
    task={"id":len(tasks),"name":name, "description":description }
    tasks.append(task)
    return task

@app.put("/tasks/{task_id}")
async def update_task(task_id: int, name:str, description: Optional[str]=None):
    if task_id<0 or task_id>=len(tasks):
        raise HTTPException(status_code=404,detail="Task not found")
    tasks[task_id]={"id":task_id,"name": name,"description": description}
    return tasks[task_id]

@app.delete("/tasks/{task_id}")
async def delete_task(task_id :int):
    if task_id<0 or task_id>=len(tasks):
        raise HTTPException(status_code=404,detail="Task not found")
    return tasks.pop(task_id)