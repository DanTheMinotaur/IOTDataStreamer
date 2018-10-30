import grovepi
import time

print("Start LED Fader")

potentimeter = 2

led = 5


grovepi.pinMode(led, "OUTPUT")
time.sleep(1)

i = 0

#print(str(int(grovepi.analogRead(potentimeter))))

while True:
    try:
        i = grovepi.analogRead(potentimeter)

        print(i)

        grovepi.analogWrite(led, int(i / 4))

    except IOError:
        print("An unexpected Error has occured.")









