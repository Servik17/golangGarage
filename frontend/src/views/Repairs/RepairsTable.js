import React from 'react';
import { Link } from 'react-router-dom'

const RepairsTable = ({repairs}) => {
    const rows = repairs.map(repair => {
       return (
           <tr key={repair.id}>
               <td>{repair.id}</td>
               <td>{repair.date}</td>
               <td>{`${repair.car.mark} ${repair.car.model}`}</td>
               <td>{repair.repairSpareParts.length}</td>
               <td>{repair.repairSpareParts.reduce((a, b) => a.price + b.price)}</td>
               <td><Link to={`/repairs/${repair.id}`}><i className="fa fa-edit"/> подробнее</Link></td>
           </tr>
       );
    });
    return (
        <table className="table">
            <thead>
            <tr>
                <th>#</th>
                <th>Дата</th>
                <th>Авто</th>
                <th>Кол-во запчастей</th>
                <th>Общая стоимость</th>
                <th/>
            </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
};

export default RepairsTable;