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
  CardImg,
  Table
} from "reactstrap";

import SimplePagination from "../Common/SimplePagination";
import * as actions from "../../Store/Actions/ComplainActions";
import NookDetailsModel from "../Nook/NookDetailsModel";
import UserDetailsModel from "../Users/UserDetailsModel";
import TextModel from "../Common/TextModel";
import { getSearchUrlFromState } from "../../util/functions";
import UpdateComplain from "./UpdateComplain";
import CreateComplain from "./CreateComplain";
import EditComplain from "./EditComplain";

class Complains extends Component {
  state = {
    id: "",
    status: "",
    type: '',
    nookCode: "",
    space_type: "",
    number: "",
    email: "",
    page: 0,
    totalPages: 0,
    isLoading: true
  };

  getComplains = search => {
    this.setState({
      isLoading: true
    });

    let { getComplains, dispatch, user, alertify } = this.props;

    getComplains(user.accessToken, search)
      .then(res => {
        this.setState({
          page: res.data.meta.current_page,
          totalPages: res.data.meta.last_page
        });

        dispatch({
          type: actions.GET_COMPLAINS,
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

    this.getComplains(search);
  }

  next = () => {
    let next = this.state.page + 1;
    if (next <= this.state.totalPages) {
      let search = getSearchUrlFromState(this.state);
      this.getComplains(search + "page=" + next);
    }
  };

  previous = () => {
    let previous = this.state.page - 1;
    if (previous > 0) {
      let search = getSearchUrlFromState(this.state);
      this.getComplains(search + "page=" + previous);
    }
  };

  renderEditCell = (isHead = true, complain = null) => {
    return isHead ? <th>Update</th> : <td>
      <UpdateComplain {...this.props} complain={complain} />
    </td>;
  };

  renderBody = () => {
    if (this.state.isLoading) {
      return;
    }

    return this.props.complains.map(m => {
      return (
        <tr key={m.id}>
          <td>{m.id}</td>
          <td><CardImg top style={{ width: '150px' }} src={m.media} /></td>
          <td>{m.type}</td>
          <td><TextModel text={m.description} title="Complain" /></td>
          <td>
            {m.nook && <NookDetailsModel nook={m.nook} />}
          </td>
          <td>{m.status}</td>
          <td>
            {m.complainAgainst && <UserDetailsModel user={m.complainAgainst} />}
          </td>
          <td>
            {m.complainFrom && <UserDetailsModel user={m.complainFrom} />}
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
    this.getComplains(search);
  };

  render() {
    let { id, status, type, nookCode, space_type, number, email, page, totalPages } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="2">
                    <i className="fa fa-align-justify" /> Complains/Services
                    Page {page}{" "} of {totalPages}
                  </Col>
                  <Col md="1">
                    <CreateComplain {...this.props} />
                  </Col>
                  <Col md="9">
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
                      </Input>

                      <Input
                        type="select"
                        placeholder="Type"
                        name="type"
                        onChange={this.onChange}
                        value={type}
                      >
                        <option value="">Select Type</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="car_wash">Car Wash</option>
                        <option value="delivery">Delivery</option>
                        <option value="security">Security</option>
                        <option value="charity_stuff">Charity Stuff</option>
                        <option value="staff_related">Staff Related</option>
                        <option value="privacy">Privacy</option>
                        <option value="internet">Internet</option>
                        <option value="food">Food</option>
                        <option value="cleaning">Cleaning</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="discipline">Discipline</option>
                        <option value="other">Other Support</option>
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
                      <th>Image</th>
                      <th>Type</th>
                      <th>Details</th>
                      <th>Nook</th>
                      <th>Status</th>
                      <th>Complain Against</th>
                      <th>Complain From</th>
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
    complains: state.complains.complains
  };
};

const mapDispatchToProps = () => {
  return {
    getComplains: (token, search) => actions.getComplains(token, search)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Complains);
