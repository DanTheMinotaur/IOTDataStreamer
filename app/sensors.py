import grovepi
from math import isnan
from datetime import datetime

class SensorSetUp:
    # Class for configuration of pin settings
    ultrasonic_pin = 8
    weather_sensor_pin = 7
    button_pin = 6
    led_pin = 5


class Sensors(SensorSetUp):
    def __init__(self):
        # Set Button as input mode
        grovepi.pinMode(self.button_pin, "INPUT")
        # Set LED to off initially
        grovepi.digitalWrite(self.led_pin, 0)
        # Data Structure for sensor readings
        self.readings = {
            "ultrasonic_distance": None,
            "weather_readings": {
                "temperature": None,
                "humidity": None
            },
            "reading_created": None
        }
        self.device_on = False
        self.led_off()

    def __get_weather(self):
        # Method gets the temp and hummidity sensor. If there are no valid readings it returns none
        [t, h] = grovepi.dht(self.weather_sensor_pin, 0)
        if not isnan(t) and not isnan(h):
            return {"temp": t, "hum": h}
        else:
            return None

    def get_ultrasonic(self):
        # Method returns ultrasonic readings from sensor
        return grovepi.ultrasonicRead(self.ultrasonic_pin)

    def get_button_status(self):
        # Method returns the current status of a button, e.g. if it was clicked or not
        return grovepi.digitalRead(self.button_pin)

    def get_readings(self):
        # Methods assigns all methods to instance dictionary
        self.readings["ultrasonic_distance"] = self.get_ultrasonic()
        weather_data = self.__get_weather()
        if weather_data is not None:
            self.readings["weather_readings"]["temperature"] = weather_data["temp"]
            self.readings["weather_readings"]["humidity"] = weather_data["hum"]

        self.readings["reading_created"] = str(datetime.now())

    # Methods turn on and off LED
    def led_on(self):
        grovepi.digitalWrite(self.led_pin, 1)

    def led_off(self):
        grovepi.digitalWrite(self.led_pin, 0)