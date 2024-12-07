from datetime import datetime

loyal_names = ["Beknur", "Aisha"]
discount_code = "DISCOUNT2024"


def calculate_discount(price, name, promo_code):
    # Проверка лояльности клиента
    if name in loyal_names:
        if price > 1000:
            price -= price * 0.15  # 10% + 5% для заказов свыше 1000
        else:
            price -= price * 0.10  # 10% для лояльных клиентов

    # Применение скидки по промокоду
    if promo_code == discount_code:
        price -= price * 0.05

    return price


def calculate_tax(price):
    # Проверка на четную минуту
    current_minute = datetime.now().minute
    if current_minute % 2 == 0:
        return price  # Налог не применяется
    else:
        return price + price * 0.05  # Налог 5%


def calculate_final_price(price, name, promo_code):
    # Применяем скидки
    price_with_discount = calculate_discount(price, name, promo_code)

    # Применяем налог
    final_price = calculate_tax(price_with_discount)

    return final_price


def main():
    # Запрос данных от пользователя
    price = float(input("Введите сумму заказа: "))
    name = input("Введите ваше имя: ")
    promo_code = input("Введите код скидки (если есть): ")

    # Расчет итоговой суммы
    final_price = calculate_final_price(price, name, promo_code)
    print(f"Итоговая сумма заказа: {final_price:.2f}₸")


if __name__ == "__main__":
    main()
