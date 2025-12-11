"""Small test script to POST an image to the diagnosticar endpoint.

Run from `backend/` directory: `python tmp_test_post.py`

The script will attempt to POST `../frontend/src/assets/img/logo.jpg` as
form field `imagen` to `http://127.0.0.1:8000/api/diagnosticar/` and print the
HTTP status and response body.
"""

import os
import sys

URL = "http://127.0.0.1:8000/api/diagnosticar/"

# Image path relative to backend/ as current working directory
img_rel = os.path.join("..", "frontend", "src", "assets", "img", "logo.jpg")
img_path = os.path.normpath(os.path.join(os.getcwd(), img_rel))

print(f"Using image: {img_path}")

try:
    import requests
except Exception as e:
    print("The 'requests' package is required to run this test. Install it in your environment:")
    print("    pip install requests")
    sys.exit(2)

if not os.path.exists(img_path):
    print("Test image not found at:", img_path)
    sys.exit(3)

try:
    with open(img_path, 'rb') as f:
        files = {'imagen': (os.path.basename(img_path), f, 'image/jpeg')}
        print(f"POSTing to {URL} ...")
        resp = requests.post(URL, files=files, timeout=60)
        print("Status code:", resp.status_code)
        print("Response body:\n", resp.text)
except requests.exceptions.RequestException as e:
    print("Request failed:", str(e))
    sys.exit(1)
except Exception as e:
    print("Error:", str(e))
    sys.exit(1)
