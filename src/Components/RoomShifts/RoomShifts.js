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
import * as actions from "../../Store/Actions/RoomShiftsActions";

import NookDetailsModel from "../Nook/NookDetailsModel";
import UserDetailsModel from "../Users/UserDetailsModel";
import TextModel from "../Common/TextModel";
import UpdateShift from "./UpdateRoomShifts";
import { getSearchUrlFromState } from "../../util/functions";

class RoomShifts extends Component {
  state = {
    id: "",
    status: "",
    details: "",
    room_type: "",
    price_per_bed: "",
    nookCode: "",
    space_type: "",
    number: "",
    email: "",
    page: 0,
    totalPages: 0,
    isLoading: true
  };

  getRoomShifts = search => {
    this.setState({
      isLoading: true
    });

    let { getRoomShifts, dispatch, user, alertify } = this.props;

    getRoomShifts(user.accessToken, search)
      .then(res => {
        this.setState({
          page: res.data.meta.current_page,
          totalPages: res.data.meta.last_page,
        });
        dispatch({
          type: actions.GET_ROOM_SHIFTS,
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
    this.getRoomShifts(search);
  }

  next = () => {
    let next = this.state.page + 1;
    if (next <= this.state.totalPages) {
      let search = getSearchUrlFromState(this.state);
      this.getRoomShifts(search + "page=" + next);
    }
  };

  previous = () => {
    let previous = this.state.page - 1;
    if (previous > 0) {
      let search = getSearchUrlFromState(this.state);
      this.getRoomShifts(search + "page=" + previous);
    }
  };

  renderEditCell = (isHead = true, shift = null) => {
    return isHead ? <th>Update</th> : <td>
      <UpdateShift {...this.props} shift={shift} />
    </td>;
  };

  renderBody = () => {
    if (this.state.isLoading) {
      return;
    }
    return this.props.room_shifts.map(m => {
      return (
        <tr key={m.id}>
          <td>{m.id}</td>
          <td>{m.nook && <NookDetailsModel nook={m.nook} />}</td>
          <td>
            <TextModel text={m.details} title="Shift" />
          </td>
          <td>{m.room_type} Person Sharing</td>
          <td>{m.price_per_bed}</td>
          <td>{m.status}</td>
          <td>{m.user && <UserDetailsModel user={m.user} />}</td>
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
    this.getRoomShifts(search);
  };

  render() {
    let { id, status, room_type, price_per_bed, nookCode, space_type, number, email, page, totalPages } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="2">
                    <i className="fa fa-align-justify" /> Room Shifts - Page {page}{" "}
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
                        placeholder="Price Per Bed"
                        name="price_per_bed"
                        onChange={this.onChange}
                        value={price_per_bed}
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
                      </Input>

                      <Input
                        type="select"
                        placeholder="Room Type"
                        name="room_type"
                        onChange={this.onChange}
                        value={room_type}
                      >
                        <option value="">Select Room Type</option>
                        <option value="1">One Person Sharing</option>
                        <option value="2">Two Person Sharing</option>
                        <option value="3">Three Person Sharing</option>
                        <option value="4">Four Person Sharing</option>
                        <option value="5">Six Person Sharing</option>
                        <option value="6">Seven Person Sharing</option>
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
                      <th>Details</th>
                      <th>Room Sharing</th>
                      <th>Price Per Bed</th>
                      <th>Status</th>
                      <th>User</th>
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
    room_shifts: state.room_shifts.room_shifts
  };
};

const mapDispatchToProps = () => {
  return {
    getRoomShifts: (token, search) => actions.getRoomShifts(token, search)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomShifts);
