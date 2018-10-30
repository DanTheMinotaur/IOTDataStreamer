from app.sensors import Sensors

sensor = Sensors()

while True:
    sensor.get_readings()
    print(sensor.readings)