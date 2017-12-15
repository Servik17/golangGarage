import React from 'react';

export const RepairDetailSparePartsTable = ({ repairSpareParts }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Артикул</th>
        <th>Название</th>
        <th>Категория</th>
        <th>Кол-во</th>
        <th>Цена</th>
        <th>Ресурс</th>
      </tr>
    </thead>
    <tbody>
      {
        repairSpareParts.map(repairSparePart => (
          <tr key={repairSparePart.id}>
            <td>{repairSparePart.sparePart.vendorCode}</td>
            <td>{repairSparePart.sparePart.name}</td>
            <td>{repairSparePart.sparePart.category.name}</td>
            <td>{repairSparePart.amount} {repairSparePart.amountType === 1 ? 'шт.' : 'л.'}</td>
            <td>{repairSparePart.price}</td>
            <td>{repairSparePart.resource} {repairSparePart.resourceType === 1 ? 'тыс. км.' : 'мес.'}</td>
          </tr>
        ))
      }
    </tbody>
  </table>
);
