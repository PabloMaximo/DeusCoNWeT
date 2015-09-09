from time import time
import httplib, urllib

#uri = "https://api.twitter.com/1.1/statuses/update.json"

connection = httplib.HTTPSConnection("api.twitter.com")
params = urllib.encode({
	"Authorization": "OAuth",
    "oauth_consumer_key": "DC0sePOBbQ8bYdC8r4Smg",
    "oauth_signature_method": "HMAC-SHA1",
    "oauth_timestamp": str(int(time())),
	"oauth_nonce": "-449675027",
	"oauth_version": "1.0",
	"oauth_token": "3072043347-zCS2VuxT724d4Uk6UoH675i0XCa0l9uaCLo6FeN",
	"oauth_signature": "PlK3ohWkSH24a2MCPAO7qI6QMCU%3D",
	"status": "Bienvenidos al twitter oficial del grupo DEUS"
})

headers = {"Content-type": "application/x-www-form-urlencoded",
			"Accept": "text/plain"}
connection.request("POST", "/1.1/statuses/update.json", params, headers)
response = connection.getresponse()
data = response.read()
connection.close()

print data