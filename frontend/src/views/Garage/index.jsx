import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'reactstrap';

import { getCars, toggleModal, createCar } from '../../store/cars';
import { Car } from '../../components/Car';
import { CarDetailModalForm } from '../../components/CarDetailModal';

class Garage extends Component {
  componentDidMount() {
    this.props.getCars();
  }

  render() {
    const { cars, modalIsOpen, fetchingCreate, toggleModal, createCar } = this.props;

    return (
      <div className="animated fadeIn">
        <div>
          <Button
            outline
            color="primary"
            onClick={() => toggleModal(true)}
          >
            <i className="fa fa-plus" /> Добавить
          </Button>
          <CarDetailModalForm
            isOpen={modalIsOpen}
            fetching={fetchingCreate}
            onClose={() => toggleModal(false)}
            onSave={(car) => createCar(car)}
          />
        </div>
        <div className="row">
          {
            cars && !!cars.length && cars.map(car => <Car key={car.id} car={car} />)
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => store.cars;

const mapDispatchToProps = (dispatch) => bindActionCreators({getCars, toggleModal, createCar}, dispatch)

export const GarageContainer = connect(mapStateToProps, mapDispatchToProps)(Garage);
