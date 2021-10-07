import React, { Component } from "react";

import {
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal,
  Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';

import LocationSelector from "../MapAndLocation/LocationSelector";
import classnames from "classnames";
import BookingForm from "./BookingForm";
import * as actions from "../../Store/Actions/BookingActions";

import { connect } from "react-redux";

const style = {
  height: 'auto'
};

class CreateBooking extends Component {

  state = {
    isOpen: false,
    space_type: '',
    nook_id: '',
    room_id: '',
    status: "",
    user_id: "",
    processing: false,
    
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

  create = () => {

    this.setState({
      processing: true
    });

    let { user, create, dispatch, alertify } = this.props;

    const params = {
        "nook_id": this.state.nook_id, 
        "room_id": (this.state.room_id)?this.state.room_id:0, 
        "status":this.state.status, 
        "user_id":this.state.user_id, 
    };
    
    create(user.accessToken, params).then(res => {


      dispatch({
        type: actions.CREATE_BOOKING,
        payload: res.data.booking
      });

      if (alertify) {
        alertify.success(res.data.message);
      }

      this.setState({
        isOpen: false,
        description: '',
        type: '',
        status: '',
        images:[],
        image:'',
        user_id: '',
      });
    }).catch((error) => {
      const { response } = error;
      console.log(error);
      alertify.alert('Error ' + response.status + ' - ' + response.statusText, response.data.message);
    }).finally(() => {
      this.setState({
        processing: false
      });
    });
  };

  render() {

    let { processing } = this.state;

    return (
      <React.Fragment>
        <Button color="success" onClick={this.toggle} className="mr-1">
          Create
        </Button>
        <Modal style={{}} isOpen={this.state.isOpen} toggle={this.toggle} className="modal-success modal-md">
          <ModalHeader style={{}} toggle={this.toggle}> Create</ModalHeader>
          <ModalBody style={style}>      
            <BookingForm {...this.props} {...this.state} onChange={this.onChange} />
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.create} disabled={processing} >
              {(processing) ? "Creating..." : "Create"}
            </Button>
            <Button onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = () => {
  return {
    create: (token, params) => actions.createBooking(token, params)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateBooking);
