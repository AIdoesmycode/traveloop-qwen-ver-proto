import React from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [results, setResults] = React.useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Mock search results
    setResults([
      { id: 1, name: 'Paris', country: 'France', type: 'City' },
      { id: 2, name: 'Tokyo', country: 'Japan', type: 'City' },
      { id: 3, name: 'New York', country: 'USA', type: 'City' },
    ]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Explore Destinations</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-6">Search for cities and destinations to plan your next trip.</p>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a city..." 
              className="flex-1 border rounded-l px-4 py-3"
            />
            <button 
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-r hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>

        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map(result => (
              <div key={result.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl font-semibold mb-1">{result.name}</h3>
                <p className="text-gray-500 mb-2">{result.country}</p>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {result.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
