import os
import json

DATA_FILE='tasks.json'

def load_tasks():
    if not os.path.exists(DATA_FILE):
        print(f"Файл данных не найден создаем новый: {DATA_FILE}")
        return {}
    try:
        with open(DATA_FILE,'r')as file:
            if os.path.getsize(DATA_FILE)==0:
                return {}
            return json.load(file)
    except json.JSONDecodeError:
        print("Eror")
        return {}
    

def save_file(tasks):
    with open(DATA_FILE,'w') as file:
        json.dump(tasks,file,indent=4)

def add_task(description):
    tasks = load_tasks()
    task_id = len(tasks) + 1
    tasks[task_id] = {"description": description}
    save_file(tasks)
    print(f"Задача добавлена с ID: {task_id}")


def delete_task(task_id):
    tasks = load_tasks()
    task_id = str(task_id)
    if task_id in tasks:
        del tasks[task_id]
        save_file(tasks)
        print(f"Задача {task_id} удалена.")
    else:
        print(f"Задача с ID {task_id} не найдена.")


