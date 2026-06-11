import React from 'react';

const Itinerary = () => {
  const [days, setDays] = React.useState([
    { 
      day: 1, 
      date: '2024-03-15',
      activities: [
        { time: '09:00', title: 'Arrival at Airport', location: 'JFK Airport' },
        { time: '12:00', title: 'Hotel Check-in', location: 'Grand Hotel' },
        { time: '14:00', title: 'City Tour', location: 'Downtown' },
      ]
    },
    { 
      day: 2, 
      date: '2024-03-16',
      activities: [
        { time: '10:00', title: 'Museum Visit', location: 'Art Museum' },
        { time: '13:00', title: 'Lunch', location: 'Italian Restaurant' },
      ]
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Trip Itinerary</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-6">Plan your daily activities and keep track of your schedule.</p>
        
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6">
          Add Day
        </button>

        <div className="space-y-6">
          {days.map((dayData) => (
            <div key={dayData.day} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <h3 className="text-xl font-semibold">Day {dayData.day}</h3>
                <span className="text-gray-500">{dayData.date}</span>
              </div>
              
              <div className="space-y-3">
                {dayData.activities.map((activity, idx) => (
                  <div key={idx} className="flex items-start space-x-4 p-3 bg-gray-50 rounded">
                    <span className="font-mono text-blue-600 font-semibold">{activity.time}</span>
                    <div>
                      <h4 className="font-medium">{activity.title}</h4>
                      <p className="text-sm text-gray-500">{activity.location}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="mt-4 text-blue-500 hover:text-blue-700 text-sm">
                + Add Activity
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
