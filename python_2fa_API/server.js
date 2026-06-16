if(process.argv.length != 3)
{
	console.log("USAGE:\nnode server.js [port]");
	return;
}

var crypto, fs, http, sig, jws, header, payload, tbs, keybuf, reqPayload;
const PRIVATEKEY_LOCATION = __dirname+"/private.key";
const headerdata = '{"alg":"ES256","typ":"JWT"}';

http = require('http');
crypto = require("crypto");
fs = require("fs");
const { parse } = require('querystring');

function base64url(str) {
	
	var base64 = Buffer.from(str).toString('base64');
    return base64
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}

function sendErrorResponse(res, msg)
{
	var responseObj = {
		success:false,
		errorString:msg,
	};
	
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(responseObj));
	res.end(); 
}

//create a server object:
http.createServer(function (req, res) {
	
	var responseObj = {};
		
	console.log(req.url);
	if(req.url.indexOf("getKeyPair") != -1)
	{
		
		console.log("Generating key pair ...");
		
		var {publicKey, privateKey} = crypto.generateKeyPairSync(
			'ec', 
			{
				namedCurve:'prime256v1',
				publicKeyEncoding: { type: "spki", format: "pem" },
				privateKeyEncoding: { type: "sec1", format: "pem" }
			},
		);
		
		console.log("Key pair generated...");
		
		responseObj = {
			success:true,
			publicKey:btoa(publicKey),
			privateKey:btoa(privateKey),
		};
		
		try
		{
			fs.writeFileSync(PRIVATEKEY_LOCATION, privateKey);
			console.log("Private key saved in "+PRIVATEKEY_LOCATION);
			
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.write(JSON.stringify(responseObj));
			res.end(); 
		}
		catch(e)
		{
			console.log(e);
			sendErrorResponse(res, "Unable to save private key");
			return;
		}
	}
	else if(req.method == "POST" && req.url.indexOf("/sign") != -1)
	{
		
		reqPayload = "";
		req.on('data', function (chunk) {
			
			reqPayload += chunk.toString();
		});
		req.on('end', function () { 
		
			console.log(reqPayload);
			
			try 
			{
				reqPayload = JSON.parse(reqPayload);
			}
			catch(e)
			{
				console.log(e);
				sendErrorResponse(res, "Invalid request payload");
				return;
			}
			
			if(reqPayload.tbs != undefined)
			{
				if(reqPayload.privateKey != undefined)
				{
					keybuf = Buffer.from(atob(reqPayload.privateKey));
				}
				else
				{
					try 
					{
						keybuf = fs.readFileSync(PRIVATEKEY_LOCATION);
					}
					catch(e)
					{
						console.log(e);
						sendErrorResponse(res, "Private key not generated");
						return;
					}
				}
				
				try 
				{
					reqPayload.tbs = atob(reqPayload.tbs);
				}
				catch(e)
				{
					console.log(e);
					sendErrorResponse(res, "Data to signed base64 decode failed");
					return;
				}
				
				header = base64url(headerdata);
				payload = base64url(reqPayload.tbs);
				tbs = header+"."+payload;

				sig = crypto.sign("sha256", Buffer.from(tbs), {key:keybuf,dsaEncoding:'ieee-p1363'});
				
				jws = tbs+"."+base64url(sig);
				
				responseObj = {
					success:true,
					signature:jws,
				};
				
				res.writeHead(200, {'Content-Type': 'application/json'});
				res.write(JSON.stringify(responseObj));
				res.end(); 
			}
			else
			{
				sendErrorResponse(res, "Incomplete request");
				return;
			}
			
		});
	}
	else
	{
		sendErrorResponse(res, "Invalid requestt");
		return; 
	}
  
}).listen(process.argv[2], function(){
	console.log("xorkeesign JWS node JS server started. URL: http://127.0.0.1:"+process.argv[2]);
});