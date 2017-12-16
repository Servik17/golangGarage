import React, { Component } from 'react';
import { Button, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label, Modal } from 'reactstrap';

const emptyCar = {
  mark: '',
  model: '',
  mileage: 0,
}

export class CarDetailModalForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      car: props.car || emptyCar,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange (event) {
    const { car } = this.state;
    const field = event.target.name;
    const value = event.target.value;

    this.setState({
      car: {...car, [field]: value}
    });
  }

  render() {
    const { isOpen } = this.props;
    const { car } = this.state;

    return (
      <Modal isOpen={isOpen}>
        <Form>
          <ModalHeader>Авто</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="mark">Марка</Label>
              <Input
                type="text"
                name="mark"
                onChange={this.onChange}
                value={car.mark} 
              />
            </FormGroup>
            <FormGroup>
              <Label for="model">Модель</Label>
              <Input
                type="text"
                name="model"
                onChange={this.onChange}
                value={car.model} 
              />
            </FormGroup>
            <FormGroup>
              <Label for="mileage">Пробег</Label>
              <Input
                type="number"
                name="mileage"
                onChange={this.onChange}
                value={car.mileage}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.props.onSave(car)}
            >
              Сохранить
            </Button>{' '}
            <Button
              type="button"
              color="secondary"
              onClick={this.props.onClose}
            >
              Отмена
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
};
