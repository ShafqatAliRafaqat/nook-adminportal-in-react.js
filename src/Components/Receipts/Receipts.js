import React, { Component } from "react";
import { connect } from "react-redux";
import * as qs from "query-string";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Row,
  Table
} from "reactstrap";

import SimplePagination from "../Common/SimplePagination";
import * as actions from "../../Store/Actions/ReceiptActions";
import NookDetailsModel from "../Nook/NookDetailsModel";
import UserDetailsModel from "../Users/UserDetailsModel";
import TextModel from "../Common/TextModel";

import { getSearchUrlFromState } from "../../util/functions";
import UpdateBooking from "../Bookings/UpdateBooking";
import GenerateReceipt_01 from "../Bookings/GenerateReceipt_01";
import AddSecurity from "../Bookings/AddSecurity";
import ShowReceipts from "./ShowReceipts";
import UpdateReceipt from "./UpdateReceipt";
import EditReceipt from "./EditReceipt";

class Receipts extends Component {
  state = {
    id: "",
    status: "",
    month: "",
    nookCode: "",
    space_type: "",
    number: "",
    email: "",
    type: '',
    page: 0,
    totalPages: 0,
    processing: false,
    isLoading: true
  };

  getReceipts = search => {
    this.setState({
      isLoading: true
    });

    let { getReceipts, dispatch, user, alertify } = this.props;

    getReceipts(user.accessToken, search)
      .then(res => {
        this.setState({
          page: res.data.meta.current_page,
          totalPages: res.data.meta.last_page
        });

        dispatch({
          type: actions.GET_RECEIPTS,
          payload: res.data.data
        });
      })
      .catch(({ response }) => {
        alertify.alert(
          "Error " + response.status + " - " + response.statusText,
          response.data.message
        );
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  };

  componentDidMount() {
    let search = this.props.location.search;

    const params = qs.parse(search);

    let state = {};
    Object.keys(params).forEach(k => {
      if (params[k]) {
        state[k] = params[k];
      }
    });

    this.setState(state);

    this.getReceipts(search);
  }

  next = () => {
    let next = this.state.page + 1;
    if (next <= this.state.totalPages) {
      let search = getSearchUrlFromState(this.state);
      this.getReceipts(search + "page=" + next);
    }
  };

  previous = () => {
    let previous = this.state.page - 1;
    if (previous > 0) {
      let search = getSearchUrlFromState(this.state);
      this.getReceipts(search + "page=" + previous);
    }
  };

  renderShowDetailCell = (isHead = true, receipt = null) => {
    return <ShowReceipts {...this.props} receipt={receipt} />
    ;
  };

  PublishAllRecept = (nook_id) =>{
    this.setState({
      isLoading: true,
      processing: true,
    });
    let search = getSearchUrlFromState(this.state);
    let {user,PublishRecept,dispatch,alertify} = this.props;

    const body = {
      "nook_id": nook_id,
    };

    PublishRecept(user.accessToken,body).then(res => {

      const {message} = res.data;

      alertify.success(message);
      this.setState({
        processing: false,
      });

      this.getReceipts(search);
    
    }).catch(({response}) => {
        alertify.alert('Error '+response.status+' - '+response.statusText,response.data.message);
    });
  }

  PublishRecept = (nook_id, receipt_id) =>{
    this.setState({
      isLoading: true,
      processing: true,
    });
    let search = getSearchUrlFromState(this.state);
    let {user,PublishRecept,dispatch,alertify} = this.props;

    const body = {
      "nook_id": nook_id,
      "receipt_id": receipt_id,
    };

    PublishRecept(user.accessToken,body).then(res => {

      const {message} = res.data;

      alertify.success(message);
      
      this.setState({
        processing: false,
      });

      this.getReceipts(search);

    }).catch(({response}) => {
      alertify.alert('Error '+response.status+' - '+response.statusText,response.data.message);
    });
  }
  
  renderPayReceiptCell = (isHead = true, receipt = null) => {
    return isHead ? <th>Update</th> :
      <UpdateReceipt {...this.props} receipt={receipt} />;
  };
  
  renderEditReceiptCell = (isHead = true, receipt = null) => {
    return isHead ? <th>Update</th> :
      <EditReceipt {...this.props} receipt={receipt} />;
  };

  renderBody = () => {
    if (this.state.isLoading) {
      return;
    }
    const {processing} = this.state;

    return this.props.receipts.map(m => {
      return (
        <tr key={m.id}>
          <td>{this.renderShowDetailCell(false, m)}</td>
          <td>{m.status}</td>
          <td>{m.total_amount} PKR</td>
          <td>{m.due_date}</td>
          <td>
            {m.nook && <NookDetailsModel nook={m.nook} />}
          </td>
          <td className ='text-center'>
            {
            (m.status == 'Draft')?
            <React.Fragment> 
              <Button color="success" onClick={()=>this.PublishRecept(m.nook.id,m.id)} className="mr-1 mb-2" disabled={processing} >
              <i className="fa fa-print" /> {(processing) ? "Updating..." : "Publish Receipt"}
              </Button>
              <Button color="primary" onClick={()=>this.PublishAllRecept(m.nook.id)} className="mr-1" disabled={processing}>
                {(processing) ? "Updating..." : "Publish All Receipt"}
              </Button>
            </React.Fragment>
            :''
            }
            {
            (m.key_status == 'in_progress')?
              this.renderPayReceiptCell(false, m)
            :''
            }
          </td>
          <td>
            {m.user && <UserDetailsModel user={m.user} />}
          </td>
          <td style={{display:"flex"}}>
            
            <EditReceipt {...this.props} receipt={m} />
            <Button color="danger" onClick={ () => { if (window.confirm('Are you sure you want to delete this receipt?')) this.deleteReceipt(m.id) }} className="mr-1">
              <i className="fa fa-trash" /> Delete
            </Button>
            </td>
          <td>{m.created_at}</td>
          <td>{m.updated_at}</td>
        </tr>
      );
    });
  };
  deleteReceipt = (id) => {
    let { deleteReceipt, dispatch, user, alertify } = this.props;
    
    deleteReceipt(user.accessToken, id)
      .then(res => {
        alertify.success(res.data.message);
        dispatch({
          type: actions.DELETE_RECEIPT,
          payload: id
        });
      })
      .catch(({ response }) => {
        alertify.alert(
          "Error " + response.status + " - " + response.statusText,
          response.data.message
        );
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  filter = () => {
    let search = getSearchUrlFromState(this.state);
    this.getReceipts(search);
  };

  render() {
    let { id, status, page, totalPages, nookCode, space_type, number, email, month } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="2">
                    <i className="fa fa-align-justify" /> Receipts - Page {page}{" "}
                    of {totalPages}
                  </Col>

                  <Col md="10">
                    <InputGroup>
                      <Input
                        type="text"
                        placeholder="ID"
                        name="id"
                        onChange={this.onChange}
                        value={id}
                      />

                      <Input
                        type="text"
                        placeholder="Nook Code"
                        name="nookCode"
                        onChange={this.onChange}
                        value={nookCode}
                      />

                      <Input
                        type="text"
                        placeholder="User Number"
                        name="number"
                        onChange={this.onChange}
                        value={number}
                      />

                      <Input
                        type="text"
                        placeholder="Email"
                        name="email"
                        onChange={this.onChange}
                        value={email}
                      />

                      <Input
                        type="select"
                        placeholder="Nook Type"
                        name="space_type"
                        onChange={this.onChange}
                        value={space_type}
                      >
                        <option value="">Select Nook Type</option>
                        <option value="shared">Shared</option>
                        <option value="independent">Independent</option>
                      </Input>

                      <Input
                        type="select"
                        placeholder="Status"
                        name="status"
                        onChange={this.onChange}
                        value={status}
                      >
                        <option value="">Select Status</option>
                        <option value="draft">Draft</option>
                        <option value="unpaid">Unpaid</option>
                        <option value="in_progress">In Progress</option>
                        <option value="paid">Paid</option>
                      </Input>

                      <Input
                        type="select"
                        placeholder="Month"
                        name="month"
                        onChange={this.onChange}
                        value={month}
                      >
                        <option value="">Select Month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </Input>

                      <InputGroupAddon addonType="append">
                        <Button
                          type="button"
                          color="warning"
                          onClick={this.filter}
                        >
                          <i className="fa fa-filter" /> Filter
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive bordered striped>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Status</th>
                      <th>Total Amount</th>
                      <th>Due Date</th>
                      <th>Nook</th>
                      <th className ="text-center">Publish</th>
                      <th>User</th>
                      <th>Action</th> 
                      <th>Created At</th>
                      <th>Updated At</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderBody()}</tbody>
                </Table>

                <SimplePagination next={this.next} previous={this.previous} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    receipts: state.receipts.receipts
  };
};

const mapDispatchToProps = () => {
  return {
    getReceipts: (token, search) => actions.getReceipts(token, search),
    PublishRecept: (token, data) => actions.PublishRecept(token,data),
    deleteReceipt: (token, id) => actions.deleteReceipt(token, id)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Receipts);
