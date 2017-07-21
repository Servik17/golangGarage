import React, {Component} from 'react';
import CarSelector from "./CarSelector";
import SparePartSelector from "./SparePartSelector";
import {Popover, PopoverContent, PopoverTitle} from "reactstrap";
import { Link } from 'react-router-dom';

class RepairAdd extends Component {
    constructor() {
        super();
        this.state = {
            addedSpareParts: [],
            repairDate: '',
            currentCar: undefined
        };

        this.setCurrentCar = this.setCurrentCar.bind(this);
        this.addSparePart = this.addSparePart.bind(this);
        this.setRepairDate = this.setRepairDate.bind(this);
        this.removeAddedSparePart = this.removeAddedSparePart.bind(this);
        this.spMouseOver = this.spMouseOver.bind(this);
        this.spMouseLeave = this.spMouseLeave.bind(this);
    }

    setCurrentCar(car) {
        this.setState({
            currentCar: car
        });
    }

    addSparePart(sp) {
        this.setState({
            addedSpareParts: [...this.state.addedSpareParts, sp]
        });
    }

    setRepairDate(e) {
        e.preventDefault();

        this.setState({
            repairDate: e.target.value
        });
    }
    removeAddedSparePart(sp) {
        this.setState({
            addedSpareParts: this.state.addedSpareParts.filter(s => s.id !== sp.id)
        });
    }

    spMouseOver(spId) {
        let data = {};
        data[`popover_${spId}`] = true;

        this.setState(data);
    }
    spMouseLeave(spId) {
        let data = {};
        data[`popover_${spId}`] = false;

        this.setState(data);
    }

    render() {
        const spareParts = this.state.addedSpareParts.map(sp => {
            return (
                <li key={sp.id} className="pt-2 pb-2">
                    <a className="mr-2" onClick={() => this.removeAddedSparePart(sp)}><i className="fa fa-close text-danger" /></a>
                    <span className="font-weight-bold">{sp.vendorCode}</span>{' '}
                    <span id={`spare-part_${sp.id}`}
                          onMouseOver={() => this.spMouseOver(sp.id)}
                          onMouseLeave={() => this.spMouseLeave(sp.id)}>
                        {sp.name}
                    </span>

                    <Popover placement="top" isOpen={this.state[`popover_${sp.id}`]} target={`spare-part_${sp.id}`}>
                        <PopoverTitle>Описание</PopoverTitle>
                        <PopoverContent>{sp.description || 'Нет описания'}</PopoverContent>
                    </Popover>
                </li>
            );
        });

        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-align-justify"/> Добавление ремонта
                            </div>
                            <div className="card-block">
                                <div className="form-horizontal">
                                    <div className="form-group row">
                                        <label className="col-3">Авто</label>
                                        <div className="col-9">
                                            <CarSelector currentCar={this.state.currentCar} select={this.setCurrentCar} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-3">Дата</label>
                                        <div className="col-9">
                                            <input className="form-control" type="date" onChange={this.setRepairDate} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-3">Запчасти</label>
                                        <div className="col-9">
                                            <SparePartSelector select={this.addSparePart} currentCar={this.state.currentCar} />
                                            <ul className="mt-2">
                                                {spareParts}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-sm btn-primary">Сохранить</button>
                                <Link to={'/repairs'} className="btn btn-sm btn-danger">Отмена</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RepairAdd;
