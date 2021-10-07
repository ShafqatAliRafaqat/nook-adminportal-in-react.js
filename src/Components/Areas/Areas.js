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
import * as actions from "../../Store/Actions/AreaActions";
import TextModel from "../Common/TextModel";
import AddArea from "./AddArea";
import EditArea from "./EditArea";

import { getSearchUrlFromState } from "../../util/functions";
import { Link } from "react-router-dom";

class Areas extends Component {
  state = {
    id: "",
    areas: [],
    area: '',
    page: 0,
    totalPages: 0,
    isLoading: true
  };

  getAreas = search => {
    this.setState({
      isLoading: true
    });

    let { getAreas, dispatch, user, alertify } = this.props;
    
    getAreas(user.accessToken, search)
      .then(res => {
        this.setState({
          areas:res.data.data,
          page: res.data.meta.current_page,
          totalPages: res.data.meta.last_page
        });

        dispatch({
          type: actions.GET_AREA,
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
  
  deleteArea = (id) => {
    let { deleteArea, dispatch, user, alertify } = this.props;
    
    deleteArea(user.accessToken, id)
      .then(res => {
        alertify.success(res.data.message);
        dispatch({
          type: actions.DELETE_AREA,
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

    this.getAreas(search);
  }

  next = () => {
    let next = this.state.page + 1;
    if (next <= this.state.totalPages) {
      let search = getSearchUrlFromState(this.state);
      this.getAreas(search + "page=" + next);
    }
  };

  previous = () => {
    let previous = this.state.page - 1;
    if (previous > 0) {
      let search = getSearchUrlFromState(this.state);
      this.getAreas(search + "page=" + previous);
    }
  };

  renderBody = () => {
    if (this.state.isLoading) {
      return;
    }
    if (this.state.areas.length ==0) {
      return;
    }
    return this.props.areas.map(m => {
      return (
        <tr key={m.id}>
          <td>{m.id}</td>
          <td>{m.area}</td>
          <td>
            {(m.sub_area)? m.sub_area.map( (sb,i) => {
                return  <ul key={i}>
                          <li>{sb.name}</li>
                        </ul>
              })
              :"No Sub Area"
            }
          </td>
          <td>
            {(m.sub_area)? m.sub_area.map( (sb,i) => {
                return  <tr>
                            {(sb.locations)? sb.locations.map( (l,i) => {
                                return  <ul key={i}>
                                          <li>
                                            {l.name}
                                          </li>
                                        </ul>
                              })
                              :"No Block"
                            }
                            </tr>
              })
              :"No Block"
            }
          </td>
          <td className="text-center">
            <EditArea {...this.props} area={m} />
            <Button color="danger" onClick={ () => { if (window.confirm('Are you sure you want to delete this area?')) this.deleteArea(m.id) }} className="mr-1">
              <i className="fa fa-trash" /> Delete
            </Button>
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
    this.getAreas(search);
  };

  render() {
    let { id, area, page, totalPages } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="2">
                    <i className="fa fa-align-justify" /> Area - Page {page} of{" "}
                    {totalPages}
                  </Col>

                  <Col md="1.5">
                  <AddArea {...this.props} />
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
                        placeholder="Area Name"
                        name="area"
                        onChange={this.onChange}
                        value={area}
                      />
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
                      <th>Area</th>
                      <th>Sub Area</th>
                      <th>Block</th>
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
    areas: state.areas.areas
  };
};

const mapDispatchToProps = () => {
  return {
    getAreas: (token, search) => actions.getAreas(token, search),
    deleteArea: (token, id) => actions.deleteArea(token, id)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Areas);
