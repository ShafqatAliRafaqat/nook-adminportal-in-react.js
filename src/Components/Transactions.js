import React, { Component } from "react";
import { connect } from "react-redux";
import * as qs from 'query-string';
import {
  Card,
  CardBody,
  CardHeader,
  Col, Input, InputGroup, InputGroupAddon,
  Button,
  Row,
  Table,
} from "reactstrap";

import SimplePagination from "./Common/SimplePagination";
import * as actionsCreators from "../Store/Actions/GetTransactionsActions";
import { getSearchUrlFromState } from '../util/functions'
import UpdateTransaction from "./Transactions/UpdateTransaction";

class Transactions extends Component {

  state = {
    status: "",
    nookCode: "",
    space_type: "",
    number: "",
    email: "",
    page: 0,
    totalPages: 0,
    isLoading: true
  };

  getTransactions = (search) => {

    this.setState({
      isLoading: true
    });

    let { user, fetchData, dispatch, alertify } = this.props;

    fetchData(user.accessToken, search).then(res => {

      this.setState({
        page: res.data.meta.current_page,
        totalPages: res.data.meta.last_page,
      });

      dispatch({
        type: actionsCreators.GET_TRANSACTIONS,
        payload: res.data.data
      });

    }).catch(({ response }) => {
      alertify.alert('Error ' + response.status + ' - ' + response.statusText, response.data.message);
    }).finally(() => {
      this.setState({
        isLoading: false
      });

    });
  };

  componentDidMount() {

    let search = this.props.location.search;

    const params = qs.parse(search);

    if (params.payment_method) {
      this.setState({
        payment_method: params.payment_method
      });
    }

    this.getTransactions(search);
  }

  next = () => {
    let next = this.state.page + 1;
    if (next <= this.state.totalPages) {
      let search = getSearchUrlFromState(this.state);
      this.getTransactions(search + "page=" + next);
    }
  };

  previous = () => {
    let previous = this.state.page - 1;
    if (previous > 0) {
      let search = getSearchUrlFromState(this.state);
      this.getTransactions(search + "page=" + previous);
    }
  };

  renderEditCell = (isHead = true, transaction = null) => {
    return isHead ? <th>Update</th> : <td><UpdateTransaction {...this.props} transaction={transaction} /></td>;
  };

  renderBody = () => {

    if (this.state.isLoading) {
      return;
    }

    return this.props.transactions.map(tr => {

      return (<tr key={tr.id}>
        <td>{tr.id}</td>
        <td>{tr.status}</td>
        <td>{tr.amount} PKR</td>
        {/* <td>{tr.payment_method}</td> */}
        {this.renderEditCell(false, tr)}

        <td>{tr.created_at}</td>
        <td>{tr.updated_at}</td>


      </tr>);
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };


  filter = () => {
    let search = getSearchUrlFromState(this.state);
    this.getTransactions(search);
  };


  render() {

    let { status, nookCode, space_type, number, email, page, totalPages } = this.state;

    return (

      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="2">
                    <i className="fa fa-align-justify" /> Transactions - Page {page} of {totalPages}
                  </Col>
                  <Col md="10">
                    <InputGroup>


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

                      <Input type="select" name="status" onChange={this.onChange} value={status}>
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </Input>

                      <InputGroupAddon addonType="append">
                        <Button type="button" color="warning" onClick={this.filter}><i className="fa fa-filter" /> Filter</Button>
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
                      <th>Amount</th>
                      {this.renderEditCell()}
                      <th>Created At</th>
                      <th>Updated At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderBody()}
                  </tbody>
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

const mapDispatchToProps = () => {
  return {
    fetchData: (token, search) => actionsCreators.transactions(token, search)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Transactions);
