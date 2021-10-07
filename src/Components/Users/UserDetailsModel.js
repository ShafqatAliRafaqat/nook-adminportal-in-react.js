import React, { Component } from "react";

import {
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal,
  Table,
} from "reactstrap";

class UserDetailsModel extends Component {
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
    const {user:{id,name,number,gender, city, address, occupation, aggreedToTerms, profile,is_active }} = this.props;

    return (
      <React.Fragment>
        <Button color="link" className="text-primary" onClick={this.toggle}>
          {name}
        </Button>
        <Modal isOpen={isOpen} toggle={this.toggle} className="modal-primary">
          <ModalHeader toggle={this.toggle}>
            <i className="fa fa-eye" /> User Details
          </ModalHeader>
          <ModalBody>
            <img style={{height:'200px', marginBottom:'20px' }} src={profile} class="img-thumbnail mx-auto d-block"/>
            <Table>
              <tbody>
                <tr>
                  <th scope="row">ID</th>
                  <td>{id}</td>
                </tr>
                <tr>
                  <th scope="row">Name</th>
                  <td>{name}</td>
                </tr>
                <tr>
                  <th scope="row">Number</th>
                  <td>{number}</td>
                </tr>
                <tr>
                  <th scope="row">Gender</th>
                  <td>{gender}</td>
                </tr>
                <tr>
                  <th scope="row">City</th>
                  <td>{city}</td>
                </tr>
                <tr>
                  <th scope="row">Occupation</th>
                  <td>{occupation}</td>
                </tr>
                <tr>
                  <th scope="row">Active</th>
                  <td>{(is_active == 1)? "Active":"Not Active"}</td>
                </tr>
                <tr>
                  <th scope="row">Aggreed To Terms and conditions</th>
                  <td>{aggreedToTerms}</td>
                </tr>
                <tr>
                  <th scope="row">Address</th>
                  <td>{address}</td>
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

export default UserDetailsModel;
