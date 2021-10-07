import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row, Col, Label, Input, FormGroup, Button
} from 'reactstrap';
import UserSelect from "../Users/UserSelect";
import Select from 'react-select'
import { can } from '../../util/functions';
import * as actions from "../../Store/Actions/NookActions";
import * as qs from "query-string";
import { getSearchUrlFromState } from "../../util/functions";;

class BookingForm extends Component {

  state = {
    ...this.props,
    nooks:[],
    rooms:[],
    nook:'',
    room:'',
  };

  onTypeChange = e => {
    
    let { user, getAllNooks, dispatch, alertify } = this.props;
    
    this.setState({
        [e.target.name]: e.target.value,
        nook:'',
        room:'',
        nooks:[],
        rooms:[]
    });
    
    let space_type = e.target.value;
    
    getAllNooks(user.accessToken, space_type).then(res => {

      this.setState({
        nooks: res.data.nooks,
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
  onNookChange = e => {
    const { onChange } = this.props;
    const { nooks } = this.state;
    
    nooks.filter(nook => nook.id == e.target.value).map( nook =>
        this.setState({
            rooms: nook.rooms,            
        })
    );

    this.setState({
      nook: e.target.value,
      room: '' 
    });
    onChange({
        target: {
          name: "nook_id",
          value: e.target.value,
        }
      });
  };
  onRoomChange = e => {
    const { onChange } = this.props;

    this.setState({
      room: e.target.value 
    });
    onChange({
        target: {
          name: "room_id",
          value: e.target.value,
        }
      });
  };
  onChange = e => {
    const { onChange } = this.props;
    this.setState({
      [e.target.name]: e.target.value
    });
    onChange(e);
  };
  onUserChange = (users) => {
    if (users.length > 0) {
      const user = users[0];
      this.onChange({
        target: {
          name: "user_id",
          value: user.id,
        }
      });
    }
  };

  render() {

    let { space_type, status, nook, room, nooks, user_id, rooms,} = this.state;
   
    return (
      <React.Fragment>
        <FormGroup>
          <Row>
            <Col xs="12" sm="12">
              <Label htmlFor="type">Nook Type*</Label>
                <Input
                    type="select"
                    placeholder="Nook Type"
                    name="space_type"
                    onChange={this.onTypeChange}
                    value={space_type}
                  >
                    <option value="">Select Nook Type</option>
                    <option value="service">Service</option>
                    <option value="shared">Shared</option>
                    <option value="independent">Independent</option>
                </Input>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs="12" sm="6">
              <Label htmlFor="type">Nook*</Label>
                <Input
                    type="select"
                    placeholder="Select Nook"
                    name="nook"
                    onChange={this.onNookChange}
                    value={nook}
                  >
                    <option value="">Select Nook</option>
                    {nooks.map((nook, key) => <option value={nook.id} > {nook.nookCode} {nook.number}</option> )}
                </Input>
            </Col>
            {
                (rooms.length >0) ? 
                <Col xs="12" sm="6">
                    <Label htmlFor="room">Room*</Label>
                    <Input type="select" name="room" onChange={this.onRoomChange} value={room}>
                        <option value="">Select Room</option>
                        {rooms.map(r => <option value= {r.id} >{r.room_number} - {r.capacity} Persons Sharing - {r.price_per_bed} PKR</option> )}
                    </Input>
                </Col>
                :''
            }
            
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
             <Col xs="12" sm="12">
              <Label htmlFor="status">Status*</Label>
              <Input type="select" name="status" onChange={this.onChange} value={status}>
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="off-board">OffBoard</option>
                <option value="cancelled">Cancelled</option>
              </Input>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs="12" sm="12">
              <Label htmlFor="selectManagers">User</Label>
              <UserSelect name="Select User" users={(this.props.partner) ? [this.props.partner] : []} {...this.props} isMulti={false} onChange={this.onUserChange} placeholder="Select User" />
            </Col>
          </Row>
        </FormGroup>
      </React.Fragment>
    );
  }

};
const mapStateToProps = state => {
    return {
      nooks: state.nooks.nooks
    };
  };
  
  const mapDispatchToProps = () => {
    return {
      getAllNooks: (token, search) => actions.getAllNooks(token, search)
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);