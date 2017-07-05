import React, {Component} from 'react';
import axios from 'axios';

import RepairsTable from './RepairsTable';
import {Button} from 'reactstrap';
import AddRepairModalForm from './AddRepairModalForm';

class Repairs extends Component {
    constructor() {
        super();
        this.state = {
            repairs: [],
            addRepairForm: false
        };

        this.toggleAddRepairForm = this.toggleAddRepairForm.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('api/v0/repairs').then(r => {
            if (r.data) {
                this.setState({
                    repairs: r.data
                });
            }
        });
    }

    toggleAddRepairForm() {
        this.setState({
            addRepairForm: !this.state.addRepairForm
        });
    }

    closeModal() {
        this.toggleAddRepairForm();
    }

    handleSubmit() {
        this.toggleAddRepairForm();
    }

    render() {
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-align-justify"/> Список ремонтов
                                <Button size="sm" color="link" className="pull-right" onClick={this.toggleAddRepairForm}>
                                    <i className="fa fa-plus-square-o"/> добавить
                                </Button>
                                <AddRepairModalForm isOpen={this.state.addRepairForm}
                                                    close={this.closeModal}
                                                    submitted={this.handleSubmit}/>
                            </div>
                            <div className="card-block">
                                <RepairsTable repairs={this.state.repairs}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Repairs;
