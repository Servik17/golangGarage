import React from 'react';
import { Link } from 'react-router-dom'

export const RepairsTable = ({ repairs }) => (
  <table className="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Дата</th>
        <th>Авто</th>
        <th>Кол-во запчастей</th>
        <th>Общая стоимость</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {
        repairs.map(repair => (
          <tr key={repair.id}>
            <td>{repair.id}</td>
            <td>{repair.date}</td>
            <td>{`${repair.car.mark} ${repair.car.model}`}</td>
            <td>{repair.repairSpareParts.length}</td>
            <td>{repair.repairSpareParts.reduce((a, b) => a.price + b.price)}</td>
            <td><Link to={`/repairs/${repair.id}`}><i className="fa fa-edit" /> подробнее</Link></td>
          </tr>
        ))
      }
    </tbody>
  </table>
);