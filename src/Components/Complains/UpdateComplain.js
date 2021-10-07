import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../../Store/Actions/ComplainActions";
import {
  FormGroup,
  Input,
  Label,
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal,
  Row, 
  Col,
} from 'reactstrap';

class UpdateComplain extends Component {

  state = {
    isOpen: false,
    status: this.props.complain.status_key,
    type  : this.props.complain.type_key,
    description: this.props.complain.description,
  };
  updateComplain = () => {

    let {user,complain,updateComplain,dispatch,alertify} = this.props;

    const body = {
      "status": this.state.status,
      "type": this.state.type,
      "description": this.state.description,
    };

    updateComplain(user.accessToken,complain.id,body).then(res => {

      const {complain,message} = res.data;

      dispatch({
        type: actions.UPDATE_COMPLAINS,
        payload: complain
      });

      alertify.success(message);

    }).catch(({response}) => {
      alertify.alert('Error '+response.status+' - '+response.statusText,response.data.message);
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
  render() {

    let {complain} = this.props;
    const {status,type,description} = this.state;
    return (
      <React.Fragment>
        <Button color="primary" onClick={this.toggle} className="mr-1">
          <i className="fa fa-pencil"/> Update Complain
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-primary">
          <ModalHeader toggle={this.toggle}><i className="fa fa-pencil"/> Update Complain</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="name">Complain ID</Label>
              <Input type="text" name="name" readOnly value={complain.id}/>
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
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </Input>
            </FormGroup>
            <FormGroup>
            <Label htmlFor="type">Type*</Label>
              <Input type="select" name="type" onChange={this.onChange} value={type}>
                <option value="">Select type</option>
                <option value="maintenance">Maintenance</option>
                <option value="car_wash">Car Wash</option>
                <option value="delivery">Delivery</option>
                <option value="security">Security</option>
                <option value="charity_stuff">Charity Stuff</option>
                <option value="staff_related">Staff Related</option>
                <option value="privacy">Privacy</option>
                <option value="internet">Internet</option>
                <option value="food">Food</option>
                <option value="cleaning">Cleaning</option>
                <option value="entertainment">Entertainment</option>
                <option value="discipline">Discipline</option>
                <option value="other">Other Support</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="12" sm="12">
                  <Label htmlFor="description">Description</Label>
                  <Input type="textarea" name="description" placeholder="Description" value={description} onChange={this.onChange} />
                </Col>
              </Row>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateComplain}>Update</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }


}

const mapDispatchToProps = () => {
  return {
    updateComplain: (token,id, data) => actions.updateComplain(token,id, data),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UpdateComplain);
