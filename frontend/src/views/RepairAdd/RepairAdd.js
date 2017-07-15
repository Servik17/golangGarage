import React, {Component} from 'react';
import axios from 'axios';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

class RepairAdd extends Component {
    constructor() {
        super();
        this.state = {
            cars: [],
            spareParts: [],
            sparePartCategories: [],
            carSelectOpen: false,
            currentCar: undefined
        };

        this.toggleCarSelect = this.toggleCarSelect.bind(this);
        this.loadSpareParts = this.loadSpareParts.bind(this);
        this.setCurrentCar = this.setCurrentCar.bind(this);
    }

    componentDidMount() {
        axios.get('api/v0/cars').then(r => {
            if (r.data) {
                this.setState({
                    currentCar: r.data[0],
                    cars: r.data
                });
            }
        });
        axios.get('api/v0/spare-part-categories').then(r => {
            if (r.data) {
                this.setState({
                    sparePartCategories: r.data
                });
            }
        });
    }

    loadSpareParts(carId) {
        axios.get(`api/v0/spare-parts/${carId}`).then(r => {
            if (r.data) {
                this.setState({
                    spareParts: r.data
                });
            }
        });
    }

    toggleCarSelect() {
        this.setState({
            carSelectOpen: !this.state.carSelectOpen
        });
    }

    setCurrentCar(car) {
        this.setState({
            currentCar: car
        });
        this.loadSpareParts(car.id)
    }

    render() {
        const cars = this.state.cars.map(car => {
            return <DropdownItem key={car.id} onClick={() => {this.setCurrentCar(car)}}>{`${car.mark} ${car.model}`}</DropdownItem>
        });
        const currentCar = this.state.currentCar ? `${this.state.currentCar.mark} ${this.state.currentCar.model}` : 'Выбрать авто';
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-align-justify"/> Добавление ремонта
                            </div>
                            <div className="card-block">
                                <div className="form-group ">
                                    <label>Авто</label>
                                    <Dropdown isOpen={this.state.carSelectOpen} toggle={this.toggleCarSelect}>
                                        <DropdownToggle caret>
                                            {currentCar}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {cars}
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                <div className="form-group">
                                    <label>Дата</label>
                                    <input className="form-control col-6" type="date" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RepairAdd;
