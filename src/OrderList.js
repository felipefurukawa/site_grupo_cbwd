import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error('There was an error fetching the orders!', error));
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <Link to="/order">Create New Order</Link>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.name} - <Link to={`/order/${order.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;
