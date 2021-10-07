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

class AddSecurity extends Component {

  state = {
    ...this.props.booking,
    oldSecuirty: this.props.booking.security,
    security: "",
    isOpen: false,
  };

  addSecurity = () => {

    let { user, booking, addSecurity, dispatch, alertify } = this.props;

    const body = {
      "security": this.state.security,
    };

    addSecurity(user.accessToken, booking.id, body).then(res => {
      alertify.success(res.data.message);

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

    let { id, paidSecurity, security, oldSecuirty } = this.state;

    return (
      <React.Fragment>
        <Button color="warning" onClick={this.toggle} className="mr-1">
          <i className="fa fa-plus" /> Collect
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-warning">
          <ModalHeader toggle={this.toggle}><i className="fa fa-plus" /> Collect</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="name">Booking ID</Label>
              <Input type="text" name="name" readOnly value={id} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="oldSecuirty">Total Security</Label>
              <Input type="number" name="oldSecuirty" value={oldSecuirty} readOnly />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="paidSecurity">Paid Security</Label>
              <Input type="number" name="paidSecurity" value={paidSecurity} readOnly />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="security">Collect Security</Label>
              <Input type="number" name="security" placeholder="Security" value={security} onChange={this.onChange} />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addSecurity}>Add</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }


}

const mapDispatchToProps = () => {
  return {
    addSecurity: (token, id, data) => actions.addSecurity(token, id, data),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddSecurity);
