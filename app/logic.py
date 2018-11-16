from app.sensors import Sensors
from app.uploader import Dweeter
from time import sleep
import json

class Controller:
    # Class is for controlling application logic, optional parameter to call what is sent to dweeter something else.
    def __init__(self, config_file='config.json'):

        config_data = self.load_config(config_file)

        self.sensors = Sensors()
        self.sensor_distance = 30

        if config_data is None:
            print("Using Default Configurations")
            self.uploader = Dweeter()
        else:
            print("Custom Configuration file being used " + str(config_data))
            self.uploader = Dweeter(config_data['config']['name'])
            self.sensors.ultrasonic_pin = config_data['config']['ultrasonic_pin']
            self.sensors.weather_sensor_pin = config_data['config']['weather_sensor_pin']
            self.sensors.button_pin = config_data['config']['button_pin']
            self.sensors.led_pin = config_data['config']['led_pin']
            self.sensor_distance = config_data['config']['sensor_distance']
        """
        if dweeter_name is not None:
            self.uploader = Dweeter(dweeter_name)
        else:
            self.uploader = Dweeter()
        """
        self.sensors = Sensors()


    @staticmethod
    def load_config(config_file):
        # Method checks config.json for valid config options and returns them or returns None if they are invalid
        try:
            with open(config_file) as f:
                data = json.load(f)

            if 'config' in data:
                config_values = [
                    'name',
                    'ultrasonic_pin',
                    'weather_sensor_pin',
                    'button_pin',
                    'led_pin',
                    'sensor_distance'
                ]
                for value in config_values:
                    if value not in data['config']:
                        print("Could not find configuration for " + value)
                        return None
                return data
            else:
                print("No Config Key Found")
                return None
        except FileNotFoundError:
            print(config_file + " could not be found")
            return None


    def application(self):
        # Controls the main application logic using a loop
        # Checks to see if the button has been clicked
        # activation distance can be changed to increase the range
        try:
            device_already_on = False
            while True:
                sleep(1)
                if self.sensors.get_button_status() == 1 and device_already_on is False:
                    self.sensors.led_on()
                    self.sensors.device_on = True
                    device_already_on = True
                elif self.sensors.get_button_status() == 1 and device_already_on:
                    self.sensors.led_off()
                    self.sensors.device_on = False
                    device_already_on = False
                    print("Shutting Down")
                    break
                else:
                    if self.sensors.device_on:
                        print("Device On")
                        distance = self.sensors.get_ultrasonic()
                        print("Current Distance: " + str(distance))

                        if distance <= self.sensor_distance:
                            print("Transmitting Data")
                            self.sensors.get_readings()
                            self.sensors.led_off()
                            data = self.sensors.readings
                            print(data)
                            response = self.uploader.send_dweet(data)
                            self.sensors.led_on()
                            sleep(.25)
                            self.sensors.led_off()
                            print("Data Transmitted")
                            sleep(.25)
                            print(response)
                            self.sensors.led_on()
                    else:
                        print("Device Off")

                print("device_on: " + str(self.sensors.device_on))
                print("device_already_on: " + str(device_already_on))
                print("------------------------------------------------")
        except KeyboardInterrupt:
            print("Application Ended By Command Line")
        finally:
            self.sensors.led_off()