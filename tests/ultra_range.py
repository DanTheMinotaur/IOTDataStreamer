import grovepi

ultrasonic_ranger = 4
relay_pin = 2

grovepi.pinMode(relay_pin, "OUTPUT")

while True:
    try:
        distance = grovepi.ultrasonicRead(ultrasonic_ranger)
        print("Distance: " + str(distance))

        if distance <= 10:
            grovepi.digitalWrite(relay_pin, 1)
        else:
            grovepi.digitalWrite(relay_pin, 0)

    except TypeError:
        print("Errors")
    except IOError:
        print("Error")