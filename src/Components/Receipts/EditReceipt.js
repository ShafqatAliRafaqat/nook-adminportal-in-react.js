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
  Modal,
  Row,
  Card, 
  CardBody,
  Col
} from 'reactstrap';

class EditReceipt extends Component {

    defaultExtra = {
        name: "",
        value: "",
    };

  state = {
    isOpen: false,
    e_units:this.props.receipt.e_units,
    rent:this.props.receipt.rent,
    arrears:this.props.receipt.arrears,
    fine:this.props.receipt.fine,
    extras: [
        ...(this.props.receipt.extra_array || [])
    ],
    due_date:this.props.receipt.due_date_format,
    status:this.props.receipt.key_status,
    late_day_fine:this.props.receipt.late_day_fine,  
    extra: {
        name: '',
        value: ''
      },
    }
  updateReceipt = () => {

    let {user,receipt,updateReceipt,dispatch,alertify} = this.props;
    
    const extras = {};
    if(this.state.extras.length > 0){
      this.state.extras.map((ex) => {
          if(ex.value.length > 0){
            extras[ex.name] = ex.value
          }
      });
    }
    const body = {
      "e_units": this.state.e_units,
      "rent": this.state.rent,
      "arrears": this.state.arrears,
      "fine": this.state.fine,
      "extras": extras,
      "due_date": this.state.due_date,
      "status": this.state.status,
      "late_day_fine": this.state.late_day_fine,
    };

    updateReceipt(user.accessToken,receipt.id,body).then(res => {

      const {receipt,message} = res.data;

      dispatch({
        type: actions.UPDATE_RECEIPT,
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
 
 

onExtraChange = ({ target: { value, name } }, index) => {
    const { extras } = this.state;
    const newExtras = extras.map((p, i) => {
        if (index === i) {
            return {
                ...p,
                [name]: value
            };
        }
        return p;
    });
    this.setState({
        extras: newExtras
    });
};

addExtras = () => {
    const { extras } = this.state;
    this.setState({
        extras: [
            ...extras,
            { ...this.defaultExtra }
        ]
    });
}

removeExtra = (index) => {
    const { extras } = this.state;
    const updateExtras = extras.filter((v, i) => i !== index);
    this.setState({ extras: updateExtras });
};

  render() {

    let {receipt} = this.props;
    const { extras } = this.state;
    
    return (
      <React.Fragment>
        <Button color="primary" onClick={this.toggle} className="mr-1">
          <i className="fa fa-pencil"/> Edit
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-primary modal-lg">
          <ModalHeader toggle={this.toggle}><i className="fa fa-pencil"/> Update Receipt</ModalHeader>
          <ModalBody>
            <FormGroup>
                <Row>
                    <Col xs="12" sm="6">
                    <Label htmlFor="order">Status</Label>
                    <Input
                        type="select"
                        placeholder="Status"
                        name="status"
                        onChange={this.onChange}
                        value={this.state.status}
                    >
                        <option value="">Select Status</option>
                        <option value="draft">Draft</option>
                        <option value="in_progress">In Progress</option>
                        <option value="unpaid">Unpaid</option>
                        <option value="paid">Paid</option>
                    </Input>
                    </Col>
                    <Col xs="12" sm="6">
                        <Label htmlFor="id">Receipt ID</Label>
                        <Input type="text" name="id" readOnly value={receipt.id}/> 
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row>
                    <Col xs="12" sm="6">
                        <Label htmlFor="e_units">E-Units</Label>
                        <Input type="text" name="e_units" onChange={this.onChange} value={this.state.e_units} placeholder="E-Units"/>
                    </Col>
                    <Col xs="12" sm="6">
                        <Label htmlFor="rent">Rent</Label>
                        <Input type="text" name="rent" onChange={this.onChange} value={this.state.rent} placeholder="Rent"/>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row>
                    <Col xs="12" sm="6">
                        <Label htmlFor="arrears">Arrears</Label>
                        <Input type="text" name="arrears" onChange={this.onChange} value={this.state.arrears} placeholder="arrears"/>
                    </Col>
                    <Col xs="12" sm="6">
                        <Label htmlFor="fine">Fine</Label>
                        <Input type="text" name="fine" onChange={this.onChange} value={this.state.fine} placeholder="Fine"/>              
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row>
                    <Col xs="12" sm="6">
                        <Label htmlFor="due_date">Due Date</Label>
                      <Input type="date" name="due_date" onChange={this.onChange} value={this.state.due_date} placeholder="Due Date"/>
                    </Col>
                    <Col xs="12" sm="6">
                        <Label htmlFor="late_day_fine">Late Day Fine</Label>
                        <Input type="text" name="late_day_fine" onChange={this.onChange} value={this.state.late_day_fine} placeholder="late Day Fine"/> 
                    </Col>
                </Row>
           </FormGroup> 
            <FormGroup>
                <Row>
                    <Col sm={{ size: 1, offset: 11 }}>
                        <Button color="success" onClick={this.addExtras} className="mr-1" > <i className="fa fa-plus" /> </Button>
                    </Col>
                </Row>
            </FormGroup>
            {extras.map((p, i) => {
                    return (
                        <Card key={i + 1}>
                            <CardBody>
                                <FormGroup>
                                    <Row>
                                        <Col sm={{ size: 2 }}>
                                            <p>Extra # {i + 1}</p>
                                        </Col>
                                        <Col sm={{ size: 1, offset: 9 }}>
                                            <Button
                                                color="link"
                                                onClick={() => this.removeExtra(i)}
                                                className="mr-1 text-danger"
                                            >
                                                <i className="fa fa-times" />
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={{ size: 6 }}>
                                            <Label htmlFor="Name">Name</Label>
                                            <Input
                                                type="text"
                                                name="name"
                                                value={p.name}
                                                placeholder="Name"
                                                onChange={e => this.onExtraChange(e, i)}
                                            />
                                        </Col>
                                        <Col sm={{ size: 6 }}>
                                            <Label htmlFor="value">Value</Label>
                                            <Input
                                                type="number"
                                                name="value"
                                                value={p.value}
                                                placeholder="Value"
                                                onChange={e => this.onExtraChange(e, i)}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </CardBody>
                        </Card>
                    );
                })}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateReceipt}>Update</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }


}

const mapDispatchToProps = () => {
  return {
    updateReceipt: (token,id, data) => actions.updateReceipt(token,id, data),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditReceipt);
