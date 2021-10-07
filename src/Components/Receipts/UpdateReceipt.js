import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../../Store/Actions/ReceiptActions";
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

class UpdateReceipt extends Component {

  state = {
    isOpen: false,
    amount:'',
  };

  payReceipt = () => {

    let {user,receipt,payReceipt,dispatch,alertify} = this.props;

    const body = {
      "amount": this.state.amount,
    };

    payReceipt(user.accessToken,receipt.id,body).then(res => {

      const {receipt,message} = res.data;

      dispatch({
        type: actions.PAY_RECEIPT,
        payload: receipt
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

    let {receipt} = this.props;
    return (
      <React.Fragment>
        <Button color="primary" onClick={this.toggle} className="mr-1">
          <i className="fa fa-pencil"/> Receive Payment
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-primary">
          <ModalHeader toggle={this.toggle}><i className="fa fa-pencil"/> Receive Payment</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="name">Receipt ID</Label>
              <Input type="text" name="name" readOnly value={receipt.id}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="order">Amount</Label>
              <Input type="text" name="amount" onChange={this.onChange} placeholder="Payment Account"/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.payReceipt}>Update</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }


}

const mapDispatchToProps = () => {
  return {
    payReceipt: (token,id, data) => actions.payReceipt(token,id, data),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UpdateReceipt);
