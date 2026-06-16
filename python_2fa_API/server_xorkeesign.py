import hashlib
import os
import json
import http.client
import time
import base64

from flask import Flask, request, jsonify, redirect, send_from_directory, url_for

app = Flask(__name__, static_folder=".", template_folder="html")

PORT = 8090
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Global state (mirrors MyHandler class variables)
auth_response = None
xorkee_handle = None


# ── HTTPS connection ──────────────────────────────────────────────────────────
def send_https_request(host, port, endpoint, payload, headers):
    try:
        conn = http.client.HTTPSConnection(host, port)
        conn.request("POST", endpoint, payload, headers)
        print(" 🚀 request API sent ")
        res = conn.getresponse()
        response_data = res.read().decode("utf-8")
        print(response_data)
        return res.status, json.loads(response_data)
    except Exception as e:
        return None, {"error": str(e)}


# ── HTTP connection ───────────────────────────────────────────────────────────
def send_http_request(host, port, endpoint, payload, headers):
    try:
        conn = http.client.HTTPConnection(host, port)
        conn.request("POST", endpoint, payload, headers)
        print(" 🚀 request API sent for token ")
        res = conn.getresponse()
        response_data = res.read().decode("utf-8")
        print(response_data)
        return res.status, json.loads(response_data)
    except Exception as e:
        return None, {"error": str(e)}


# ── GET routes ────────────────────────────────────────────────────────────────
@app.route("/scripts/<path:filename>")
def serve_scripts(filename):
    return send_from_directory("scripts", filename)


@app.route("/")
@app.route("/login")
def login():
    global auth_response
    auth_response = None
    return send_from_directory("html", "login.html")


@app.route("/formtransaction")
def formtransaction():
    return send_from_directory("html", "formtransaction.html")


@app.route("/success", methods=["GET"])
def success_get():
    return send_from_directory("html", "success.html")


@app.route("/home", methods=["GET"])
def home_get():
    return send_from_directory("html", "home.html")


@app.route("/generate-ecc-key")
def generate_ecc_key():
    return send_from_directory("html", "generate-ecc-key.html")


@app.route("/LoginAPI")
def login_api():
    return send_from_directory("html", "LoginAPI.html")


@app.route("/TransactionAPI")
def transaction_api():
    return send_from_directory("html", "TransactionAPI.html")


@app.route("/Pre-Requsites")
def pre_requisites():
    return send_from_directory("html", "Pre-Requsites.html")


@app.route("/JWTAPI")
def jwt_api():
    return send_from_directory("html", "JWTAPI.html")


@app.route("/filetransaction")
def filetransaction():
    return send_from_directory("html", "filetransaction.html")


@app.route("/upload", methods=["GET"])
def upload_get():
    return send_from_directory("html", "upload.html")


# Fallback for any other GET paths under /html/
@app.route("/<path:filename>", methods=["GET"])
def serve_html(filename):
    return send_from_directory("html", filename)


# ── POST /home ────────────────────────────────────────────────────────────────
@app.route("/home", methods=["POST"])
def home_post():
    global auth_response, xorkee_handle

    if not request.is_json:
        return jsonify({"error": "Content-Type must be application/json"}), 400

    data = request.get_json()
    print("JSON Data:", data)

    try:
        # Sign application data to get token
        epoch_seconds = int(time.time())
        tobesigned = json.dumps({"applicationId": "Demo_Application", "time": epoch_seconds})
        tbs_base64 = base64.b64encode(tobesigned.encode()).decode()

        payload = json.dumps({
            "tbs": tbs_base64,
            "privateKey": "LS0tLS1CRUdJTiBFQyBQUklWQVRFIEtFWS0tLS0tCk1IY0NBUUVFSU4ydW44ZFFxTDQrTjBNSEVvMUR4QmsyQ1RPMXVqY2c0WVpEa082RWx0ZTZvQW9HQ0NxR1NNNDkNCkF3RUhvVVFEUWdBRUZWSVlPWmZaMm1aUDlteFZrczVHOERPZnliVjBlMFliQ1YrdUtadW1XZjBzUWk4M0N6WmgNCko0Z2NqQThSM0VqOGM0WG1XdUovTFRsUExtL2NEOC9wTUE9PQotLS0tLUVORCBFQyBQUklWQVRFIEtFWS0tLS0tCg"
        })

        print(payload)
        sign_headers = {"Content-Type": "application/json"}

        status, signature_response = send_http_request("signing-service", 8888, "/sign", payload, sign_headers)
        print(signature_response)

        if "signature" not in signature_response:
            return jsonify({"error": "Signature computation failed"}), 500

        print("signature received proceeding to fetch token")

        # Request token
        payload = json.dumps({"signature": signature_response["signature"]})
        print("payload signature:", payload)

        status, token_response = send_https_request("xorkeesign.com", 443, "/api/auth/login", payload, sign_headers)

        if status != 200 or "token" not in token_response:
            return jsonify({"error": "Authentication failed: token missing"}), 401

        auth_response = token_response["token"]
        print("Auth response for global use:", auth_response)

        # Login request
        handle = data["xorkeehandle"]
        xorkee_handle = handle
        login_req = str(data)
        data_sha256digest = hashlib.sha256(login_req.encode("ascii")).digest()
        tbs_base64 = base64.b64encode(data_sha256digest).decode()

        payload = json.dumps({
            "handle": xorkee_handle,
            "digest": tbs_base64,
            "displayData": login_req
        })
        print("printing login payload", payload)

        sign_headers = {
            "Content-Type": "application/json",
            "authorization": "Bearer " + auth_response
        }
        print("printing sign headers", sign_headers)

        status, sign_response = send_https_request(
            "xorkeesign.com", 443,
            "/api/signDigest?userCert=false&pkcs1=false",
            payload, sign_headers
        )

        if status == 200 and "signature" in sign_response:
            return send_from_directory("html", "home.html")
        else:
            return jsonify({"error": str(sign_response)}), 401

    except Exception as e:
        return jsonify({"error": f"Signature computation failed: {str(e)}"}), 500


