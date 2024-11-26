
recipes = {
    "Borscht": 3000,
    "Pilaf": 2500,
    "Salad": 1500,
    "Beefsteak": 5000
}


def bubble_sort(recipes_dict):
    sorted_recipes = list(recipes_dict.items())
    n = len(sorted_recipes)
    for i in range(n):
        for j in range(0, n - i - 1):
            if sorted_recipes[j][1] > sorted_recipes[j + 1][1]:
                sorted_recipes[j], sorted_recipes[j + 1] = sorted_recipes[j + 1], sorted_recipes[j]
    return sorted_recipes


def binary_search(sorted_recipes, target_price):
    left, right = 0, len(sorted_recipes) - 1
    while left <= right:
        mid = (left + right) // 2
        if sorted_recipes[mid][1] == target_price:
            return sorted_recipes[mid][0]
        elif sorted_recipes[mid][1] < target_price:
            left = mid + 1
        else:
            right = mid - 1
    return None

def select_recipes_within_budget(sorted_recipes, budget):
    selected_recipes = []
    total_cost = 0
    for recipe, price in sorted_recipes:
        if total_cost + price <= budget:
            selected_recipes.append(recipe)
            total_cost += price
        else:
            break
    return selected_recipes, total_cost


def main():
    print("Available recipes:")
    for recipe, price in recipes.items():
        print(f"{recipe} — {price} тг.")

    while True:
        budget_input = input("\nEnter your budget (or type 'stop' to quit): ")
        if budget_input.lower() == "stop":
            print("Exiting the program.")
            return
        try:
            budget = int(budget_input)
            if budget < 0:
                print("Budget cannot be negative. Please enter a valid amount.")
                continue
            break
        except ValueError:
            print("Please enter a valid number for the budget.")

  
    sorted_recipes = bubble_sort(recipes)
    print("\nRecipes sorted by price:", [recipe for recipe, price in sorted_recipes])

 
    while True:
        target_price_input = input("\nEnter the price of the recipe you are looking for (or type 'stop' to quit): ")
        if target_price_input.lower() == "stop":
            break
        try:
            target_price = int(target_price_input)
            recipe_name = binary_search(sorted_recipes, target_price)
            if recipe_name:
                print(f"Recipe found: {recipe_name} — {target_price} тг.")
            else:
                print("No recipe found with that price.")
        except ValueError:
            print("Please enter a valid number for the target price.")

 
    selected_recipes, total_cost = select_recipes_within_budget(sorted_recipes, budget)
    print(f"\nRecipes you can prepare within your budget ({budget} тг): {selected_recipes}")
    print(f"Total cost: {total_cost} тг.")


main()
