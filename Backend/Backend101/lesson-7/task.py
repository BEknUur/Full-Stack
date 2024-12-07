import argparse
import json
import os


TASKS_FILE = 'tasks.json'


def load_tasks():
    if not os.path.exists(TASKS_FILE) or os.path.getsize(TASKS_FILE) == 0:
        return {}  # Если файл не существует или пуст, возвращаем пустой словарь
    with open(TASKS_FILE, 'r') as file:
        return json.load(file)



def save_tasks(tasks):
    with open(TASKS_FILE, 'w') as file:
        json.dump(tasks, file, indent=4)


def add_task(description):
    tasks = load_tasks()
    task_id = len(tasks) + 1
    tasks[task_id] = {"description": description}
    save_tasks(tasks)
    print(f"Задача добавлена с ID: {task_id}")


def list_tasks():
    tasks = load_tasks()
    if not tasks:
        print("Задачи не найдены.")
    else:
        for task_id, task in tasks.items():
            print(f"{task_id}: {task['description']}")


def update_task(task_id, new_description):
    tasks = load_tasks()
    task_id = str(task_id)
    if task_id in tasks:
        tasks[task_id]["description"] = new_description
        save_tasks(tasks)
        print(f"Задача {task_id} обновлена.")
    else:
        print(f"Задача с ID {task_id} не найдена.")


def delete_task(task_id):
    tasks = load_tasks()
    task_id = str(task_id)
    if task_id in tasks:
        del tasks[task_id]
        save_tasks(tasks)
        print(f"Задача {task_id} удалена.")
    else:
        print(f"Задача с ID {task_id} не найдена.")


def main():
    parser = argparse.ArgumentParser(description="Приложение для управления списком задач")
    
    subparsers = parser.add_subparsers(dest='command', help="Команды")


    parser_add = subparsers.add_parser('add', help='Добавить новую задачу')
    parser_add.add_argument('description', type=str, help='Описание задачи')

   
    subparsers.add_parser('list', help='Вывести список задач')

  
    parser_update = subparsers.add_parser('update', help='Обновить задачу')
    parser_update.add_argument('id', type=int, help='ID задачи')
    parser_update.add_argument('description', type=str, help='Новое описание задачи')

   
    parser_delete = subparsers.add_parser('delete', help='Удалить задачу')
    parser_delete.add_argument('id', type=int, help='ID задачи')

    args = parser.parse_args()


    if args.command == 'add':
        add_task(args.description)
    elif args.command == 'list':
        list_tasks()
    elif args.command == 'update':
        update_task(args.id, args.description)
    elif args.command == 'delete':
        delete_task(args.id)
    else:
        parser.print_help()

if __name__ == '__main__':
    main()
