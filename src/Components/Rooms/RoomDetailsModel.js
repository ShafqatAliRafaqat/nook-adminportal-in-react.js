import React, { Component } from "react";

import {
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal,
  Table,
} from "reactstrap";

class RoomDetailsModel extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isOpen } = this.state;
    if(!this.props.room){
      return true;
    }
    const {room:{id,capacity,noOfBeds,price_per_bed, room_number, users, created_at, updated_at }} = this.props;
      return (
      <React.Fragment>
        <Button color="link" className="text-primary" onClick={this.toggle}>
          {room_number}
        </Button>
        <Modal isOpen={isOpen} toggle={this.toggle} className="modal-primary">
          <ModalHeader toggle={this.toggle}>
            <i className="fa fa-eye" /> Room Details
          </ModalHeader>
          <ModalBody>
            <Table>
              <tbody>
                <tr>
                  <th scope="row">ID</th>
                  <td>{id}</td>
                </tr>
                <tr>
                  <th scope="row">Room Number</th>
                  <td>{room_number}</td>
                </tr>
                <tr>
                  <th scope="row">Capacity</th>
                  <td>{capacity} Person(s) Sharing</td>
                </tr>
                <tr>
                  <th scope="row">No of Beds</th>
                  <td>{noOfBeds}</td>
                </tr>
                <tr>
                  <th scope="row">Price Per Bed</th>
                  <td>{price_per_bed} PKR</td>
                </tr>
                <tr>
                  <th scope="row">Created At</th>
                  <td>{created_at}</td>
                </tr>
                <tr>
                  <th scope="row">Updated At</th>
                  <td>{updated_at}</td>
                </tr>
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default RoomDetailsModel;
