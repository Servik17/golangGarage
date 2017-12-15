import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { Container } from 'reactstrap';

// Layout
import { Header } from './layout/Header';
import { Sidebar } from './layout/Sidebar';
import { Footer } from './layout/Footer';

// Views
import { Dashboard } from './views/Dashboard';
import { Garage } from './views/Garage';
import { CarDetail } from './views/CarDetail';
import { Repairs } from './views/Repairs';
import { RepairDetail } from './views/RepairDetail';
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
            <Route exact path="/cars" name="Garage" component={Garage} />
            <Route path="/cars/:id" name="CarDetail" component={CarDetail} />
            <Route exact path="/repairs" name="Repairs" component={Repairs} />
            <Route path="/repairs/:id" name="RepairDetail" component={RepairDetail} />
            <Route path="/repair/add" name="RepairAdd" component={RepairAdd} />
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Container>
      </main>
    </div>
    <Footer />
  </div>
);
