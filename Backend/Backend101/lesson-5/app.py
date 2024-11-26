import os 
from dotenv import load_dotenv
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(dotenv_path)
api_key=os.environ.get('API_KEY')
debug_mode=os.environ.get('DEBUG_MODE')

if debug_mode=='True':
    debug_mode=True
else:
    debug_mode=False

print(f"API_KEY: {api_key}")
print(f"DEBUG_MODE: {debug_mode}")