import React, { Component } from 'react';
import axios from 'axios';

import { RepairsTable } from './RepairsTable';
import { Link, } from 'react-router-dom';

export class Repairs extends Component {
  constructor() {
    super();

    this.state = {
      repairs: []
    };
  }

  async componentDidMount() {
    const { data } = await axios.get('api/v0/repairs')
      // .then(({ data }) => this.setState({ repairs: data }));
    this.setState({ repairs: data })
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
                <RepairsTable repairs={this.state.repairs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
