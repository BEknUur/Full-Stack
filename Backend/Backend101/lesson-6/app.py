import requests
import numpy as np

response = requests.get('https://jsonplaceholder.typicode.com/todos/1')
if response.status_code == 200:
    print(f"Response from API: {response.json()}")
else:
    print(f"Failed to fetch data. Status code: {response.status_code}")

# The example of using the numpy library :)
array = np.array([1, 2, 3, 4, 5])
print(f"Numpy array: {array}")
print(f"Sum of the array: {np.sum(array)}")