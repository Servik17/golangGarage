import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

import { CarDetailModalForm } from './CarDetailModalForm';

export class CarDetail extends Component {
  constructor() {
    super();
    this.state = {
      car: {},
      modal: false,
      updateCar: {}
    };

    this.toggle = this.toggle.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCarInfo = this.updateCarInfo.bind(this);
  }

  componentDidMount() {
    axios.get(`api/v0/cars/${this.props.match.params.id}`)
      .then(r => {
        if (r.data) {
          this.setState({
            car: r.data,
            updateCar: r.data
          });
        }
      });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit() {
    this.toggle();

    axios.post(`/api/v0/cars/${this.state.car.id}/update`, this.state.updateCar)
      .then(() => {
        this.setState({
          car: Object.assign({}, this.state.car, this.state.updateCar)
        });
      });
  }

  updateCarInfo(e) {
    e.preventDefault();
    const field = e.target.name;
    const updateCar = {};

    updateCar[field] = e.target.value;

    this.setState({
      updateCar: Object.assign({}, this.state.updateCar, updateCar)
    });
  }

  closeModal() {
    this.toggle();
    this.setState({
      updateCar: this.state.car
    });
  }

  render() {
    const car = this.state.car;

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                {car.mark} {car.model}
                <Button
                  size="sm"
                  color="link"
                  className="pull-right"
                  onClick={this.toggle}
                >
                  <i className="fa fa-edit" /> Изменить
                </Button>
                <CarDetailModalForm
                  car={this.state.updateCar}
                  close={this.closeModal}
                  isOpen={this.state.modal}
                  change={this.updateCarInfo}
                  submitted={this.handleSubmit}
                />
              </div>
              <div className="card-block">
                {car.mileage}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
