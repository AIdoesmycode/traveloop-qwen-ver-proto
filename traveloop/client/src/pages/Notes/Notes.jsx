import React from 'react';

const Notes = () => {
  const [notes, setNotes] = React.useState([
    { id: 1, title: 'Restaurant reservations', content: 'Call Italian place for Friday dinner', date: '2024-01-15' },
    { id: 2, title: 'Flight info', content: 'Flight DL123 departs at 3pm from Terminal 4', date: '2024-01-14' },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Trip Notes</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">Jot down important information and reminders for your trip.</p>
        
        <div className="mb-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Note
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map(note => (
            <div key={note.id} className="border rounded-lg p-4 bg-yellow-50">
              <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
              <p className="text-gray-700 mb-2">{note.content}</p>
              <p className="text-sm text-gray-500">{note.date}</p>
              <div className="mt-3 flex justify-end space-x-2">
                <button className="text-blue-500 hover:text-blue-700 text-sm">Edit</button>
                <button className="text-red-500 hover:text-red-700 text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
