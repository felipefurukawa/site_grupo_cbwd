import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProgressBar from './ProgressBar';

function OrderForm() {
  const { id } = useParams();
  const [order, setOrder] = useState({ name: '', products: [{ name: '', quantity: 1 }] });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (id) {
      axios.get(`/api/orders/${id}`)
        .then(response => setOrder(response.data))
        .catch(error => console.error('There was an error fetching the order!', error));
    }
  }, [id]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const products = [...order.products];
    products[index][name] = value;
    setOrder({ ...order, products });
    calculateProgress();
  };

  const calculateProgress = () => {
    let filledFields = 0;
    const totalFields = order.products.length * 2 + 1; // each product has 2 fields, and there's 1 field for the order name

    if (order.name) filledFields += 1;
    order.products.forEach(product => {
      if (product.name) filledFields += 1;
      if (product.quantity) filledFields += 1;
    });

    setProgress((filledFields / totalFields) * 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`/api/orders/${id}`, order)
        .then(response => console.log('Order updated successfully!'))
        .catch(error => console.error('There was an error updating the order!', error));
    } else {
      axios.post('/api/orders', order)
        .then(response => console.log('Order created successfully!'))
        .catch(error => console.error('There was an error creating the order!', error));
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Order' : 'Create Order'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={order.name}
          onChange={(e) => setOrder({ ...order, name: e.target.value })}
        />
        {order.products.map((product, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(e, index)}
            />
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={(e) => handleInputChange(e, index)}
            />
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
      <ProgressBar progress={progress} />
    </div>
  );
}

export default OrderForm;
