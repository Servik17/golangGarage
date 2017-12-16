import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CarDetailModalForm } from '../../components/CarDetailModal';
import { getCar, toggleModal, updateCar } from '../../store/carDetail';

export class CarDetail extends Component {
  componentDidMount() {
    this.props.getCar(this.props.match.params.id);
  }

  render() {
    const { car, modalIsOpen, fetchingUpdate, updateCar, toggleModal } = this.props;

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
                  onClick={() => toggleModal(true)}
                >
                  <i className="fa fa-edit" /> Изменить
                </Button>
                <CarDetailModalForm
                  car={car}
                  isOpen={modalIsOpen}
                  fetching={fetchingUpdate}
                  onClose={() => toggleModal(false)}
                  onSave={(car) => updateCar(car)}
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

const mapStateToProps = (store) => store.carDetail;

const mapDispatchToProps = (dispatch) => bindActionCreators({getCar, toggleModal, updateCar}, dispatch);

export const CarDetailContainer = connect(mapStateToProps, mapDispatchToProps)(CarDetail);
