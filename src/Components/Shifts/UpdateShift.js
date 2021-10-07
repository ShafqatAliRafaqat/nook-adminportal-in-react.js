import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../../Store/Actions/ShiftsActions";
import {
  FormGroup,
  Input,
  Label,
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal
} from 'reactstrap';

class UpdateShift extends Component {

  state = {
    refunedSecurity:'',
    isOpen: false,
  };

  updateShift = () => {

    let {user,shift,updateShift,dispatch,alertify} = this.props;

    const {status, refunedSecurity} = this.state;

    const body = {
      status,
      refunedSecurity
    };

    updateShift(user.accessToken,shift.id,body).then(res => {

      const {shift,message} = res.data;

      dispatch({
        type: actions.UPDATE_SHIFTS,
        payload: shift
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

    let {shift} = this.props;
    const {status, refunedSecurity} = this.state;
    return (
      <React.Fragment>
        <Button color="primary" onClick={this.toggle} className="mr-1">
          <i className="fa fa-pencil"/> Update Shift
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-primary">
          <ModalHeader toggle={this.toggle}><i className="fa fa-pencil"/> Update Shift</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="id">Shift ID</Label>
              <Input type="text" name="id" readOnly value={shift.id}/>
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

            {
              (status === 'approved') && (
                <FormGroup>
                  <Label htmlFor="refunedSecurity">Refuned Security</Label>
                  <Input type="number" name="refunedSecurity" value={refunedSecurity} onChange={this.onChange} />
                </FormGroup>
              )
            }
            
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateShift}>Update</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }


}

const mapDispatchToProps = () => {
  return {
    updateShift: (token,id, data) => actions.updateShift(token,id, data),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UpdateShift);
