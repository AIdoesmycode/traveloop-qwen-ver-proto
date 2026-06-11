import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Calendar, MapPin, Users } from 'lucide-react';
import { useTripStore } from '../../store';
import { TripCard, Button } from '../../components/common';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { trips, fetchTrips, deleteTrip } = useTripStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        await fetchTrips();
      } catch (error) {
        toast.error('Failed to load trips');
      } finally {
        setLoading(false);
      }
    };

    loadTrips();
  }, [fetchTrips]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await deleteTrip(id);
        toast.success('Trip deleted successfully');
      } catch (error) {
        toast.error('Failed to delete trip');
      }
    }
  };

  const upcomingTrips = trips.filter(
    (trip) => new Date(trip.startDate) > new Date()
  );
  const pastTrips = trips.filter(
    (trip) => new Date(trip.startDate) <= new Date()
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <Link to="/trips/create">
          <Button>
            <PlusCircle className="w-5 h-5 mr-2" />
            Create New Trip
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Upcoming Trips</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingTrips.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <MapPin className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Past Trips</p>
              <p className="text-2xl font-bold text-gray-900">{pastTrips.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Trips</p>
              <p className="text-2xl font-bold text-gray-900">{trips.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Trips */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Trips</h2>
        {upcomingTrips.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No upcoming trips planned</p>
            <Link to="/trips/create">
              <Button>Create Your First Trip</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      {/* Past Trips */}
      {pastTrips.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
