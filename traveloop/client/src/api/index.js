import api from './axios';

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
};

export const tripAPI = {
  getAll: (params) => api.get('/trips', { params }),
  getById: (id) => api.get(`/trips/${id}`),
  create: (data) => api.post('/trips', data),
  update: (id, data) => api.put(`/trips/${id}`, data),
  delete: (id) => api.delete(`/trips/${id}`),
  getShared: (shareId) => api.get(`/trips/shared/${shareId}`),
};

export const userAPI = {
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  search: (query) => api.get('/users/search', { params: { query } }),
};

export const stopAPI = {
  getByTrip: (tripId) => api.get(`/stops/trip/${tripId}`),
  create: (tripId, data) => api.post(`/stops/trip/${tripId}`, data),
  update: (id, data) => api.put(`/stops/${id}`, data),
  delete: (id) => api.delete(`/stops/${id}`),
  reorder: (tripId, data) => api.put(`/stops/trip/${tripId}/reorder`, data),
};

export const activityAPI = {
  getByStop: (stopId) => api.get(`/activities/stop/${stopId}`),
  create: (stopId, data) => api.post(`/activities/stop/${stopId}`, data),
  update: (id, data) => api.put(`/activities/${id}`, data),
  delete: (id) => api.delete(`/activities/${id}`),
  toggleComplete: (id) => api.patch(`/activities/${id}/toggle`),
};

export const cityAPI = {
  search: (query) => api.get('/cities/search', { params: { query } }),
  getSuggestions: (query) => api.get('/cities/suggestions', { params: { query } }),
};

export const budgetAPI = {
  getByTrip: (tripId) => api.get(`/budget/trip/${tripId}`),
  create: (tripId, data) => api.post(`/budget/trip/${tripId}`, data),
  update: (id, data) => api.put(`/budget/${id}`, data),
  delete: (id) => api.delete(`/budget/${id}`),
  getSummary: (tripId) => api.get(`/budget/trip/${tripId}/summary`),
};

export const packingAPI = {
  getByTrip: (tripId) => api.get(`/packing/trip/${tripId}`),
  create: (tripId, data) => api.post(`/packing/trip/${tripId}`, data),
  update: (id, data) => api.put(`/packing/${id}`, data),
  delete: (id) => api.delete(`/packing/${id}`),
  togglePacked: (id) => api.patch(`/packing/${id}/toggle`),
};

export const notesAPI = {
  getByTrip: (tripId) => api.get(`/notes/trip/${tripId}`),
  create: (tripId, data) => api.post(`/notes/trip/${tripId}`, data),
  update: (id, data) => api.put(`/notes/${id}`, data),
  delete: (id) => api.delete(`/notes/${id}`),
};

export const shareAPI = {
  create: (tripId, data) => api.post(`/share/trip/${tripId}`, data),
  update: (id, data) => api.put(`/share/${id}`, data),
  delete: (id) => api.delete(`/share/${id}`),
  accept: (token) => api.post('/share/accept', { token }),
};

export const adminAPI = {
  getUsers: (params) => api.get('/admin/users', { params }),
  getUser: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getStats: () => api.get('/admin/stats'),
};
