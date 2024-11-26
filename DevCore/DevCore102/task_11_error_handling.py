def get_positive_integer(prompt):
    while True:
        try:
            value = int(input(prompt))
            if value < 0:
                print("Ошибка! Значение не может быть отрицательным.")
            else:
                return value
        except ValueError:
            print("Ошибка! Введите числовое значение.")

def process_order():
    total_sum = 0
    products_added = False  

    while True:
        quantity = get_positive_integer("Введите количество продуктов: ")
        
        if quantity == 0:
            break  

        price = get_positive_integer("Введите цену одного продукта: ")
        
        total_sum += quantity * price
        products_added = True  
        
   
        another = input("Хотите добавить еще один продукт? (да/нет): ").strip().lower()
        if another == "нет":
            break

    if products_added:
        print(f"Итоговая сумма: {total_sum}")
    else:
        print("Ошибка! Нет добавленных продуктов для расчета.")


process_order()
