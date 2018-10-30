import grovepi
import grove_rgb_lcd

dht_sensor_port = 7

while True:
    try:
        [ temp, hum ] = grovepi.dht(dht_sensor_port, 1)

        print(grovepi.dht(dht_sensor_port, 0))

        print("temp = " + temp)
        print("hum = " + hum + "%")

        t = str(temp)
        h = str(hum)

        grove_rgb_lcd.setRGB(0, 128, 64)
        grove_rgb_lcd.setRGB(0, 255, 0)
        grove_rgb_lcd.setText("Temperature: " + t + "C | Humidity: " + h + "%")

    except (IOError, TypeError):
        print("Errors")