import React, { Component } from "react";

import {
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal,
  Nav, NavItem, NavLink, TabContent, TabPane,
  Row, Col, Label, Input, FormGroup,
} from 'reactstrap';

import LocationSelector from "../MapAndLocation/LocationSelector";
import classnames from "classnames";
import * as actions from "../../Store/Actions/AreaActions";

import { connect } from "react-redux";

const style = {
  height: '1100px'
};

class EditArea extends Component {

  state = {
    isOpen: false,
    subAreaOpen: false,
    arealocationOpen: false,
    editSubAreaOpen: false,
    editArealocationOpen: false,
    area:'',
    areaId:'',
    location_name:'',
    locationindex:'',
    subareaindex:'',
    sub_area_name:'',
    lat:'',
    lng:'',
    radius:1000,
    sub_area:[],
    location:[]
  };
  componentDidMount = () => {
    const {area,id,sub_area} = this.props.area;

    let state = {
      ...this.state,
      area:area,
      sub_area:sub_area,
      areaid:id,
    };

    this.setState(state);
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  };
  subAreaToggle = () => {
    this.setState({
      sub_area_name: '',
      location: '',
      subAreaOpen: !this.state.subAreaOpen
    })
  };

  editSubAreaToggle = e => {
    const {sub_area} = this.state;
    let index = sub_area.indexOf(e);
    // sub_area.splice(index, 1);
    this.setState({
      sub_area_name: e.name,
      location: e.locations,
      subareaindex: index,
      subAreaOpen: !this.state.subAreaOpen,
      editSubAreaOpen: !this.state.editSubAreaOpen
    })
  };
  removeSubAreaToggle = e => {
    const {sub_area} = this.state;
    const {alertify} = this.props;
    var index = sub_area.indexOf(e);
    sub_area.splice(index, 1);
    this.setState({
      sub_area: sub_area
    })
    alertify.success("Sub Area Removed");
  };
  editAreaLocationToggle = e => {
    const {location} = this.state;
    let index = location.indexOf(e);
    // location.splice(index, 1);
    this.setState({
      location_name:e.name, 
      lat:e.lat, 
      lng:e.lng,
      radius:e.radius,
      locationindex:index,
      areaLocationOpen: !this.state.areaLocationOpen
    })
  };
  removeAreaLocationToggle = e => {
    let { alertify } = this.props;
    const {location} = this.state;
    var index = location.indexOf(e);
    location.splice(index, 1);
    this.setState({
      location: location
    })
    alertify.success("Location Removed");
  };
  areaLocationToggle = () => {
    this.setState({
      lat:'',
      lng:'',
      location_name:'',
      areaLocationOpen: !this.state.areaLocationOpen
    })
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  addSubArea = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addAreaLocation = () => {
    if(this.state.location_name.length == 0 ){
      return alert("Enter Block Name First");
    }
    const {location_name, lat, lng, location, radius, locationindex} = this.state;
    let data ={"name" : location_name, "lat" : lat, "lng" : lng, "radius": radius};
    
    if(location.length >0 ){
      (locationindex === 0)? location.splice(locationindex, 1) : ((locationindex )? location.splice(locationindex, 1) : '') ;
      location.push(data);  
    }else{
      this.setState({
        location: [data],
      });
    }
    this.setState({
      location_name: '',
      lat: '',
      lng: '',
      locationindex:'',
      radius:1000,
      areaLocationOpen:false
    });
  };
  
  editAreaLocation = () => {
    if(this.state.location_name.length == 0 ){
      return alert("Enter Block Name First");
    }
    const {location_name, lat, lng, location, radius} = this.state;
    let data ={"name" : location_name, "lat" : lat, "lng" : lng, "radius": radius};
    location.push(data);
    this.setState({
      location_name: '',
      lat: '',
      lng: '',
      radius:1000,
      areaLocationOpen:false
    });
  };
  
  addSubAreaArray = () => {
    if(this.state.sub_area_name.length == 0 ){
      return alert("Enter Area Name First");
    }
    const {sub_area_name, sub_area, location,subareaindex} = this.state;
    let data ={"name" : sub_area_name, "locations" : location};
    
    (subareaindex === 0)? sub_area.splice(subareaindex, 1) : ((subareaindex )? sub_area.splice(subareaindex, 1) : '') ;
    sub_area.push(data);
    this.setState({
      sub_area_name: '',
      subareaindex:'',
      location: [],
      subAreaOpen:false
    });
  };

  editArea = () => {

    this.setState({
      processing: true
    });

    let { user, editArea, dispatch, alertify } = this.props;

    const {id} = this.props.area;
    const {area, sub_area, areaId} = this.state;
    let params = {"area" : area, "sub_area": sub_area};

    editArea(user.accessToken, id, params).then(res => {


      dispatch({
        type: actions.EDIT_AREA,
        payload: res.data.area
      });
        alertify.success(res.data.message);

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

    let {area, sub_area} = this.props.area;
    let {processing, location, sub_area_name } = this.state;
    let maplocation = {
      lat: this.state.lat,
      lng: this.state.lng
    };
    return (
      <React.Fragment>
        <Button color="primary" onClick={this.toggle} className="mr-1">
          <i className="fa fa-pencil" /> Edit
        </Button>

        {/* Start of Main Area Modal */}
        
        <Modal style={{}} isOpen={this.state.isOpen} toggle={this.toggle} className="modal-success modal-lg">
          <ModalHeader style={{}} toggle={this.toggle}> Edit</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Row>
                        <Col xs="9" sm="9" lg ="9">
                            <Label htmlFor="area">Area*</Label>
                            <Input type="text" name="area" placeholder="Area" value={this.state.area} onChange={this.onChange} />
                        </Col>
                        {(area.length > 0) && 
                          <Col xs="3" sm="3" lg ="3" style={{marginTop:"30px"}}>
                            <Button color="primary" onClick={this.subAreaToggle}>Add Sub Area</Button>                
                          </Col>
                        }
                        {(sub_area.length > 0) && 
                           sub_area.map( m =>{
                            return(
                                  <React.Fragment>
                                    <Col xs="9" sm="9" lg ="9">
                                      <Label htmlFor="area">Sub Area</Label>
                                      <Input type="text" value={m.name} readOnly />
                                    </Col>
                                    <Col xs="3" sm="3" lg ="3" style={{marginTop:"30px"}}>
                                      <Button color="primary" onClick={() => this.editSubAreaToggle(m)}>Edit Area</Button>                
                                      <Button className="ml-2" color="warning" onClick={() => this.removeSubAreaToggle(m)}>X</Button>                
                                    </Col>
                                  </React.Fragment>
                            )
                          })
                        }
                    </Row>
                </FormGroup>
            </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.editArea} disabled={processing} >
              {(processing) ? "Updating..." : "Update"}
            </Button>
            <Button onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        {/* end of Main Area Modal  */}

        {/* Add Sub Area Modal */}
        <Modal style={{}} isOpen={this.state.subAreaOpen} toggle={this.subAreaToggle} className="modal-success modal-lg">
          <ModalHeader style={{}} toggle={this.subAreaToggle}> Create</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Row>
                        <Col xs="9" sm="9" lg ="9" style={{ marginBottom: "5px" }}>
                            <Label htmlFor="sub_area">Sub Area*</Label>
                            <Input type="text" name="sub_area_name" value={sub_area_name} placeholder="Sub Area"  onChange={this.onChange}/>
                        </Col>
                        {(sub_area_name.length > 0) && 
                          <Col xs="3" sm="3" lg ="3" style={{marginTop:"30px"}}>
                            <Button color="primary" onClick={this.areaLocationToggle}>{(location.length > 0)? "Add Another Location": "Add Location"}</Button>                
                          </Col>
                        }
                        {(location.length > 0) && 
                           location.map( m =>{
                            return(
                                  <React.Fragment>
                                    <Col xs="9" sm="9" lg ="9">
                                      <ul>
                                      <li> <strong>Location :</strong> {m.name} <strong>Radius:</strong> {m.radius}</li>
                                      </ul>
                                    </Col>
                                    <Col xs="3" sm="3" lg ="3">
                                      <Button color="primary" onClick={()=>this.editAreaLocationToggle(m)}>Edit</Button>                
                                      <Button className="ml-2" color="warning" onClick={()=>this.removeAreaLocationToggle(m)}>X</Button>                
                                    </Col>
                                  </React.Fragment>
                            )
                          })
                        }
                    </Row>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
            <Button color="success" onClick={this.addSubAreaArray} disabled={(location.length == 0)? true : false } >
              Create
            </Button>
            <Button onClick={this.subAreaToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        
        {/* End of Sub Area Modal */}

        {/* Add Area Location Modal */}
        <Modal style={{}} isOpen={this.state.areaLocationOpen} toggle={this.areaLocationToggle} className="modal-success modal-lg">
          <ModalHeader style={{}} toggle={this.areaLocationToggle}> Create</ModalHeader>
            <ModalBody style={{ width: '765px', height: '450px' }}>
              <Row>
                <Col xs="6" sm="6" lg ="6" style={{ marginBottom: "5px" }}>
                    <Label htmlFor="sub_area">Block Name*</Label>
                    <Input type="text" name="location_name" value={this.state.location_name}  onChange={this.onChange} placeholder="Block Name"/>
                </Col>
                <Col xs="6" sm="6" lg ="6" style={{ marginBottom: "5px" }}>
                      <Label htmlFor="sub_area">Radius*</Label>
                    <Input type="text" name="radius" value={this.state.radius}  onChange={this.onChange} placeholder="Enter Radius"/>
                </Col>
                <Col xs="12" sm="12" lg ="12">
                  <LocationSelector style={{ width: '760px', height: '350px' }} location={maplocation} centerAroundCurrentLocation={(this.state.lat)? false:true}  onLocationChange={l => this.setState({ lat: l.lat, lng: l.lng })} />
                </Col>
              </Row>
                        
            </ModalBody>
            <ModalFooter>
            <Button color="success" onClick={this.addAreaLocation} >
              Create
            </Button>
            <Button onClick={this.areaLocationToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        
        {/* End of Area Location Modal */}

      </React.Fragment>
    );
  }
}

const mapDispatchToProps = () => {
  return {
    editArea: (token, id, params) => actions.editArea(token, id, params)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditArea);
