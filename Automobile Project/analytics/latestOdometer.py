import json

with open('highway-speeding.json') as json_file:
    line = json_file.readline()
    odometerValue=0
    while line:
        data = json.loads(line)
        value = data['value']
        if(data['name'] == 'odometer'):
            if(value > odometerValue):
                odometerValue = value
        line = json_file.readline()
print(int(odometerValue))


