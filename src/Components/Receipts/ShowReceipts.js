import React, {Component} from "react";
import {
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal, Table
} from 'reactstrap';

class ShowReceipts extends Component {

  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  };
  render() {

    const {receipt} = this.props;
    const {extras} = receipt;
    const fiels = Object.keys(extras);
    console.log('receipt',this.props.receipt);
    return (
      <React.Fragment>
        <Button color="link" className="text-primary mr-1" onClick={this.toggle}>
          {receipt.id}
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-primary">
          <ModalHeader toggle={this.toggle}><i className="fa fa-eye"/> Receipt Details</ModalHeader>
          <ModalBody>
            <Table>
              <tbody>
              <tr>
                <th scope="row">Sr#</th>
                <td>{receipt.id}</td>
              </tr>
              <tr>
                <th scope="row">Nook Code</th>
                <td>{(receipt.nook)?receipt.nook.nookCode:""}</td>
              </tr>
              <tr>
                <th scope="row">Name</th>
                <td>{(receipt.user) ? receipt.user.name : ''}</td>
              </tr>
              <tr>
                <th scope="row">Room#</th>
                <td>{receipt.room_id?receipt.room_id:0}</td>
              </tr>
              <tr>
                <th scope="row">Date</th>
                <td>{receipt.due_date}</td>
              </tr>
              <tr>
                <th scope="row">Month</th>
                <td>{receipt.month}</td>
              </tr>
              <tr>
                <th scope="row">Rent</th>
                <td>{receipt.rent}</td>
              </tr>
              <tr>
                <th scope="row">Arrears</th>
                <td>{receipt.arrears}</td>
              </tr>
              <tr>
                <th scope="row">Unit Used</th>
                <td>{receipt.e_units}</td>
              </tr>
              <tr>
                <th scope="row">Unit Cost</th>
                <td>{receipt.e_unit_cost}</td>
              </tr>
              <tr>
                <th scope="row">Total AC Bill</th>
                <td>{receipt.e_unit_cost*receipt.e_units}</td>
              </tr>
              <tr>
                <th scope="row">Damage/Fine</th>
                <td>{receipt.fine}</td>
              </tr>

              {fiels.map(key => <tr key={key}>
              <th scope="row">{key}</th>
                <td>{extras[key]}</td>
              </tr>)}
              
              <tr>
                <th scope="row">Amount</th>
                <td>{receipt.amount}</td>
              </tr>
              <tr>
                <th scope="row">Late Payment Charges</th>
                <td>{receipt.latePaymentCharges}</td>
              </tr>
              
              <tr>
                <th scope="row">Received</th>
                <td>{receipt.received_amount}</td>
              </tr>
              <tr>
                <th scope="row">Remaining Payable</th>
                <td>{receipt.remaining_payable}</td>
              </tr>
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ShowReceipts;
