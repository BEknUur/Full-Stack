import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../utils')))
from helpers import lesgo
def main():
    print("The starting of the day\n")
    lesgo()

if __name__ == "__main__":
    main()