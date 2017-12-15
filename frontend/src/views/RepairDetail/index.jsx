import React, { Component } from 'react';
import axios from 'axios';

import { RepairDetailSparePartsTable } from './RepairDetailSparePartsTable';

export class RepairDetail extends Component {
  constructor() {
    super();
    this.state = {
      repair: {
        repairSpareParts: []
      }
    };
  }

  componentDidMount() {
    axios.get(`api/v0/repairs/${this.props.match.params.repairId}`)
      .then(r => {
        if (r.data) {
          this.setState({
            repair: r.data[0]
          });
        }
      });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-xl-4">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify" /> Ремонт
              </div>
              <div className="card-block">

              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify" /> Запчасти
              </div>
              <div className="card-block">
                <RepairDetailSparePartsTable repairSpareParts={this.state.repair.repairSpareParts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
