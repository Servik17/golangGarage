import React, {Component} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import axios from 'axios';

class SparePartSelector extends Component {
    constructor() {
        super();
        this.state = {
            spareParts: [],
            sparePartCategories: [],
            sparePartSelectOpen: false
        };

        this.toggleSparePartSelect = this.toggleSparePartSelect.bind(this);
        this.getSparePartInfo = this.getSparePartInfo.bind(this);

    }

    componentDidMount() {
        axios.get('api/v0/spare-part-categories').then(r => {
            if (r.data) {
                this.setState({
                    sparePartCategories: r.data
                });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentCar) {
            this.loadSpareParts(nextProps.currentCar.id)
        }
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

    toggleSparePartSelect() {
        this.setState({
            sparePartSelectOpen: !this.state.sparePartSelectOpen
        });
    }

    getSparePartInfo(sp) {
        return `${sp.vendorCode} ${sp.name}`
    }

    render() {
        const spareParts = this.state.spareParts.map(sp => {
            return (
                <DropdownItem key={sp.id} onClick={() => {this.props.select(sp)}}>
                    {this.getSparePartInfo(sp)}
                </DropdownItem>
            );
        });

        return (
            <Dropdown isOpen={this.state.sparePartSelectOpen} toggle={this.toggleSparePartSelect}>
                <DropdownToggle caret>Добавить запчасть</DropdownToggle>
                <DropdownMenu>
                    {spareParts}
                </DropdownMenu>
            </Dropdown>
        );
    }
}

export default SparePartSelector;
