import grovepi
from time import sleep
led_pin = 5
button_pin = 6

grovepi.pinMode(led_pin, "OUTPUT")
grovepi.pinMode(button_pin, "INPUT")

while True:
    try:
        button_status = grovepi.digitalRead(button_pin)
        print(str(button_status))

        if button_status:
            print("Button Pressed")
            grovepi.digitalWrite(led_pin, 1)
        else:
            print("Button not Pressed")
            grovepi.digitalWrite(led_pin, 0)

        sleep(0.5)
    except KeyboardInterrupt:
        grovepi.digitalWrite(led_pin, 0)
        break
    except (IOError, TypeError) as e:
        print(e)