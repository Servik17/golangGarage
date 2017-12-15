import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import axios from 'axios';

export class CarSelector extends Component {
  constructor() {
    super();
    this.state = {
      cars: [],
      carSelectOpen: false
    };

    this.toggleCarSelect = this.toggleCarSelect.bind(this);
    this.getCarInfo = this.getCarInfo.bind(this);
  }

  componentDidMount() {
    axios.get('api/v0/cars').then(r => {
      if (r.data) {
        this.setState({
          cars: r.data
        });
        this.props.select(r.data[0]);
      }
    });
  }

  toggleCarSelect() {
    this.setState({
      carSelectOpen: !this.state.carSelectOpen
    });
  }

  selectCar(car) {
    this.toggleCarSelect();
    this.props.select(car);
  }

  getCarInfo(car) {
    if (!car) {
      return '';
    }
    return `${car.mark} ${car.model}`
  }

  render() {
    const cars = this.state.cars.map(car => {
      return <DropdownItem key={car.id} onClick={() => { this.selectCar(car) }}>{this.getCarInfo(car)}</DropdownItem>
    });

    return (
      <Dropdown isOpen={this.state.carSelectOpen} toggle={this.toggleCarSelect}>
        <DropdownToggle caret>
          {this.getCarInfo(this.props.currentCar)}
        </DropdownToggle>
        <DropdownMenu>
          {cars}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
