import React from 'react';

import {Button, ModalHeader, ModalBody, ModalFooter, Form, Modal} from 'reactstrap';

const CarDetailModalForm = ({close, submitted, isOpen}) => {
    return (
        <Modal size="lg" isOpen={isOpen}>
            <Form>
                <ModalHeader>Ремонт</ModalHeader>
                <ModalBody>
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