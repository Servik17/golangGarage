import React, { Component } from 'react';
import axios from 'axios';

import Car from './Car';

class Garage extends Component {
  constructor() {
    super();
    this.state = {
      cars: []
    };
  }

  componentDidMount() {
    axios.get('api/v0/cars').then(r => {
      if (r.data) {
        this.setState({
          cars: r.data
        });
      }
    });
  }

  render() {
    const cars = this.state.cars.map(car => <Car key={car.id} car={car} />);
    return (
      <div className="animated fadeIn">
        <div className="row">
          {cars}
        </div>
      </div>
    );
  }
}

export default Garage;
