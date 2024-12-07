import random


player = {
    "name": "",
    "health": 100,
    "inventory": []
}

def start_game():
    print("Welcome, brave adventurer! You are on a quest to find the fabled Treasure of Eldoria.")
    player["name"] = input("Enter your name: ")
    print(f"{player['name']}, your journey begins now. Where will you go first?")

    while True:
        choice = input("Choose a path: (1) Go to the forest or (2) Head to the river: ").strip()
        if choice == "1":
            explore_forest()
            break
        elif choice == "2":
            explore_river()
            break
        else:
            print("Invalid choice. Please choose '1' or '2'.")


def explore_forest():
    print("\nYou enter the dense forest. The trees tower over you, and shadows dance in the undergrowth.")
    while True:
        choice = input("You see a strange light deeper in the forest. Do you (1) investigate or (2) ignore it? ").strip()
        if choice == "1":
            encounter_monster()
            break
        elif choice == "2":
            print("You decide not to risk it and head back to the forest edge.")
            find_clearing()
            break
        else:
            print("Invalid choice. Please choose '1' or '2'.")

def explore_river():
    print("\nYou follow the river’s edge, listening to the gentle flow of water.")
    while True:
        choice = input("You find a boat tied to a tree. Do you (1) take the boat downstream or (2) continue on foot? ").strip()
        if choice == "1":
            find_treasure()
            break
        elif choice == "2":
            encounter_bandits()
            break
        else:
            print("Invalid choice. Please choose '1' or '2'.")

def encounter_monster():
    print("\nA monster leaps out from the shadows! It's a fierce wolf.")
    while player["health"] > 0:
        action = input("Do you (1) fight or (2) run? ").strip()
        if action == "1":
            if fight_monster():
                print("You defeated the monster!")
                player["inventory"].append("Wolf Claw")
                find_clearing()
                break
            else:
                print("The monster defeated you.")
                end_game("lost")
                break
        elif action == "2":
            print("You manage to escape, but you feel shaken.")
            find_clearing()
            break
        else:
            print("Invalid choice. Please choose '1' or '2'.")


def fight_monster():
    success = random.choice([True, False])
    if success:
        player["health"] -= random.randint(5, 15)
        return True
    else:
        player["health"] -= random.randint(15, 30)
        return False

# Функция для встречи с бандитами
def encounter_bandits():
    print("\nYou encounter a group of bandits!")
    if "Wolf Claw" in player["inventory"]:
        print("The bandits see the Wolf Claw you carry and are intimidated. They let you pass.")
        find_treasure()
    else:
        print("The bandits attack you!")
        if fight_monster():
            print("You fought off the bandits.")
            player["inventory"].append("Bandit's Dagger")
            find_treasure()
        else:
            print("The bandits overwhelmed you.")
            end_game("lost")

# Функция для нахождения поляны
def find_clearing():
    print("\nYou find a small clearing with a hidden treasure chest!")
    while True:
        choice = input("Do you (1) open the chest or (2) leave it alone? ").strip()
        if choice == "1":
            player["inventory"].append("Golden Amulet")
            print("You found a Golden Amulet! You feel a sense of accomplishment.")
            end_game("won")
            break
        elif choice == "2":
            print("You leave the chest and continue your journey.")
            end_game("lost")
            break
        else:
            print("Invalid choice. Please choose '1' or '2'.")

# Функция для нахождения сокровища
def find_treasure():
    print("\nYou arrive at a secluded island. Among the trees, you find the legendary Treasure of Eldoria!")
    player["inventory"].append("Treasure of Eldoria")
    end_game("won")

# Функция для окончания игры
def end_game(result):
    if result == "won":
        print(f"\nCongratulations, {player['name']}! You have found the treasure and completed your adventure!")
        print("Inventory:", player["inventory"])
    elif result == "lost":
        print(f"\nSadly, {player['name']} has met an unfortunate end.")
        print("Game over. Better luck next time!")

# Запуск игры
start_game()
