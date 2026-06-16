import hashlib
import http.server
import socketserver
import os
import json
import http.client
import ssl
import time
import base64
import cgi



PORT = 8090

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

#Https connection --------------------------------------------------------------------------------------------
def send_https_request(host, port, endpoint, payload, headers):
    try:
        conn = http.client.HTTPSConnection(host, port)
        conn.request("POST", endpoint, payload, headers)
        res = conn.getresponse()
        response_data = res.read().decode("utf-8")
        print(response_data)
        return res.status, json.loads(response_data)
    except Exception as e:
        return None, {"error": str(e)}

#Http connection ------------------------------------------------------------------------

def send_http_request(host, port, endpoint, payload, headers):
    try:
        conn = http.client.HTTPConnection(host, port)
        conn.request("POST", endpoint, payload, headers)
        res = conn.getresponse()
        response_data = res.read().decode("utf-8")
        print(response_data)
        return res.status, json.loads(response_data)
    except Exception as e:
        return None, {"error": str(e)}

# define class --------------------------------------------------------------------------------
class MyHandler(http.server.SimpleHTTPRequestHandler):
    auth_response = None
    # define get requests ------------------------------------------------------------------------
    def do_GET(self):
        if self.path.startswith("/scripts/"):
            self.path = "scripts" + self.path[len("/scripts"):]
        elif self.path in ["/", "/login"]:
            MyHandler.auth_response = None
            self.path = "/html/login.html"
        elif self.path == "/formtransaction":
            self.path = "/html/formtransaction.html"
        elif self.path == "/success":
            self.path = "/html/success.html"
        elif self.path == "/home":
            self.path = "/html/home.html"
        elif self.path == "/generate-ecc-key":
            self.path = "/html/generate-ecc-key.html"
        elif self.path == "/LoginAPI":
            self.path = "/html/LoginAPI.html"
        elif self.path == "/TransactionAPI":
            self.path = "/html/TransactionAPI.html"
        elif self.path == "/Pre-Requsites":
            self.path = "/html/Pre-Requsites.html"
        elif self.path == "/JWTAPI":
            self.path = "/html/JWTAPI.html"
        elif self.path == "/filetransaction":
            self.path = "/html/filetransaction.html"
        elif self.path == "/upload":
            self.path = "/html/upload.html"
        else:
            self.path = "/html" + self.path

        return http.server.SimpleHTTPRequestHandler.do_GET(self)
    # define post requests ----------------------------------------------------------
    def do_POST(self):
        content_type = self.headers.get("Content-Type", "")

        # ---------- JSON REQUEST ----------
        if content_type.startswith("application/json"):
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)

            try:
                data = json.loads(post_data.decode("utf-8"))
                print("JSON Data:", data)

                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"JSON received successfully")
            except json.JSONDecodeError:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b"Invalid JSON format")

        if self.path == "/home":
            print("🔐 Authenticating user for /home page...")

            try:
                #to be signed application data for token------------
                epoch_seconds = int(time.time())
                tobesigned = json.dumps({"applicationId": "Demo_Application","time": epoch_seconds})
                tbs_base64 = base64.b64encode(str(tobesigned).encode()).decode()

                payload = json.dumps({
                    "tbs":tbs_base64,
                    "privateKey":"LS0tLS1CRUdJTiBFQyBQUklWQVRFIEtFWS0tLS0tCk1IY0NBUUVFSU4ydW44ZFFxTDQrTjBNSEVvMUR4QmsyQ1RPMXVqY2c0WVpEa082RWx0ZTZvQW9HQ0NxR1NNNDkNCkF3RUhvVVFEUWdBRUZWSVlPWmZaMm1aUDlteFZrczVHOERPZnliVjBlMFliQ1YrdUtadW1XZjBzUWk4M0N6WmgNCko0Z2NqQThSM0VqOGM0WG1XdUovTFRsUExtL2NEOC9wTUE9PQotLS0tLUVORCBFQyBQUklWQVRFIEtFWS0tLS0tCg"
                })

                print(payload)
                sign_headers = {
                    'Content-Type': "application/json",
                }

                status, signature_response = send_http_request("127.0.0.1", 8888, "/sign", payload, sign_headers)
                print (signature_response)
                if "signature" in signature_response:
                    print ("signature received proceeding to fetch token")
            except Exception as e:
                self.send_error_response(500, f"Signature computation failed: {str(e)}")
                return

            #request for token-----------

            payload = json.dumps({
                "signature":signature_response["signature"]
            })

            print ("payload signature:", payload)

            sign_headers = {
                'Content-Type': "application/json",
            }

            status, token_response = send_https_request("xorkeesign.com", 443, "/api/auth/login", payload, sign_headers)

            if status == 200 and "token" in token_response:
                token_save=token_response["token"]
                MyHandler.auth_response = token_save  # ✅ Store for reuse
                print("Auth response for global use:", MyHandler.auth_response)
            else:
                self.send_error_response(401, "Authentication failed: token missing")
                return

            # request for login --------------------------------------
            login_req=str(data)
            data_sha256digest=hashlib.sha256(login_req.encode("ascii")).digest()
            tbs_base64 = base64.b64encode(data_sha256digest).decode()

            payload = json.dumps({"handle":"guruhemantht@xorkee.com",
                                  "digest":tbs_base64,
                                  "displayData":login_req})
            print("printing login payload", payload)

            sign_headers = {
                'Content-Type':"application/json",
                'authorization':"Bearer "+MyHandler.auth_response
            }
            print("printing sign headers", sign_headers )

            if MyHandler.auth_response is  not None:
                status, sign_response = send_https_request("xorkeesign.com", 443, "/api/signDigest?userCert=false&pkcs1=false", payload,sign_headers)
                if status == 200 and "signature" in sign_response:
                    self.path = "/html/home.html"
                    return http.server.SimpleHTTPRequestHandler.do_GET(self)
                else:
                    self.send_error_response(401, "Authentication failed: signature missing")
                    return
            else:
                self.send_error_response(401, "Token not found")
                return
        elif self.path == "/success":
            print("📨 Success page data received:", data)
            print(f"authtoken={MyHandler.auth_response}")
            if not MyHandler.auth_response:
                self.send_error_response(403, "Auth token not available. Access /home or perform login action first.")
                return
            print(f"authtoken={MyHandler.auth_response}")
            form_req = str(data)
            data_sha256digest = hashlib.sha256(form_req.encode("ascii")).digest()
            tbs_base64 = base64.b64encode(data_sha256digest).decode()

            payload = json.dumps({"handle": "guruhemantht@xorkee.com",
                                  "digest": tbs_base64,
                                  "displayData":tbs_base64})
            txn_headers = {
                'Content-Type': "application/json",
                'authorization': "Bearer "+MyHandler.auth_response
            }
            status, sign_response = send_https_request("xorkeesign.com", 443, "/api/signDigest?userCert=false&pkcs1=false", payload, txn_headers)
            if status == 200 and "signature" in success_response:
                self.path = "/html/success.html"
                return http.server.SimpleHTTPRequestHandler.do_GET(self)
            else:
                self.send_error_response(401, "Authentication failed: signature missing")
                return

        elif self.path == "/upload":
            print("request received for upload file")
            self.handle_file_upload()
            return

    def send_error_response(self, status_code, message):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({ "error": message }).encode("utf-8"))

    def send_success_response(self, message):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({ "message": message }).encode("utf-8"))



#--------file upload-----------
    def handle_file_upload(self):

        content_type = self.headers.get("Content-Type", "")
        if not content_type.startswith("multipart/form-data"):
            self.send_error_response(415, "Content-Type must be multipart/form-data")
            return

        form = cgi.FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={
                "REQUEST_METHOD": "POST",
                "CONTENT_TYPE": content_type,
            }
        )

        if "filename[]" not in form:
            self.send_error_response(400, "No files received")
            return

        file_field = form["filename[]"]
        files = file_field if isinstance(file_field, list) else [file_field]

        saved_files = []

        for file_item in files:
            if not file_item.filename:
                continue

            filename = os.path.basename(file_item.filename)
            file_path = os.path.join(UPLOAD_DIR, filename)

            with open(file_path, "wb") as f:
                f.write(file_item.file.read())

            saved_files.append(filename)

        if not saved_files:
            self.send_error_response(400, "No valid files received")
            return

        print("📁 Uploaded files:", saved_files)

        self.send_response(303)
        self.send_header("Location", "/upload")
        self.end_headers()


os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"🚀 Server is live at http://localhost:{PORT}")
    httpd.serve_forever()