import json
from matplotlib import pyplot as plt
from datetime import datetime
import datetime as dt
f1 = open('./speeding_file_acc', 'w+')
accelerator_pedal_position=[]
vehicle_speed=[]
brake_pedal_status=[]
time1=[]
time2=[]
time3=[]

with open('aggressive.json') as json_file:
    line = json_file.readline()
    while line:
        data = json.loads(line)
        if (data['name'] == 'vehicle_speed'):
                vehicle_speed.append((data)['value'])
                time1.append((data)['timestamp'])
                #[datetime.fromtimestamp(x).strftime("%x %X") for x in time1]
                #print(vehicle_speed)
        if (data['name'] == 'accelerator_pedal_position'):
                accelerator_pedal_position.append((data)['value'])
                time2.append((data)['timestamp'])
                #[datetime.fromtimestamp(x).strftime("%x %X") for x in time2]
                #print (accelerator_pedal_position)
        if (data['name'] == 'brake_pedal_status'):
                brake_pedal_status.append((data)['value'])
                time3.append((data)['timestamp'])
                [datetime.fromtimestamp(x).strftime("%x %X") for x in time3]
                #print (brake_pedal_status)

        line = json_file.readline()
f1.close()


#To plot the three analysis parameters
plt.plot(time1,vehicle_speed, label='Vehicle_Speed')
plt.plot(time2,accelerator_pedal_position, label='Accelerator_Pedal_Postion')
plt.plot(time3,brake_pedal_status, label='Brake_Status')

plt.xlabel('Time')
plt.ylabel('Speed')
plt.title('Data Analysis')


plt.grid(True)
plt.legend()
plt.show()

