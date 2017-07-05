import React from 'react';

const RepairDetailSparePartsTable = ({repairSpareParts}) => {
    const rows = repairSpareParts.map(repairSparePart => {
        return (
            <tr key={repairSparePart.id}>
                <td>{repairSparePart.sparePart.vendorCode}</td>
                <td>{repairSparePart.sparePart.name}</td>
                <td>{repairSparePart.sparePart.category.name}</td>
                <td>{repairSparePart.amount} {repairSparePart.amountType === 1 ? 'шт.' : 'л.'}</td>
                <td>{repairSparePart.sparePart.price}</td>
                <td>{repairSparePart.sparePart.resource} {repairSparePart.sparePart.resourceType === 1 ? 'тыс. км.' : 'мес.'}</td>
            </tr>
        );
    });
    return (
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
                {rows}
            </tbody>
        </table>
    );
};

export default RepairDetailSparePartsTable;