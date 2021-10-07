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
import * as actions from "../../Store/Actions/NoticeActions";

import NookDetailsModel from "../Nook/NookDetailsModel";
import UserDetailsModel from "../Users/UserDetailsModel";
import TextModel from "../Common/TextModel";

import { getSearchUrlFromState } from "../../util/functions";
import UpdateComplain from "../Complains/UpdateComplain";
import UpdateNotice from "./UpdateNotice";

class Notices extends Component {
  state = {
    id: "",
    status: "",
    details: "",
    nookCode: "",
    space_type: "",
    number: "",
    email: "",
    page: 0,
    totalPages: 0,
    isLoading: true
  };

  getNotices = search => {
    this.setState({
      isLoading: true
    });

    let { getNotices, dispatch, user, alertify } = this.props;

    getNotices(user.accessToken, search)
      .then(res => {
        this.setState({
          page: res.data.meta.current_page,
          totalPages: res.data.meta.last_page
        });

        dispatch({
          type: actions.GET_NOTICE,
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
    this.getNotices(search);
  }

  next = () => {
    let next = this.state.page + 1;
    if (next <= this.state.totalPages) {
      let search = getSearchUrlFromState(this.state);
      this.getNotices(search + "page=" + next);
    }
  };

  previous = () => {
    let previous = this.state.page - 1;
    if (previous > 0) {
      let search = getSearchUrlFromState(this.state);
      this.getNotices(search + "page=" + previous);
    }
  };

  renderEditCell = (isHead = true, notice = null) => {
    return isHead ? <th>Update</th> : <td>
      <UpdateNotice {...this.props} notice={notice} />
    </td>;
  };
  renderBody = () => {
    if (this.state.isLoading) {
      return;
    }

    return this.props.notices.map(m => {
      return (
        <tr key={m.id}>
          <td>{m.id}</td>
          <td>
            {m.nook && <NookDetailsModel nook={m.nook} />}
          </td>
          <td><TextModel text={m.details} title="Notice" /></td>
          <td>{m.status}</td>
          <td>
            {m.user && <UserDetailsModel user={m.user} />}
          </td>
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
    this.getNotices(search);
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
                    <i className="fa fa-align-justify" /> Notices - Page {page}{" "}
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
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        {/* <option value="cancelled">Cancelled</option> */}
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
    notices: state.notices.notices
  };
};

const mapDispatchToProps = () => {
  return {
    getNotices: (token, search) => actions.getNotices(token, search)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notices);
