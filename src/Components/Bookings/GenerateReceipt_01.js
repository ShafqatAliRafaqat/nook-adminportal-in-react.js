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

class GenerateReceipt_01 extends Component {

  state = {
    ...this.props.tag,
    isOpen: false,
    due_date: new Date(),
    extras: [],
    extra: {
      name: '',
      value: 0
    }
  };

  generateReceipt = () => {

    let { user, generateReceipt, dispatch, alertify } = this.props;
    const user_booking = this.props.booking.user;
    const extras = {};

    this.state.extras.map((ex) => {
      extras[ex.name] = ex.value
    });

    const body = {
      "user_id": user_booking.id,
      "nook_id": this.props.booking.nook.id,
      "due_date": new Date(this.state.due_date).getTime() / 1000,
      "status": this.state.status || "0",
      "e_units": this.state.e_units || "0",
      "e_unit_cost": this.state.e_unit_cost || "0",
      "fine": this.state.fine || "0",
      "late_day_fine": this.state.late_day_fine || "0",
      "extras": extras
    };

    generateReceipt(user.accessToken, body).then(res => {

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
  addExtra = () => {
    console.log(this.state.extra);
    let joined = this.state.extras.concat(this.state.extra);
    this.setState({
      extras: joined
    });
    this.setState({
      extra: { name: '', value: 0 }
    });
  };

  render() {

    let { user } = this.props.booking;
    const { status } = this.state;
    const ExtrasField = () => (
      <div className="w-100 d-flex flex-row">
        <FormGroup className="w-40 mr-4">
          <Label htmlFor="name">Name</Label>
          <Input type="text" name="name" placeholder="Name" value={this.state.extra.name} onChange={e => {
            this.setState({
              extra: {
                ...this.state.extra,
                name: e.target.value
              }
            })
          }} />
        </FormGroup>
        <FormGroup className="w-40 mr-4">
          <Label htmlFor="value">Value</Label>
          <Input type="number" name="value" placeholder="Value" value={this.state.extra.value} onChange={e => {
            this.setState({
              extra: {
                ...this.state.extra,
                value: e.target.value
              }
            })
          }} />
        </FormGroup>
        <Button color="primary" className="h-25 align-self-center mt-3" onClick={this.addExtra}>Add</Button>
      </div>
    );

    const Extra_row = (extra) => <div className="w-100 d-flex flex-row">
      <FormGroup className="w-40 mr-4">
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" readOnly placeholder="Name" value={extra.name} />
      </FormGroup>
      <FormGroup className="w-40 mr-4">
        <Label htmlFor="value">Value</Label>
        <Input type="number" name="value" readOnly placeholder="Value" value={extra.value} />
      </FormGroup>
    </div>;

    return (
      <React.Fragment>
        <Button color="success" onClick={this.toggle} className="mr-1">
          <i className="fa fa-print" /> Generate
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-success">
          <ModalHeader toggle={this.toggle}><i className="fa fa-print" /> Generate Receipt</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="name">User ID</Label>
              <Input type="text" name="name" readOnly placeholder="Tag Name" value={user ? user.id : 0} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="order">Status</Label>
              <Input
                type="select"
                placeholder="Status"
                name="status"
                onChange={this.onChange}
                value={status}
              >
                <option value="">Select Status</option>
                <option value="draft">Draft</option>
                {/* <option value="unpaid">Unpaid</option> */}
                <option value="in_progress">In Progress</option>
                <option value="paid">Paid</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="fine">Fine</Label>
              <Input type="number" name="fine" placeholder="Fine" value={this.state.fine} onChange={this.onChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="due_date">Due date</Label>
              <Input type="datetime-local" name="due_date" placeholder="Due Date" value={this.state.due_date}
                onChange={this.onChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="late_day_fine">Late Day Fine</Label>
              <Input type="number" name="late_day_fine" placeholder="Late Day Fine" value={this.state.late_day_fine}
                onChange={this.onChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="e_units">Electricity units</Label>
              <Input type="number" name="e_units" placeholder="Electricity units" value={this.state.e_units}
                onChange={this.onChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="e_unit_cost">Electricity unit Cost</Label>
              <Input type="number" name="e_unit_cost" placeholder="Electricity unit Cost" value={this.state.e_unit_cost}
                onChange={this.onChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="e_unit_cost">Add Extras</Label>
              {this.state.extras.map((extra) =>
                Extra_row(extra)
              )}
            </FormGroup>
            {ExtrasField()}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.generateReceipt}>Generate</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }


}

const mapDispatchToProps = () => {
  return {
    generateReceipt: (token, data) => actions.generateReceipt(token, data),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(GenerateReceipt_01);
