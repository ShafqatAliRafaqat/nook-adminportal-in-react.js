import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/BookingActions";

import {
  FormGroup,
  Input,
  Label,
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal
} from 'reactstrap';

class EditBooking extends Component {

  state = {
    ...this.props.booking,
    installments: '1',
    refunedSecurity: '',
    isOpen: false
  };

  editTag = () => {

    let { user, editBooking, dispatch, alertify } = this.props;
    const { id, status, status_key,installments, refunedSecurity } = this.state;
    let data = {
      "status":status_key, installments, refunedSecurity
    };

    editBooking(user.accessToken, id, data).then(res => {
      const { booking, message } = res.data;
      dispatch({
        type: actions.UPDATE_BOOKING,
        payload: booking
      });
      alertify.success(message);
    }).catch(({ response }) => {
      alertify.alert('Error ' + response.status + ' - ' + response.statusText, response.data.message);
    });

    this.setState({
      isOpen: false
    });

  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {

    const { status,status_key, installments, isOpen, security, paidSecurity, refunedSecurity } = this.state;
    let collectedSecuirty = Math.round(security / installments);

    return (
      <React.Fragment>
        <Button color="primary" onClick={this.toggle} className="mr-1">
          <i className="fa fa-pencil" /> Update
        </Button>
        <Modal isOpen={isOpen} toggle={this.toggle} className="modal-primary">
          <ModalHeader toggle={this.toggle}><i className="fa fa-pencil" /> Update</ModalHeader>
          <ModalBody>


            <FormGroup>
              <Label htmlFor="order">Status</Label>
              <Input
                type="select"
                placeholder="Status"
                name="status_key"
                onChange={this.onChange}
                value={status_key}
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="off-board">Moved</option>
                <option value="cancelled">Cancelled</option>
              </Input>

            </FormGroup>

            <FormGroup>
              <Label htmlFor="security">Security</Label>
              <Input type="number" name="security" value={security} readOnly />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="paidSecurity">Paid Security</Label>
              <Input type="number" name="paidSecurity" value={paidSecurity} readOnly />
            </FormGroup>

            {
              (status === 'off-board') && (
                <FormGroup>
                  <Label htmlFor="refunedSecurity">Refuned Security</Label>
                  <Input type="number" name="refunedSecurity" value={refunedSecurity} onChange={this.onChange} />
                </FormGroup>
              )
            }

            {
              status === 'approved' && (
                <React.Fragment>
                  <FormGroup>
                    <Input
                      type="select"
                      placeholder="Security Installments"
                      name="installments"
                      onChange={this.onChange}
                      value={installments}
                    >
                      <option value="1">1 Installment</option>
                      <option value="2">2 Installments</option>
                      <option value="3">3 Installments</option>
                      <option value="4">4 Installments</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="collectedSecuirty">Collected Security</Label>
                    <Input type="number" name="collectedSecuirty" value={collectedSecuirty} readOnly />
                  </FormGroup>
                </React.Fragment>
              )
            }

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.editTag}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = () => {
  return {
    editBooking: (token, id, data) => actions.editBooking(token, id, data),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditBooking);
