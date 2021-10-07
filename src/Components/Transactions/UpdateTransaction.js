import React, {Component} from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/GetTransactionsActions";

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

class EditTransaction extends Component {

  state = {
    ...this.props.transaction,
    isOpen:false
  };

  editTag = () => {

    let {user,editTransaction,dispatch,alertify} = this.props;
    const {id,status,amount} = this.state;
    let data = {
      status,amount
    };

    editTransaction(user.accessToken,id,data).then(res => {
      const {transaction,message} = res.data;

      dispatch({
        type: actions.UPDATE_TRANSACTIONS,
        payload: transaction
      });

      alertify.success(message);

    }).catch(({response}) => {
      alertify.alert('Error '+response.status+' - '+response.statusText,response.data.message);
    });

    this.setState({
      isOpen:false
    });

  };

  toggle = () => {
    this.setState({
      isOpen:!this.state.isOpen
    })
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render(){

    const {status,amount,isOpen } = this.state;

    return (
      <React.Fragment>
        <Button color="primary" onClick={this.toggle} className="mr-1">
          <i className="fa fa-pencil"/> Edit
        </Button>
        <Modal  isOpen={isOpen} toggle={this.toggle} className="modal-primary">
          <ModalHeader toggle={this.toggle}><i className="fa fa-pencil"/> Update</ModalHeader>
          <ModalBody>
           

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
              <Label htmlFor="amount">Amount</Label>
              <Input type="number" name="amount" value={amount} onChange={this.onChange} />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.editTag}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = () => {
  return {
    editTransaction: (token,id,data) => actions.editTransaction(token,id,data),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditTransaction);
///transaction