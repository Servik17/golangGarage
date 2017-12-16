import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { Container } from 'reactstrap';

// Layout
import { Header } from './layout/Header';
import { Sidebar } from './layout/Sidebar';
import { Footer } from './layout/Footer';

// Views
import { Dashboard } from './views/Dashboard';
import { GarageContainer } from './views/Garage';
import { CarDetailContainer } from './views/CarDetail';
import { RepairsContainer } from './views/Repairs';
import { RepairDetailContainer } from './views/RepairDetail';
import { RepairAdd } from './views/RepairAdd';

export const App = (props) => (
  <div className="app">
    <Header />
    <div className="app-body">
      <Sidebar {...props} />
      <main className="main">
        <Container fluid>
          <Switch>
            <Route path="/dashboard" name="Dashboard" component={Dashboard} />
            <Route exact path="/cars" name="Garage" component={GarageContainer} />
            <Route path="/cars/:id" name="CarDetail" component={CarDetailContainer} />
            <Route exact path="/repairs" name="Repairs" component={RepairsContainer} />
            <Route path="/repairs/:id" name="RepairDetail" component={RepairDetailContainer} />
            <Route path="/repair/add" name="RepairAdd" component={RepairAdd} />
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Container>
      </main>
    </div>
    <Footer />
  </div>
);
