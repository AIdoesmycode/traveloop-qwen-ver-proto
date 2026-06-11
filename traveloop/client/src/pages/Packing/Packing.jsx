import React from 'react';

const Packing = () => {
  const [items, setItems] = React.useState([
    { id: 1, name: 'Passport', packed: false },
    { id: 2, name: 'Clothes', packed: true },
    { id: 3, name: 'Toiletries', packed: false },
  ]);

  const togglePacked = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, packed: !item.packed } : item
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Packing List</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">Keep track of what you need to pack for your trip.</p>
        
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Add new item..." 
            className="border rounded px-4 py-2 mr-2 w-full md:w-auto"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Item
          </button>
        </div>

        <ul className="space-y-2">
          {items.map(item => (
            <li key={item.id} className="flex items-center justify-between border rounded p-3">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={item.packed} 
                  onChange={() => togglePacked(item.id)}
                  className="mr-3 h-5 w-5"
                />
                <span className={item.packed ? 'line-through text-gray-400' : 'text-gray-800'}>
                  {item.name}
                </span>
              </div>
              <button className="text-red-500 hover:text-red-700">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Packing;
