import os

def print_directory_structure(path, indent=""):
    try:
        items = os.listdir(path)
    except PermissionError:
        print(f"{indent}Access denied: {path}")
        return

    for item in items:
        full_path = os.path.join(path, item)
        print(f"{indent}{item}")
        
        if os.path.isdir(full_path):
            print_directory_structure(full_path, indent + "  ")

def search_file(path, filename):
   
    try:
        items = os.listdir(path)
    except PermissionError:
        return None

    for item in items:
        full_path = os.path.join(path, item)
        if os.path.isdir(full_path):
            found = search_file(full_path, filename)
            if found:
                return found
        elif os.path.isfile(full_path) and item == filename:
            return full_path

    return None

def calculate_total_size(path):
    
    total_size = 0
    try:
        items = os.listdir(path)
    except PermissionError:
        return total_size

    for item in items:
        full_path = os.path.join(path, item)
        if os.path.isfile(full_path):
            total_size += os.path.getsize(full_path)
        elif os.path.isdir(full_path):
            # Recurse into subdirectory
            total_size += calculate_total_size(full_path)

    return total_size


directory_path = "C:\Users\Ausu\Desktop\ENJOYERS"
filename_to_search = "firstlab.sql"

print("Directory Structure:")
print_directory_structure(directory_path)

print("\nFile Search:")
file_path = search_file(directory_path, filename_to_search)
if file_path:
    print(f"File '{filename_to_search}' found at: {file_path}")
else:
    print(f"File '{filename_to_search}' not found.")

print("\nTotal Directory Size:")
total_size = calculate_total_size(directory_path)
print(f"Total size: {total_size} bytes")
