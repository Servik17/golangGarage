import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

// Layout
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import Footer from './Layout/Footer';

// Views
import Dashboard from './views/Dashboard/';
import Garage from './views/Garage/';
import CarDetail from './views/CarDetail/';
import Repairs from './views/Repairs/';
import RepairDetail from './views/RepairDetail/';
import RepairAdd from './views/RepairAdd/';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <div className="content-container">
                            <div className="container-fluid">
                                <Switch>
                                    <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                                    <Route exact path="/cars" name="Garage" component={Garage}/>
                                    <Route path="/cars/:id" name="CarDetail" component={CarDetail}/>
                                    <Route exact path="/repairs" name="Repairs" component={Repairs}/>
                                    <Route path="/repairs/:id" name="RepairDetail" component={RepairDetail}/>
                                    <Route path="/repair/add" name="RepairAdd" component={RepairAdd}/>
                                    <Redirect from="/" to="/dashboard"/>
                                </Switch>
                            </div>
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;
