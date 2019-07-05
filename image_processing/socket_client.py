from threading import Thread
from socketclusterclient import Socketcluster
import logging
import time

logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.DEBUG)
# def threaded_function(arg):
  
def onconnect(socket):
  logging.info("on connect got called")
  socket.subscribeack('iot_chanel', suback)
  socket.onchannel('iot_chanel', channelmessage)
  # while True:
  #   socket.publish('iot_chanel', 'Hi dudies')
  #   print('hi')
  #   time.sleep(5)

def ondisconnect(socket):
    logging.info("on disconnect got called")


def onConnectError(socket, error):
    logging.info("On connect error got called")
    
def suback(channel, error, object):
    if error is '':
        print ("Subscribed successfully to channel " + channel)

def channelmessage(key, object):
    print ("Got data " + str(object) + " from key " + str(key))
def suback(channel, error, object):
    if error is '':
        print ("Subscribed successfully to channel " + channel)
if __name__ == "__main__":
    socket = Socketcluster.socket("ws://localhost:8000/socketcluster/")
    socket.setBasicListener(onconnect, ondisconnect, onConnectError)
    socket.connect()