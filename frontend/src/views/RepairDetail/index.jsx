import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getRepair } from '../../store/repairDetail';

import { RepairDetailSparePartsTableContainer } from '../../components/RepairDetailSparePartsTable';

export class RepairDetail extends Component {
  componentDidMount() {
    this.props.getRepair(this.props.match.params.id);
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
                <RepairDetailSparePartsTableContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({getRepair}, dispatch)

export const RepairDetailContainer = connect(null, mapDispatchToProps)(RepairDetail);
