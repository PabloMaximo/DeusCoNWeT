from twython import Twython
# from time import time
# import httplib

# connection = httplib.HTTPConnection("twitter-timeline-app.appspot.com")
# connection.request("GET", "/app/demo.html")
# response = connection.getresponse()
# data = response.read()
# print data
# print "====================================================================="

#uri = "https://api.twitter.com/1.1/statuses/update.json"
twitter = Twython("J4bjMZmJ6hh7r0wlG9H90cgEe", "8HIPpQgL6d3WWQMDN5DPTHefjb5qfvTFg78j1RdZbR19uEPZMf",
					"3072043347-T00ESRJtzlqHnGRNJZxrBP3IDV0S8c1uGIn1vWf", "OBPFI8deR6420txM1kCJP9eW59Xnbpe5NCbPgOlSJRock")
resp = twitter.update_status(status="Testing some metrics")
print resp
# connection = httplib.HTTPSConnection("api.twitter.com")
# params = urllib.urlencode({
# 	"Authorization": "OAuth",
#     "oauth_consumer_key": "DC0sePOBbQ8bYdC8r4Smg",
#     "oauth_signature_method": "HMAC-SHA1",
#     "oauth_timestamp": str(int(time())),
# 	"oauth_nonce": "-449675027",
# 	"oauth_version": "1.0",
# 	"oauth_token": "3072043347-zCS2VuxT724d4Uk6UoH675i0XCa0l9uaCLo6FeN",
# 	"oauth_signature": "PlK3ohWkSH24a2MCPAO7qI6QMCU%3D"
# })

# headers = {"Content-type": "application/json",
# 			"Accept": "text/json"}
# connection.request("POST", "/1.1/statuses/update.json?status=Bienvenidos al twitter oficial del grupo DEUS", params, headers)
# header = response.getheaders()
# connection.close()
# print data