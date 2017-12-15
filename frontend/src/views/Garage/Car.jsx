import React from 'react';
import { Link } from 'react-router-dom';

export const Car = ({ car }) => (
  <div className="col-sm-6">
    <div className="card">
      <div className="card-header">
        <h5 className="d-inline">{car.mark}</h5>
        <div className="pull-right">
          <Link to={`/cars/${car.id}`}><i className="fa fa-edit" /> подробнее</Link>
        </div>
      </div>
      <div className="card-block">
        <div>{car.model}</div>
        <div>{car.mileage}</div>
      </div>
    </div>
  </div>
);
