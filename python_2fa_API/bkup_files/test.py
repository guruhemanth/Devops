import base64
import http.server
import socketserver
import os
import json
import http.client
import ssl
import time
import hashlib


def send_http_request(host, port, endpoint, payload, headers):
        conn = http.client.HTTPConnection(host, port)
        conn.request("POST", endpoint, payload, headers)
        res = conn.getresponse()
        response_data = res.read().decode("utf-8")
        return res.status, json.loads(response_data)


def send_https_request(host, port, endpoint, payload, headers):
    conn = http.client.HTTPSConnection(host, port)
    conn.request("POST", endpoint, payload, headers)
    res = conn.getresponse()
    response_data = res.read().decode("utf-8")
    return res.status, json.loads(response_data)

# for signature---
epoch_seconds = int(time.time())
tobesigned =json.dumps({"applicationId":"Demo_Application","time":epoch_seconds})
tbs_base64 = base64.b64encode(str(tobesigned).encode()).decode()
print(tobesigned)
print(tbs_base64)

load=json.dumps({
            "tbs":tbs_base64,
            "privateKey":"LS0tLS1CRUdJTiBFQyBQUklWQVRFIEtFWS0tLS0tCk1IY0NBUUVFSU4ydW44ZFFxTDQrTjBNSEVvMUR4QmsyQ1RPMXVqY2c0WVpEa082RWx0ZTZvQW9HQ0NxR1NNNDkNCkF3RUhvVVFEUWdBRUZWSVlPWmZaMm1aUDlteFZrczVHOERPZnliVjBlMFliQ1YrdUtadW1XZjBzUWk4M0N6WmgNCko0Z2NqQThSM0VqOGM0WG1XdUovTFRsUExtL2NEOC9wTUE9PQotLS0tLUVORCBFQyBQUklWQVRFIEtFWS0tLS0tCg"
            })

print(load)

sign_headers = {
'Content-Type': "application/json"
}

status, auth_response = send_http_request("127.0.0.1", 8888, "/sign", load, sign_headers)

print("Auth response:", auth_response)


# for token-----------

payload = json.dumps({
    "signature": auth_response["signature"]
})

sign_headers = {
    'Content-Type': "application/json"
}

print(payload)
print(sign_headers)
status, token_response = send_https_request("xorkeesign.com", 443, "/api/auth/login", payload, sign_headers)

print ( "token:", token_response["token"] )

#Login ----------------------------------

data=json.dumps({"username":"test"})
print(data)
data_sha256digest = hashlib.sha256(data.encode()).digest()
tbs_base64 = base64.b64encode(str(data_sha256digest).encode()).decode()
print("digest:",tbs_base64)
payload = json.dumps({
    "handle": "guruhemantht@xorkee.com",
    "digest": tbs_base64,
    "displaydata": "this is text"
})
print(payload)
sign_headers = {
    'Content-Type': "application/json",
    'authorization': auth_response.get("bearer", "")
}

status, sign_response = send_https_request("xorkeesign.com", 443, "/api/signDigest?userCert=false&pkcs1=false", payload,
                                           sign_headers)
if status == 200 and "signature" in sign_response:
    self.path = "/html/home.html"
    print("working")
else:
    self.send_error_response(401, "Authentication failed: signature missing")


