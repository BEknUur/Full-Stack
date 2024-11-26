from datetime import datetime

members = ["Beknur", "Azat", "Aisha", "Andrei", "Adilkhan"]


def apply_basic_discount(price, discount_rate=0.05):
    # для расчета базовой скидки.
    return price - price * discount_rate


def apply_loyalty_discount(price, additional_rate=0.02):
    # для расчета дополнительной скидки для участников программы.
    return price - price * additional_rate


def apply_basic_tax(price, tax_rate=0.07):
    # для расчета базового налога.
    return price - price * tax_rate


def apply_wildcard_tax(price, extra_tax_rate=0.02):
    # для расчета дополнительного налога, который игнорируется, если минута выполнения программы чётная
    current_time = datetime.now().minute
    if current_time % 2 != 0:
        return price - price * extra_tax_rate

    return price


def calculate_final_price(name, price):
    # Подводим итоги
    price_after_discount = apply_basic_discount(price)
    if name in members:
        price_after_discount = apply_loyalty_discount(price)

        price_after_tax = apply_basic_tax(price_after_discount)
        final_price = apply_wildcard_tax(price_after_tax)
        return final_price


customer = input("Введите имя пользователя: ")
price = int(input("Введите цену: "))
final_price = calculate_final_price(customer, price)
print(final_price)
