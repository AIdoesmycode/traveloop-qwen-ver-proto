import React from 'react';
import { Link } from 'react-router-dom';

const Budget = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Budget Tracker</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">Track your trip expenses and stay within budget.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Total Budget</h3>
            <p className="text-2xl text-blue-600">$0.00</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Spent</h3>
            <p className="text-2xl text-red-600">$0.00</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Remaining</h3>
            <p className="text-2xl text-green-600">$0.00</p>
          </div>
        </div>
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default Budget;
