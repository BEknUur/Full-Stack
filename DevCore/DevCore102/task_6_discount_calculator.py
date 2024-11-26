def calculate():
    products = []  

   
    while True:
        price_input = input("Enter the product price (or type 'stop' to finish): ")
        if price_input.lower() == "stop":
            break
        try:
            price = float(price_input)
            products.append(price)
        except ValueError:
            print("Please enter a valid price or type 'stop' to finish.")

    
    discounted_products = list(map(lambda x: x * 0.9 if x > 100 else x, products))

   
    discounted_items = list(filter(lambda x: x > 100, products))

   
    total_sum = sum(discounted_products)

    print(f"Products eligible for discount (original prices): {discounted_items}")
    print(f"Discounted prices of all products: {discounted_products}")
    print(f"Total amount after discount: {total_sum:.2f}")

calculate()

