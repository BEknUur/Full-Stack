
conference = ["Andrei", "Adilkhan", "Beknur", "Aisha"]


members = {
    "Andrei": {
        "age": 30,
        "email": "Andrei@gmail.com"
    },
    "Adilkhan": {
        "age": 18,
        "email": "Adilkhan@gmail.com"
    },
    "Beknur": {
        "age": 18,
        "email": "Beknur@gmail.com"
    },
    "Aisha": {
        "age": 19,
        "email": "Aisha@gmail.com"
    }
}


conference_location = (51.1694, 71.4491)  

# Функция для добавления участника в конференцию
def add_conference_name(name, age, email):
    if name not in conference:
        conference.append(name)
        members[name] = {
            "age": age,
            "email": email
        }
        print(f"Участник {name} добавлен.")
    else:
        print(f"Участник {name} уже существует.")

# Функция для удаления участника из конференции
def delete_conference_name(name):
    if name in conference:
        conference.remove(name)
        members.pop(name, None)
        print(f"Участник {name} удалён.")
    else:
        print(f"Участник {name} не найден.")

# Функция для отображения информации о каждом участнике
def display_member_info(name):
    if name in members:
        info = members[name]
        print(f"Имя: {name}")
        print(f"Возраст: {info['age']}")
        print(f"E-mail: {info['email']}")
    else:
        print(f"Информация о {name} не найдена.")

# Основное меню программы
def main():
    print("Добро пожаловать в программу управления участниками конференции!")
    while True:
        print("\nМеню:")
        print("1. Добавить участника")
        print("2. Удалить участника")
        print("3. Показать информацию о участнике")
        print("4. Показать координаты места проведения")
        print("5. Выход")
        choice = input("Выберите действие: ")

        if choice == "1":
            name = input("Введите имя участника: ")
            age = int(input("Введите возраст участника: "))
            email = input("Введите e-mail участника: ")
            add_conference_name(name, age, email)

        elif choice == "2":
            name = input("Введите имя участника, которого хотите удалить: ")
            delete_conference_name(name)

        elif choice == "3":
            name = input("Введите имя участника для отображения информации: ")
            display_member_info(name)

        elif choice == "4":
            print(f"Координаты места проведения конференции: {conference_location}")

        elif choice == "5":
            print("Выход из программы.")
            break

        else:
            print("Некорректный выбор, попробуйте снова.")


if __name__ == "__main__":
    main()
