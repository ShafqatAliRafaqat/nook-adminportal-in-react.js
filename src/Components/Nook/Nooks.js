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
  Table,
  CardImg
} from "reactstrap";

import SimplePagination from "../Common/SimplePagination";
import * as actions from "../../Store/Actions/NookActions";
import CreateNook from "./CreateNook";
import TextModel from "../Common/TextModel";

import { getSearchUrlFromState } from "../../util/functions";
import { Link } from "react-router-dom";
import EditNook from "./EditNook";
import NookDetailsModel from './NookDetailsModel';

class Nooks extends Component {
  state = {
    id: "",
    status: "",
    type: "",
    gender_type: "",
    description: "",
    facilities: "",
    nookCode: "",
    user_id: "",
    noOfBeds: 0,
    nook_id: "",
    page: 0,
    totalPages: 0,
    isLoading: true
  };

  getNooks = search => {
    this.setState({
      isLoading: true
    });

    let { getNooks, dispatch, user, alertify } = this.props;
    if (this.props.location.params) {
      let space_type = this.props.location.params;
      console.log("space_type=>",space_type);
    }
     console.log("search=>",search);
    getNooks(user.accessToken, search)
      .then(res => {
        this.setState({
          page: res.data.meta.current_page,
          totalPages: res.data.meta.last_page
        });

        dispatch({
          type: actions.GET_NOOKS,
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

    this.getNooks(search);
  }

  next = () => {
    let next = this.state.page + 1;
    if (next <= this.state.totalPages) {
      let search = getSearchUrlFromState(this.state);
      this.getNooks(search + "page=" + next);
    }
  };

  previous = () => {
    let previous = this.state.page - 1;
    if (previous > 0) {
      let search = getSearchUrlFromState(this.state);
      this.getNooks(search + "page=" + previous);
    }
  };

  renderBody = () => {
    if (this.state.isLoading) {
      return;
    }

    return this.props.nooks.map(m => {
      return (
        <tr key={m.id}>
          <td>{m.id}</td>
          <td>
            <Link to={`/medias?nook_id=${m.id}`} >
              <CardImg top style={{ width: '150px' }} src={m.medias[0].path} />
            </Link>
          </td>
          <td>
            <NookDetailsModel nook={m} />
          </td>
          <td>{m.type}</td>
          <td>{m.gender_type}</td>
          <td>{m.nookCode}</td>
          <td>{m.status}</td>
          <td>{m.number}</td>
          <td>
            <TextModel text={m.address} title="Address" />
          </td>
          <td>
            <EditNook {...this.props} nook={m} />
          </td>
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
    this.getNooks(search);
  };

  render() {
    let { id, nookCode, status, type, gender_type, space_type, facilities, page, totalPages } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="2">
                    <i className="fa fa-align-justify" /> Nooks - Page {page} of{" "}
                    {totalPages}
                  </Col>

                  <Col md="1.5">
                    <CreateNook {...this.props} />
                  </Col>

                  <Col md="8">
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
                        type="select"
                        placeholder="Status"
                        name="status"
                        onChange={this.onChange}
                        value={status}
                      >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="inProgress">In Progress</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </Input>

                      <Input
                        type="select"
                        placeholder="Nook Type"
                        name="space_type"
                        onChange={this.onChange}
                        value={space_type}
                      >
                        <option value="">Select Nook Type</option>
                        <option value="service">Service</option>
                        <option value="shared">Shared</option>
                        <option value="independent">Independent</option>
                      </Input>

                      <Input
                        type="select"
                        name="gender_type"
                        onChange={this.onChange}
                        value={gender_type}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="both">Both</option>
                      </Input>

                      <Input
                        type="select"
                        placeholder="Type"
                        name="type"
                        onChange={this.onChange}
                        value={type}
                      >
                        <option value="">Select type</option>
                        <option value="house">House</option>
                        <option value="flat">Flat</option>
                        <option value="upper_portion">Upper Portion</option>
                        <option value="lower_portion">Lower Portion</option>
                        <option value="farm_house">Farm House</option>
                        <option value="pent_house">Pent House</option>
                        <option value="independentRoom">Independent Room</option>
                        <option value="hostelBuilding">Hostel Building</option>
                        <option value="outHouse">Out House</option>
                        <option value="other">Other</option>
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
                      <th>Details</th>
                      <th>Type</th>
                      <th>Gender Type</th>
                      <th>Nook Code</th>
                      <th>Status</th>
                      <th>Number</th>
                      <th>Address</th>
                      <th>Edit</th>
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
    nooks: state.nooks.nooks
  };
};

const mapDispatchToProps = () => {
  return {
    getNooks: (token, search) => actions.getNooks(token, search)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nooks);
