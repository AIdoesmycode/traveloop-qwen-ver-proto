import React from 'react';

const PublicTrip = () => {
  const trip = {
    id: 1,
    name: 'Summer Europe Adventure',
    owner: 'Jane Smith',
    destination: 'Paris, France',
    startDate: '2024-07-15',
    endDate: '2024-07-30',
    description: 'Exploring the beautiful cities of Europe including Paris, Rome, and Barcelona.',
    image: null,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shared Trip</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
          <span className="text-white text-6xl">🌍</span>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">{trip.name}</h2>
          <p className="text-gray-600 mb-4">by {trip.owner}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="font-medium">{trip.destination}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Dates</p>
              <p className="font-medium">{trip.startDate} - {trip.endDate}</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">{trip.description}</p>
          
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              View Itinerary
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50">
              Save to My Trips
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicTrip;
