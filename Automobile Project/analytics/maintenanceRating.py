import csv

ratingSum = 0
count = -1

with open('openxcData/OBD.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile)
    for row in spamreader:
        count += 1
        rating = 0
        if(count > 0):
            engineCoolantTemperature = int(row[12])
            if(195 <= engineCoolantTemperature <= 220):
                rating = 10
            if(150 <= engineCoolantTemperature <= 194):
                rating = 9
            if(100 <= engineCoolantTemperature <= 149):
                rating = 8
            if(90 <= engineCoolantTemperature <= 99):
                rating = 7
            if(engineCoolantTemperature < 90):
                rating = 7 - int((90 - engineCoolantTemperature)/10)
            if(engineCoolantTemperature > 220):
                rating = 9 - int((engineCoolantTemperature - 220)/2.5)
            ratingSum += rating
    overallRating = ratingSum/count
    print("engineCoolantTemperatureRating: %.2f" % overallRating)
    
