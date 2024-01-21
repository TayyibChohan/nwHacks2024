import numpy as np
from scipy.optimize import linear_sum_assignment
from datetime import datetime, timedelta
import math

rooms = [
    {"location": (1, 1), "name": "Room A", "capacity": 30},
    {"location": (2, 2), "name": "Room B", "capacity": 25},
    {"location": (5, 8), "name": "Room C", "capacity": 25},
    {"location": (24, 63), "name": "Room D", "capacity": 25},
    {"location": (34, 437), "name": "Room E", "capacity": 25},
    {"location": (69, 23), "name": "Room F", "capacity": 25},
]

classes = [
    {"start": "10:00 AM", "name": "Math", "students": 20, "location": (-999, -999)},
    {"start": "10:00 AM", "name": "History", "students": 30, "location": (-999, -999)},
    {"start": "2:00 PM", "name": "Science", "students": 20, "location": (-999, -999)},
    {"start": "3:00 PM", "name": "Chemistry", "students": 15, "location": (-999, -999)},
    {"start": "3:00 PM", "name": "Physics", "students": 15, "location": (-999, -999)},
    {"start": "4:00 PM", "name": "Biology", "students": 15, "location": (-999, -999)},
    {"start": "4:00 PM", "name": "English", "students": 15, "location": (-999, -999)},
    {"start": "4:00 PM", "name": "Spanish", "students": 15, "location": (-999, -999)},
    {"start": "4:00 PM", "name": "French", "students": 15, "location": (-999, -999)},
    {"start": "4:00 PM", "name": "German", "students": 15, "location": (-999, -999)},
    {"start": "4:00 PM", "name": "Italian", "students": 15, "location": (-999, -999)},
]

def checkIfValidAssigmentPossible(rooms, classes):
    '''
    Checks if there are enough rooms to hold all classes but a room can only have 1 class at a given time
    
    '''
    #sort classes by start time
    classes.sort(key=lambda x: datetime.strptime(x['start'], '%I:%M %p'))
    #iterate through each time slot and check if there are enough rooms at that time for all classes
    for i in range(len(classes)):
        #get all classes at a given time
        classes_at_time = [c for c in classes if c['start'] == classes[i]['start']]
        #check if there are enough rooms for all classes
        if len(classes_at_time) > len(rooms):
            return False
        
    return True
def calculate_distance(location1, location2):
    return math.sqrt((location1[0] - location2[0])**2 + (location1[1] - location2[1])**2)

def find_arangement(classes, rooms):
    if not checkIfValidAssigmentPossible(rooms, classes):
        print("Not enough rooms to hold all classes")
        return
    
    #sort classes by start time
    classes.sort(key=lambda x: datetime.strptime(x['start'], '%I:%M %p'))

    #iterate through each time slot and assign rooms to classes
    for i in range(len(classes)):
        #get all classes at a given time
        classes_at_time = [c for c in classes if c['start'] == classes[i]['start']]
        #create cost matrix
        cost_matrix = np.zeros((len(classes_at_time), len(rooms)))
        #fill cost matrix with costs
        for j in range(len(classes_at_time)):
            for k in range(len(rooms)):
                #cost is the distance between the current room and the room of the previous class
                if j > 0:
                    previous_room = classes_at_time[j-1]['location']
                    current_room = rooms[k]['location']
                    cost_matrix[j][k] = calculate_distance(previous_room, current_room)
        #find optimal assignment
        row_ind, col_ind = linear_sum_assignment(cost_matrix)
        #assign rooms to classes and update room capacities
        for j in range(len(classes_at_time)):
            classes_at_time[j]['location'] = rooms[col_ind[j]]['location']
            rooms[col_ind[j]]['capacity'] -= classes_at_time[j]['students']

    #print results
    print("Classes:")
    print(classes)

    return classes

def main ():
    find_arangement(classes, rooms)

if __name__ == "__main__":
    main()