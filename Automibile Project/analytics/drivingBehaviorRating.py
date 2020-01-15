import json
import sys

speedingSum = 0
speedingCount = 0

accSum = 0
accCount = 0

brakeSum = 0
brakeCount = 0

currentSpeed = 0.0
startBrakeSpeed = 0.0
startBrakeTime = 0

startTime = 0
endTime = 0
#f1=open('./brake_speeding', 'w+')

with open(sys.argv[1]) as json_file:
    line = json_file.readline()
    while line:
        data = json.loads(line)
        name = data['name']
        value = data['value']
        timestamp = data['timestamp']
        if(startTime == 0):
            startTime = timestamp
        endTime = timestamp
        if(name == 'vehicle_speed'):
            currentSpeed = value/1.6; #km/h to mile/h
            #print("vehicle speed: " + str(value))
            #f1.write("vehicle speed: " + str(currentSpeed) + "\n")
            if(currentSpeed > 65):
                speedingRating = 10 - int((currentSpeed-60)/5)
            else:
                speedingRating = 10
            speedingSum += speedingRating
            speedingCount += 1
        if((name == 'accelerator_pedal_position') and (value > 0)):
            if(value > currentSpeed):     #if pedal larger than speed
                accRating = 10 - int((value - currentSpeed)/3)
            else:
                accRating = 10
            accSum += accRating
            accCount += 1
        if(name == 'brake_pedal_status'):
            if(value == True):
                startBrakeSpeed = currentSpeed
                startBrakeTime = timestamp
            if(value == False):
                speedDiff = startBrakeSpeed - currentSpeed
                timeDiff = timestamp - startBrakeTime
                brake = speedDiff/timeDiff
                if(brake < 2):
                    brakeRating = 10;
                else:
                    brakeRating = 10 - int((brake-1))
                brakeSum += brakeRating
                brakeCount += 1
            #print("pedal: " + str(data['value']))
            #f1.write("brake pedal: " + str(data['value']) + ", time: " + str(data['timestamp']) + "\n")
        line = json_file.readline()
    
overallSpeedingRating = speedingSum/speedingCount
print("SpeedRating = %.2f" % overallSpeedingRating)

overallAccRating = accSum/accCount
print("AccRating = %.2f" % overallAccRating)

overallBrakeRating = brakeSum/brakeCount
print("BrakeRating = %.2f" % overallBrakeRating)

drivingTime = endTime - startTime
drivingTimeHour = int((drivingTime/60)/60)
if(drivingTimeHour < 4):
    drivingTimeRating = 10
else:
    drivingTimeRating = 10 - (drivingTimeHour - 3)
print("drivingTimeRating = " + str(drivingTimeRating))
#f1.close()
