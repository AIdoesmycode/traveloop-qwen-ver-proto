import React from 'react';

const Profile = () => {
  const [user, setUser] = React.useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Travel enthusiast exploring the world one city at a time.',
    avatar: null,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-3xl text-gray-600 mr-6">
            👤
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">Change Avatar</button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              value={user.name}
              onChange={(e) => setUser({...user, name: e.target.value})}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea 
              value={user.bio}
              onChange={(e) => setUser({...user, bio: e.target.value})}
              rows="4"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="pt-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
