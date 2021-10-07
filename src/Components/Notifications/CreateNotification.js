import React, {Component} from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/NotificationActions";

import {
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal
} from 'reactstrap';

import NotificationForm from "./NotificationForm";

class CreateNotification extends Component {

  state = {
    title:"",
    body:"",
    creating:false,
    isOpen:false,
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  toggle = () => {
    this.setState({
      isOpen:!this.state.isOpen
    })
  };


  create = () => {

    this.setState({
      creating:true
    });

    let {user, create, dispatch, alertify} = this.props;
    let params = {...this.state};

    create(user.accessToken,params).then(res => {

      dispatch({
        type: actions.CREAT_NOTIFICATION,
        payload: res.data.data
      });

      this.setState({
        title:"",
        body:"",
        isOpen:false
      });

      alertify.success(res.data.message);

    }).catch(({response}) => {
      alertify.alert('Error '+response.status+' - '+response.statusText,response.data.message);
    }).finally(()=>{
      this.setState({
        creating:false
      });
    });

  };

  render(){
    const {isOpen,creating} = this.state;

    return (
      <React.Fragment>
        <Button block color="success" onClick={this.toggle} className="mr-1"><i className="fa fa-plus"/> Add Notification</Button>
        <Modal  isOpen={isOpen} toggle={this.toggle} className="modal-success modal-lg">
          <ModalHeader toggle={this.toggle}><i className="fa fa-plus"/> Add Notification</ModalHeader>
          <ModalBody>
            <NotificationForm {...this.props} {...this.state} onChange={this.onChange}/>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.create}>{(creating)?"Creating...":"Create"}</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = () => {
  return {
    create: (token,params) => actions.createNotifications(token,params),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateNotification);