# ── POST /success ─────────────────────────────────────────────────────────────
@app.route("/success", methods=["POST"])
def success_post():
    global auth_response, xorkee_handle

    if not request.is_json:
        return jsonify({"error": "Content-Type must be application/json"}), 400

    data = request.get_json()
    print("JSON Data:", data)
    print("📨 Success page data received:", data)
    print(f"authtoken={auth_response}")

    if not auth_response:
        return jsonify({"error": "Auth token not available. Access /home or perform login action first."}), 403

    form_req = str(data)
    data_sha256digest = hashlib.sha256(form_req.encode("ascii")).digest()
    tbs_base64 = base64.b64encode(data_sha256digest).decode()

    payload = json.dumps({
        "handle": xorkee_handle,
        "digest": tbs_base64,
        "displayData": tbs_base64
    })

    txn_headers = {
        "Content-Type": "application/json",
        "authorization": "Bearer " + auth_response
    }

    status, sign_response = send_https_request(
        "xorkeesign.com", 443,
        "/api/signDigest?userCert=false&pkcs1=false",
        payload, txn_headers
    )

    if status == 200 and "signature" in sign_response:
        return send_from_directory("html", "success.html")
    else:
        return jsonify({"error": "Authentication failed: signature missing"}), 401


# ── POST /upload ──────────────────────────────────────────────────────────────
@app.route("/upload", methods=["POST"])
def upload_post():
    global auth_response, xorkee_handle

    print("request received for upload file")

    if "filename[]" not in request.files:
        return jsonify({"error": "No files received"}), 400

    files = request.files.getlist("filename[]")

    # Compute SHA-256 hash for each file
    multifile = []
    file_data_map = []  # store (filename, bytes) for saving later

    for file_item in files:
        if not file_item.filename:
            continue

        file_bytes = file_item.read()
        hasher = hashlib.sha256()
        hasher.update(file_bytes)
        digest_bytes = hasher.digest()
        tbs_base64 = base64.b64encode(digest_bytes).decode()
        multifile.append(tbs_base64)
        file_data_map.append((file_item.filename, file_bytes))

    print("printing multiple hashes", multifile)

    # Call sign digest API
    payload = json.dumps({
        "handle": xorkee_handle,
        "digest": multifile,
        "displayData": str(multifile)
    })

    print("printing payload", payload)

    txn_headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + auth_response
    }

    status, sign_response = send_https_request(
        "xorkeesign.com", 443,
        "/api/signmultipledigests?userCert=false&pkcs1=false",
        payload, txn_headers
    )

    if "signature" not in sign_response:
        return jsonify({"error": "Signing failed. Upload rejected."}), 401

    print("✅ Signature received")

    # Save files to local directory
    saved_files = []
    for filename, file_bytes in file_data_map:
        safe_name = os.path.basename(filename)
        file_path = os.path.join(UPLOAD_DIR, safe_name)
        with open(file_path, "wb") as f:
            f.write(file_bytes)
        saved_files.append(safe_name)

    if not saved_files:
        return jsonify({"error": "No valid files received"}), 400

    print("📁 Uploaded files:", saved_files)

    return redirect("/upload", code=303)


# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    print(f"🚀 Server is live at http://localhost:{PORT}")
    app.run(host="0.0.0.0", port=PORT, debug=False)
