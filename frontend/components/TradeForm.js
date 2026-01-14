'use client';

import { useState } from 'react';

export default function TradeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    tradeId: '',
    buyer: '',
    seller: '',
    quantity: '',
    price: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const { tradeId, buyer, seller, quantity, price } = formData;

    if (!tradeId || !buyer || !seller || !quantity || !price) {
      setError('All fields are required');
      return;
    }

    if (quantity <= 0 || price <= 0) {
      setError('Quantity and price must be positive numbers');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Record Trade
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded">
          {error}
        </div>
      )}

      <input
        name="tradeId"
        placeholder="Trade ID"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="buyer"
        placeholder="Buyer Address"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="seller"
        placeholder="Seller Address"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="quantity"
        type="number"
        placeholder="Quantity"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Submit Trade
      </button>
    </form>
  );
}
