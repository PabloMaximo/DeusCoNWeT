from HTMLParser import HTMLParser
import execjs
from time import time

f = open('../../twitter-timeline/static/twitter-timeline.html')
html_file = f.read()
class MyHTMLParser(HTMLParser):
	def __init__(self):
		HTMLParser.__init__(self)
		self._data = []
		self._script = False

	def handle_starttag(self, tag, attributes):
		if tag == 'script':
			self._script = True

	def handle_endtag(self, tag):
		if tag == 'script':
			self._script = False

	def handle_data(self, data):
		if self._script:
			self._data.append(data)

html = MyHTMLParser()
html.feed(html_file)

wc = execjs.compile(html._data)
a = wc.call("response",)


print a