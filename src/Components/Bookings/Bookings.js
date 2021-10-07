import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
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
import * as actions from "../../Store/Actions/BookingActions";
import NookDetailsModel from "../Nook/NookDetailsModel";
import UserDetailsModel from "../Users/UserDetailsModel";
import RoomDetailsModel from "../Rooms/RoomDetailsModel";
import UpdateBooking from "./UpdateBooking";
import CreateBooking from "./CreateBooking";

import { getSearchUrlFromState } from "../../util/functions";
import GenerateReceipt from "./GenerateReceipt";
import GenerateReceipt_01 from "./GenerateReceipt_01";
import AddSecurity from "./AddSecurity";

class Bookings extends Component {
  state = {
    id: "",
    status: "",
    nookCode: "",
    space_type: "",
    number: "",
    email: "",
    page: 0,
    totalPages: 0,
    isLoading: true
  };

  getBookings = search => {
    this.setState({
      isLoading: true
    });

    let { getBookings, dispatch, user, alertify } = this.props;

    getBookings(user.accessToken, search)
      .then(res => {
        this.setState({
          page: res.data.meta.current_page,
          totalPages: res.data.meta.last_page
        });

        dispatch({
          type: actions.GET_BOOKINGS,
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

    this.getBookings(search);
  }

  next = () => {
    let next = this.state.page + 1;
    if (next <= this.state.totalPages) {
      let search = getSearchUrlFromState(this.state);
      this.getBookings(search + "page=" + next);
    }
  };

  previous = () => {
    let previous = this.state.page - 1;
    if (previous > 0) {
      let search = getSearchUrlFromState(this.state);
      this.getBookings(search + "page=" + previous);
    }
  };

  renderEditCell = (isHead = true, booking = null) => {
    return isHead ? <th>Update</th> : <td>
      <UpdateBooking {...this.props} booking={booking} />
    </td>;
  };

  renderBody = () => {
    if (this.state.isLoading) {
      return;
    }

    return this.props.bookings.map(m => {
      return (
        <tr key={m.id}>
          <td>{m.id}</td>
          <td>
            {m.nook && <NookDetailsModel nook={m.nook} />}
          </td>
          <td>{m.status}</td>
          <td>{m.user && <UserDetailsModel user={m.user} />}</td>
          <td>{m.room && <RoomDetailsModel room={m.room} />}</td>
          <td>{m.rent} PKR</td>
          <td>{m.security} PKR</td>
          <td>{m.paidSecurity} PKR</td>
          <td>{m.refunedSecurity} PKR</td>
          <td>
            <GenerateReceipt_01 {...this.props} booking={m} />
            <Link className="btn btn-primary" to={`receipts?user_id=${m.user.id}`}>Old Receipts</Link>
          </td>
          <td><AddSecurity {...this.props} booking={m} /></td>
          {this.renderEditCell(false, m)}
          <td>{m.created_at}</td>
          <td>{m.updated_at}</td>
        </tr>
      );
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  filter = () => {
    let search = getSearchUrlFromState(this.state);
    this.getBookings(search);
  };

  render() {
    let { id, status, nookCode, space_type, number, email, page, totalPages } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="2">
                    <i className="fa fa-align-justify" /> Bookings - Page {page}{" "}
                    of {totalPages}
                  </Col>
                  <Col md="1">
                    <CreateBooking {...this.props} />
                  </Col>
                  <Col md="9">
                    <InputGroup>
                      <Input
                        type="text"
                        placeholder="Booking Id"
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
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="off-board">Moved</option>
                        <option value="cancelled">Cancelled</option>
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
                      <th>Nook</th>
                      <th>Status</th>
                      <th>User</th>
                      <th>Room</th>
                      <th>Rent</th>
                      <th>Security</th>
                      <th>Paid Security</th>
                      <th>Refuned Security</th>
                      <th>Receipts</th>
                      <th>Security</th>
                      {this.renderEditCell()}
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
    bookings: state.bookings.bookings
  };
};

const mapDispatchToProps = () => {
  return {
    getBookings: (token, search) => actions.getBookings(token, search)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
