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

class CreateNook extends Component {

  state = {
    isOpen: false,
    activeTab: 0,
    type: "",
    space_type: "",
    gender_type: "",
    status: "",
    nookCode: "",
    description: "",
    facilities: [
      "TV", "AC", "wifi",
      "Furniture", "Kitchen", "Kitchen Accessories",
      "Electronic Iron", "Gas Bill", "Water Bill",
      "Parking", "Transport", "Oven",
      "Cable", "Laundry", "Food",
      "Fridge", "Security Guard", "CCTV",
      "Water Filter", "UPS", "Lounge",
      "Hot Water", "House Keeping", "Generator",
    ],
    video_url: "",
    number: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    address: "",
    lat: "",
    lng: "",
    partner_id: "",
    securityPercentage: "",
    area: '',
    area_unit: "",
    inner_details: "",
    other: "",
    furnished: '',
    rent: 0,
    noOfBeds: 0,
    security: 0,
    agreementCharges: 0,
    agreementTenure: 0,
    processing: false,
    rooms: [],
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

  create = () => {

    this.setState({
      processing: true
    });

    let { user, create, dispatch, alertify } = this.props;


    let params = {
      ...this.state,
      furnished: this.state.furnished || '0',
      securityPercentage: this.state.securityPercentage || '0',
    };

    create(user.accessToken, params).then(res => {


      dispatch({
        type: actions.CREATE_NOOK,
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
      console.log(error);
      alertify.alert('Error ' + response.status + ' - ' + response.statusText, response.data.message);
    }).finally(() => {
      this.setState({
        processing: false
      });
    });
  };

  render() {

    let { activeTab, processing } = this.state;

    return (
      <React.Fragment>
        <Button color="success" onClick={this.toggle} className="mr-1">
          <i className="fa fa-plus" /> Create
        </Button>
        <Modal style={{}} isOpen={this.state.isOpen} toggle={this.toggle} className="modal-success modal-lg">
          <ModalHeader style={{}} toggle={this.toggle}> Create</ModalHeader>
          <ModalBody style={style}>
            <Nav tabs>
              <NavItem>
                <NavLink className={classnames({ active: activeTab === 0 })} onClick={() => { this.toggleTab(0); }}>Nook</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink className={classnames({ active: activeTab === 1 })} onClick={() => { this.toggleTab(1); }}>Rooms</NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink className={classnames({ active: activeTab === 3 })} onClick={() => { this.toggleTab(3); }}>Location</NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId={0}>
                <NookForm {...this.props} {...this.state} onChange={this.onChange} />
              </TabPane>
              {/* <TabPane tabId={1}>
                <NookRooms addDefaultRoom={true} {...this.props} {...this.state} onRoomsChange={this.onRoomsChange} />
              </TabPane> */}
              <TabPane tabId={3} style={{ height: '480px' }}>
                <LocationSelector style={{
                  width: '730px',
                  height: '450px'
                }} centerAroundCurrentLocation onLocationChange={l => this.setState({ ...l })} />
              </TabPane>
            </TabContent>

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
    create: (token, params) => actions.createNook(token, params)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateNook);
