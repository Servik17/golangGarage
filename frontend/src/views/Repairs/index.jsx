import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getRepairs } from '../../store/repairs'
import { RepairsTableContainer } from '../../components/RepairsTable';

export class Repairs extends Component {
  componentDidMount() {
    this.props.getRepairs();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-xl-8">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify" /> Список ремонтов
                <Link to={'/repair/add'} className="pull-right">
                  <i className="fa fa-plus-square-o" /> добавить
                </Link>
              </div>
              <div className="card-block">
                <RepairsTableContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({getRepairs}, dispatch);

export const RepairsContainer = connect(null, mapDispatchToProps)(Repairs);
