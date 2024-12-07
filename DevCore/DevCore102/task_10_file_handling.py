import os
import json


recipes = {
    "Pasta": ["Tomatoes", "Cheese", "Spaghetti"],
    "Salad": ["Cucumbers", "Tomatoes", "Lettuce"]
}

# Функция для сохранения рецептов в файл
def save_recipes_to_file(filename="recipes.txt"):
    with open(filename, "w") as file:
        json.dump(recipes, file)
    print(f"Recipes saved to {filename}.")

# Функция для загрузки рецептов из файла
def load_recipes_from_file(filename="recipes.txt"):
    global recipes
    if os.path.exists(filename):
        with open(filename, "r") as file:
            recipes = json.load(file)
        print(f"Recipes loaded from {filename}.")
    else:
        print(f"File {filename} does not exist.")

# Функция для отображения загруженных рецептов
def display_recipes():
    if recipes:
        print("\nLoaded Recipes:")
        for recipe, ingredients in recipes.items():
            print(f"- {recipe}: {', '.join(ingredients)}")
    else:
        print("No recipes available.")


def main():
    while True:
        print("\nChoose an action:")
        print("1. Save recipes to file")
        print("2. Load recipes from file")
        print("3. Show loaded recipes")
        print("4. Exit")

        choice = input("> ")
        
        if choice == "1":
            save_recipes_to_file()
        elif choice == "2":
            load_recipes_from_file()
        elif choice == "3":
            display_recipes()
        elif choice == "4":
            print("Exiting the program.")
            break
        else:
            print("Invalid choice. Please try again.")

# Запуск программы
main()
