import { create } from 'zustand';
import { tripAPI } from '../api';

const useTripStore = create((set, get) => ({
  trips: [],
  currentTrip: null,
  loading: false,
  error: null,

  fetchTrips: async (params) => {
    set({ loading: true });
    try {
      const response = await tripAPI.getAll(params);
      set({ trips: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  fetchTripById: async (id) => {
    set({ loading: true });
    try {
      const response = await tripAPI.getById(id);
      set({ currentTrip: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  createTrip: async (data) => {
    set({ loading: true });
    try {
      const response = await tripAPI.create(data);
      set((state) => ({
        trips: [...state.trips, response.data],
        currentTrip: response.data,
        loading: false,
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateTrip: async (id, data) => {
    set({ loading: true });
    try {
      const response = await tripAPI.update(id, data);
      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === id ? response.data : trip
        ),
        currentTrip:
          state.currentTrip?.id === id ? response.data : state.currentTrip,
        loading: false,
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteTrip: async (id) => {
    set({ loading: true });
    try {
      await tripAPI.delete(id);
      set((state) => ({
        trips: state.trips.filter((trip) => trip.id !== id),
        currentTrip: state.currentTrip?.id === id ? null : state.currentTrip,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  setCurrentTrip: (trip) => set({ currentTrip: trip }),
  clearError: () => set({ error: null }),
}));

export default useTripStore;
