def writes():
    name = input("Введите имя: ")
    color = input("Введите любимый цвет: ")
    while True:
        try:
            age = int(input("Введите возраст: "))
            break
        except ValueError:
            print("Ошибка: пожалуйста, введите число для возраста.")

    # Возвращаем форматированную строку
    return f"Имя: {name}, Возраст: {age}, Любимый цвет: {color}\n"


# Открываем файл и записываем результат работы функции writes
with open("result.txt", "w") as file:
    file.write(writes())
