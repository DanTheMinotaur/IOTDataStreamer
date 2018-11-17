import dweepy
import csv


class Dweeter:
    """
        Wrapper Class for Dweet.io
    """
    def __init__(self, thing_name='PIBOMETER'):
        self.thing_name = thing_name

    """
        Method will post data to dweet and then store the response in the csv file. 
    """
    def send_dweet(self, data):
        print("Posting to DWEETER https://dweet.io/get/dweets/for/" + self.thing_name)
        response = dweepy.dweet_for(
            self.thing_name,
            data
        )
        with open('data/sent_data.csv', 'a') as file:
            row = [
                response['thing'],
                response['created'],
                response['content']['ultrasonic_distance'],
                response['content']['weather_readings']['temperature'],
                response['content']['weather_readings']['humidity'],
                response
            ]
            writer = csv.writer(file)
            writer.writerow(row)

        return response

    """
        Returns the dweets for the defined thing.
    """
    def get_dweets(self):
        return dweepy.get_dweets_for(self.thing_name)



