import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Plus } from 'lucide-react';

const TripCard = ({ trip, onDelete }) => {
  const startDate = new Date(trip.startDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const endDate = new Date(trip.endDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500">
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="w-16 h-16 text-white opacity-50" />
        </div>
        <div className="absolute top-2 right-2">
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {trip.status}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{trip.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{trip.destination}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {startDate} - {endDate}
          </span>
        </div>

        {trip.sharedWith && trip.sharedWith.length > 0 && (
          <div className="flex items-center text-gray-600 mb-3">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">{trip.sharedWith.length} travelers</span>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <Link
            to={`/trips/${trip.id}`}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-center text-sm font-medium"
          >
            View Details
          </Link>
          <Link
            to={`/trips/${trip.id}/edit`}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            Edit
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(trip.id)}
              className="bg-red-100 text-red-600 px-3 py-2 rounded-md hover:bg-red-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripCard;
