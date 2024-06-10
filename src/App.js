import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import OrderList from './OrderList';
import OrderForm from './OrderForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={OrderList} />
        <Route path="/order/:id?" component={OrderForm} />
      </Switch>
    </Router>
  );
}

export default App;
