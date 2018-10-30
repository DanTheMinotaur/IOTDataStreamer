import dweepy


class Dweeter:
    def __init__(self, thing_name='PIBOMETER'):
        self.thing_name = thing_name

    def send_dweet(self, data):
        response = dweepy.dweet_for(
            self.thing_name,
            data
        )
        return response

    def get_dweets(self):
        return dweepy.get_dweets_for(self.thing_name)


