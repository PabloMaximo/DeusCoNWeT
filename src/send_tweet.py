from time import time

uri = "https://api.twitter.com/1.1/statuses/update.json"

params = {
      "oauth_consumer_key": "J4bjMZmJ6hh7r0wlG9H90cgEe",
      "oauth_signature_method": "HMAC-SHA1",
      "oauth_timestamp": str(int(time())),
      "oauth_nonce": str(getrandbits(64)),
      "oauth_version": "1.0"
    }