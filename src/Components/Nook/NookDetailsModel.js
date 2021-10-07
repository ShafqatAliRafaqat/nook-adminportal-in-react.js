import React, { Component } from "react";

import {
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal,
  Table
} from "reactstrap";
import RoomDetailsModel from "../Rooms/RoomDetailsModel";
import UserDetailsModel from './../Users/UserDetailsModel';

class NookDetailsModel extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  facilities(facilities){
    if(facilities == null){
      return true;
    }
    if(facilities.length == 0){
      return true;
    }
    return facilities.map(m => {
      return (
        m+', '
      );
    });
  }
  rooms(rooms){
    if(rooms.length == 0){
      return true;
    }
    return rooms.map(m => {
      return (
              <tr key={m.id}>
                <th scope="row">Room {m.id}</th>
                <td>{m && <RoomDetailsModel room={m} />}</td>
              </tr>
      );
    });
  }
  render() {
    const { isOpen } = this.state;
    const {nook} = this.props;
    const { 
      id,type,space_type,description,video_url,number, nookCode, gender_type, status, address
    } = nook;

    return (
      <React.Fragment>
        <Button color="link" className="text-primary" onClick={this.toggle}>
          {(nookCode)? nookCode : id }
        </Button>
        <Modal isOpen={isOpen} toggle={this.toggle} className="modal-primary">
          <ModalHeader toggle={this.toggle}>
            <i className="fa fa-eye" /> Nook Details
          </ModalHeader>
          <ModalBody>
            <Table>
              <tbody>
                <tr>
                  <th scope="row">ID</th>
                  <td>{id}</td>
                </tr>
                <tr>
                  <th scope="row">Nook Code</th>
                  <td>{nookCode}</td>
                </tr>
                <tr>
                  <th scope="row">Gender type</th>
                  <td>{gender_type}</td>
                </tr>
                <tr>
                  <th scope="row">Status</th>
                  <td>{status}</td>
                </tr>
                <tr>
                  <th scope="row">Type</th>
                  <td>{type}</td>
                </tr>
                <tr>
                  <th scope="row">Space Type</th>
                  <td>{space_type}</td>
                </tr>
                {space_type == "Independent" && 
                  <React.Fragment>
                  <tr>
                    <th scope="row">Rent</th>
                    <td>{nook.rent}</td>
                  </tr>
                  <tr>
                    <th scope="row">Security</th>
                    <td>{nook.security}</td>
                  </tr>
                  <tr>
                    <th scope="row">Agreement Charges</th>
                    <td>{nook.agreementCharges}</td>
                  </tr>
                  <tr>
                    <th scope="row">Agreement Tenure</th>
                    <td>{nook.agreementTenure}</td>
                  </tr>
                  <tr>
                    <th scope="row">Area</th>
                    <td>{nook.area}</td>
                  </tr>
                  <tr>
                    <th scope="row">Unit Area</th>
                    <td>{nook.area_unit}</td>
                  </tr>
                  <tr>
                    <th scope="row">Furnished</th>
                    <td>{(nook.furnished == 1) ? 'Yes': 'No'}</td>
                  </tr>
                  <tr>
                    <th scope="row">Inner Details</th>
                    <td>{nook.inner_details}</td>
                  </tr>
                  <tr>
                    <th scope="row">Other Details</th>
                    <td>{nook.other}</td>
                  </tr>
                  </React.Fragment>
                }
                {space_type == "Shared" && 
                  <tr>
                    <th scope="row">Security %</th>
                    <td>{nook.securityPercentage}</td>
                  </tr>
                }
                <tr>
                  <th scope="row">Description</th>
                  <td>{description}</td>
                </tr>
                <tr>
                  <th scope="row">Partner</th>
                  <td><UserDetailsModel user={nook.partner}/></td>
                </tr>
                <tr>
                  <th scope="row">Video URL</th>
                  <td><a target="_blank" href={video_url}>Youtube Video</a></td>
                </tr>
                <tr>
                  <th scope="row">Number</th>
                  <td>{nook.number}</td>
                </tr>
                <tr>
                  <th scope="row">Country</th>
                  <td>{nook.country}</td>
                </tr>
                <tr>
                  <th scope="row">State</th>
                  <td>{nook.state}</td>
                </tr>
                <tr>
                  <th scope="row">City</th>
                  <td>{nook.city}</td>
                </tr>
                <tr>
                  <th scope="row">Zip Code</th>
                  <td>{nook.zipCode}</td>
                </tr>
                <tr>
                  <th scope="row">Area Data</th>
                  <td>{nook.area_data}</td>
                </tr>
                <tr>
                  <th scope="row">Address</th>
                  <td>{address}</td>
                </tr>
                <tr>
                  <th scope="row">Facilities</th>
                  <td>{this.facilities(nook.facilities)}</td>
                </tr>
                  {this.rooms(nook.rooms)}
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

export default NookDetailsModel;
