import React from 'react';

import {Button, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup, Label, Modal} from 'reactstrap';

const CarDetailModalForm = ({change, close, car, submitted, isOpen}) => {
    return (
        <Modal isOpen={isOpen}>
            <Form>
                <ModalHeader>Авто</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Марка</Label>
                        <Input type="text" name="mark" onChange={change} value={car.mark}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Модель</Label>
                        <Input type="text" name="model" onChange={change} value={car.model}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Пробег</Label>
                        <Input type="number" name="mileage" onChange={change} value={car.mileage}/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={submitted}>Сохранить</Button>{' '}
                    <Button type="button" color="secondary" onClick={close}>Отмена</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default CarDetailModalForm;