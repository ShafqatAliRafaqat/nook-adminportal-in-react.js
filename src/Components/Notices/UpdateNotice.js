import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../../Store/Actions/NoticeActions";
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

class updateNotice extends Component {

  state = {
    isOpen: false,
  };

  updateNotice = () => {

    let {user,notice,updateNotice,dispatch,alertify} = this.props;

    const body = {
      "status": this.state.status,
    };

    updateNotice(user.accessToken,notice.id,body).then(res => {

      const {notice,message} = res.data;

      dispatch({
        type: actions.UPDATE_NOTICE,
        payload: notice
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

    let {notice} = this.props;
    const {status} = this.state;
    return (
      <React.Fragment>
        <Button color="primary" onClick={this.toggle} className="mr-1">
          <i className="fa fa-pencil"/> Update Notice
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-primary">
          <ModalHeader toggle={this.toggle}><i className="fa fa-pencil"/> Update Notice</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="name">Notice ID</Label>
              <Input type="text" name="name" readOnly value={notice.id}/>
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
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateNotice}>Update</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }


}

const mapDispatchToProps = () => {
  return {
    updateNotice: (token,id, data) => actions.updateNotice(token,id, data),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(updateNotice);
