tasks = []

def add_task(description):
    """Добавляет новую задачу в список задач."""
    task = {"description": description, "completed": False}
    tasks.append(task)
    print(f"Task '{description}' added successfully.")

def remove_task(index):
    """Удаляет задачу по указанному индексу."""
    if 0 <= index < len(tasks):
        removed_task = tasks.pop(index)
        print(f"Task '{removed_task['description']}' removed successfully.")
    else:
        print("Error: Invalid task number.")

def view_tasks():
    """Отображает все задачи с их статусом."""
    if not tasks:
        print("No tasks to display.")
    else:
        print("\nCurrent Tasks:")
        for i, task in enumerate(tasks, 1):
            status = "Completed" if task["completed"] else "Not Completed"
            print(f"{i}. {task['description']} - {status}")

def mark_task_completed(index):
    """Помечает задачу как выполненную по указанному индексу."""
    if 0 <= index < len(tasks):
        tasks[index]["completed"] = True
        print(f"Task '{tasks[index]['description']}' marked as completed.")
    else:
        print("Error: Invalid task number.")

def main():
    """Основная функция для управления задачами через интерактивный интерфейс."""
    print("Welcome to the To-Do List Application!")
    
    while True:
        print("\nChoose a command: add, remove, view, complete, or exit")
        command = input("> ").strip().lower()
        
        if command == "add":
            description = input("Enter task description: ")
            add_task(description)
        
        elif command == "remove":
            try:
                index = int(input("Enter task number to remove: ")) - 1
                remove_task(index)
            except ValueError:
                print("Error: Please enter a valid number.")
        
        elif command == "view":
            view_tasks()
        
        elif command == "complete":
            try:
                index = int(input("Enter task number to mark as completed: ")) - 1
                mark_task_completed(index)
            except ValueError:
                print("Error: Please enter a valid number.")
        
        elif command == "exit":
            print("Exiting the To-Do List Application. Goodbye!")
            break
        
        else:
            print("Error: Unknown command. Please try again.")


main()
