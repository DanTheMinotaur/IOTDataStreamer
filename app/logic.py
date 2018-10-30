from app.sensors import Sensors
from app.uploader import Dweeter
from time import sleep

class Controller:
    # Class is for controlling application logic, optional parameter to call what is sent to dweeter something else.
    def __init__(self, dweeter_name=None):
        if dweeter_name is not None:
            self.uploader = Dweeter(dweeter_name)
        else:
            self.uploader = Dweeter()

        self.sensors = Sensors()

    def application(self, activation_distance):
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

                        if distance <= activation_distance:
                            print("Transmitting Data")
                            self.sensors.get_readings()
                            data = self.sensors.readings
                            print(data)
                            response = self.uploader.send_dweet(data)
                            print("Data Transmitted")
                            print(response)
                    else:
                        print("Device Off")

                print("device_on: " + str(self.sensors.device_on))
                print("device_already_on: " + str(device_already_on))
                print("------------------------------------------------")
        except KeyboardInterrupt:
            print("Application Ended By Command Line")
        finally:
            self.sensors.led_off()