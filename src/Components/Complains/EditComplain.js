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
import ComplainForm from "./ComplainForm";
import * as actions from "../../Store/Actions/ComplainActions";

import { connect } from "react-redux";

const style = {
  height: 'auto'
};
const types = {
    "": "",
    'maintenance': 'Maintenance',
    'car_wash':'Car Wash',
    'delivery':'Delivery',
    'security': 'Security',
    'charity_stuff': 'Charity Stuff',
    'staff_related': 'Staff Related',
    'privacy': 'Privacy',
    'internet': 'Internet',
    'food': 'Food',
    'cleaning': 'Cleaning',
    'entertainment': 'Entertainment',
    'discipline': 'Discipline', 
    'other': 'Other Support'
  };
  const statuses = {
    "": "",
    "pending": "Pending",
    "in_progress": "In Progress",
    "approved": "Approved",
    "rejected": "Rejected",
};

class EditComplain extends Component {

  state = {
    isOpen: false,
    processing: false,
    ...this.props.complain,
  };


  componentDidMount = () => {
    const {type,status} = this.props.complain;

    let state = {
      ...this.state,
      type:types[type],
      status:statuses[status],
    };

    this.setState(state);
  }

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

  edit = () => {

    this.setState({
      processing: true
    });

    let { user, edit, dispatch, alertify, complain } = this.props;

    let params = {
      ...this.state,
    };
    edit(user.accessToken, complain.id, params).then(res => {


      dispatch({
        type: actions.EDIT_COMPLAINS,
        payload: res.data.complain
      });

      if (alertify) {
        alertify.success(res.data.message);
      }

      this.setState({
        isOpen: false
      });
    }).catch((error) => {
      const { response } = error;
      alertify.alert('Error ' + response.status + ' - ' + response.statusText, response.data.message);
    }).finally(() => {
      this.setState({
        processing: false
      });
    });
  };

  render() {

    let { processing} = this.state;
    return (
      <React.Fragment>
        <Button color="primary" onClick={this.toggle} className="mr-1">
          <i className="fa fa-pencil" /> Edit
        </Button>
        <Modal style={{}} isOpen={this.state.isOpen} toggle={this.toggle} className="modal-primary modal-lg">
          <ModalHeader style={{}} toggle={this.toggle}> Edit</ModalHeader>
          <ModalBody style={style}>
            <ComplainForm {...this.props} {...this.state} onChange={this.onChange} />
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.edit} disabled={processing} >
              {(processing) ? "Updating..." : "Update"}
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
    edit: (token, id, params) => actions.editComplain(token, id, params)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditComplain);
