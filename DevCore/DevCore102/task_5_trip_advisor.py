def calculate(a, cost):
    active = "active"
    unactive = "relax"
    
    # Activities lists
    activities_active = ["mountains", "forest", "desert"]
    activities_unactive = ["beach", "SPA", "hotel"]

    # Check for active activities
    if a == active:
        if 10000 < cost <= 30000:
            print(activities_active[0])  # Mountains
        elif cost <= 10000:
            print(activities_active[1])  # Forest
        elif cost > 30000:
            print(activities_active[2])  # Desert

    # Check for unactive activities
    elif a == unactive:
        if cost > 50000:
            print(activities_unactive[0])  # Beach
        elif 15000 <= cost < 50000:
            print(activities_unactive[1])  # SPA
        elif 5000 <= cost < 15000:
            print(activities_unactive[2])  # Hotel
    else:
        print("No choice")


# Get user input and call the function
soz = input("Enter activity type (active/relax): ")
money = int(input("Enter your budget: "))
calculate(soz, money)


        

