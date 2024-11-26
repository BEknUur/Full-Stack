
recipes = {
    "Pasta": ["Tomatoes", "Cheese", "Spaghetti"],
    "Salad": ["Cucumbers", "Tomatoes", "Lettuce"]
}

ingredient_prices = {
    "Tomatoes": 500,
    "Cheese": 2000,
    "Spaghetti": 1500,
    "Cucumbers": 300,
    "Lettuce": 700
}


def display_recipes_and_ingredients():
    print("\nAvailable Recipes:")
    for recipe, ingredients in recipes.items():
        print(f"- {recipe}: {', '.join(ingredients)}")

    print("\nAvailable Ingredients:")
    for ingredient, price in ingredient_prices.items():
        print(f"- {ingredient}: {price} тенге")

def add_new_recipe():
    recipe_name = input("\nEnter the name of the new recipe: ")
    ingredients = input("Enter ingredients separated by a comma: ").split(",")
    ingredients = [ingredient.strip() for ingredient in ingredients]

    for ingredient in ingredients:
        if ingredient not in ingredient_prices:
            price = int(input(f"Enter the price for the new ingredient '{ingredient}': "))
            ingredient_prices[ingredient] = price

    recipes[recipe_name] = ingredients
    print("\nRecipe added successfully!")


def calculate_recipe_cost():
    recipe_name = input("\nEnter the name of the recipe: ")

    if recipe_name not in recipes:
        print("Recipe not found.")
        return

    ingredients = recipes[recipe_name]
    total_cost = 0

    print(f"\nIngredients for {recipe_name}:")
    for ingredient in ingredients:
        price = ingredient_prices.get(ingredient, 0)
        print(f"- {ingredient}: {price} тенге")
        total_cost += price

    # Применение скидки 10%, если стоимость превышает 30,000 тенге
    if total_cost > 30000:
        total_cost *= 0.9
        print(f"\nTotal cost exceeds 30,000 тенге. A 10% discount has been applied.")

    print(f"\nTotal cost: {int(total_cost)} тенге")

# Основная программа
def main():
    while True:
        display_recipes_and_ingredients()
        print("\nChoose an action:")
        print("1. Add a new recipe")
        print("2. Calculate recipe cost")
        print("3. Exit")

        choice = input("> ")
        
        if choice == "1":
            add_new_recipe()
        elif choice == "2":
            calculate_recipe_cost()
        elif choice == "3":
            print("Exiting the program.")
            break
        else:
            print("Invalid choice. Please try again.")

# Запуск программы
main()
