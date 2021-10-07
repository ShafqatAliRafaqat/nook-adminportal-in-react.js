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
import NookForm from "./NookForm";
import NookRooms from "./NookRooms";
import * as actions from "../../Store/Actions/NookActions";

import { connect } from "react-redux";

const style = {
  height: '1100px'
};


const spaceTypes = {
  "": "",
  'Shared': 'shared',
  'Independent': 'independent',
  'Service': 'service',
}

const statuses = {
  "": "",
  'Pending': 'pending',
  'In Progress': 'inProgress',
  'Approved': 'approved',
  'Rejected': 'rejected',
};

const types = {
  "": "",
  'House': 'house',
  'Flat': 'flat',
  'Independent Room': 'independentRoom',
  'Hostel Building': 'hostelBuilding',
  'Out House': 'outHouse',
  'Other': 'other',
}

const nookTypes = {
  "": "",
  'Male': 'male',
  'Female': 'female',
  'Both': 'both',
};

class EditNook extends Component {

  state = {
    isOpen: false,
    activeTab: 0,
    processing: false,
    ...this.props.nook,
    ...this.props.nook.location,
  };


  componentDidMount = () => {
    const {partner,space_type,type,gender_type,status} = this.props.nook;

    let state = {
      ...this.state,
      partner:partner,
      space_type:spaceTypes[space_type],
      type:types[type],
      gender_type:nookTypes[gender_type],
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

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  onRoomsChange = (rooms) => {
    this.setState({
      rooms
    });
  }

  edit = () => {

    this.setState({
      processing: true
    });

    let { user, edit, dispatch, alertify, nook } = this.props;

    let params = {
      ...this.state,
    };

    console.log({params});

    edit(user.accessToken, nook.id, params).then(res => {


      dispatch({
        type: actions.EDIT_NOOK,
        payload: res.data.nook
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

    let { activeTab, processing, location } = this.state;
    if(!this.state.location){
      let lat = "31.5031794";
      let lng = "74.3308091";
      location = {lat,lng};
      console.log("nook location =>",location);  
    }
    return (
      <React.Fragment>
        <Button color="primary" onClick={this.toggle} className="mr-1">
          <i className="fa fa-pencil" /> Edit
        </Button>
        <Modal style={{}} isOpen={this.state.isOpen} toggle={this.toggle} className="modal-primary modal-lg">
          <ModalHeader style={{}} toggle={this.toggle}> Edit</ModalHeader>
          <ModalBody style={style}>
            <Nav tabs>
              <NavItem>
                <NavLink className={classnames({ active: activeTab === 0 })} onClick={() => { this.toggleTab(0); }}>Nook</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: activeTab === 1 })} onClick={() => { this.toggleTab(1); }}>Rooms</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: activeTab === 3 })} onClick={() => { this.toggleTab(3); }}>Location</NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId={0}>
                <NookForm {...this.props} {...this.state} onChange={this.onChange} />
              </TabPane>
              <TabPane tabId={1}>
                <NookRooms {...this.props} {...this.state} onRoomsChange={this.onRoomsChange} />
              </TabPane>
              <TabPane tabId={3} style={{ height: '480px' }}>
                <LocationSelector style={{
                  width: '730px',
                  height: '450px'
                }} location={(this.state.location)?this.state.location:location} onLocationChange={l => this.setState({ ...l })} />
              </TabPane>
            </TabContent>

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
    edit: (token, id, params) => actions.editNook(token, id, params)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditNook);
