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
import * as actions from "../../Store/Actions/NotificationActions";
import UserDetailsModel from "../Users/UserDetailsModel";
import CreateNotification from "./CreateNotification";

import { getSearchUrlFromState } from "../../util/functions";

class Notifications extends Component {

  state = {
    id: "",
    title: "",
    body: "",
    user_id: '',
    page: 0,
    totalPages: 0,
    isLoading: true
  };

  getNotifications = search => {
    this.setState({
      isLoading: true
    });

    let { getNotifications, dispatch, user, alertify } = this.props;

    getNotifications(user.accessToken, search)
      .then(res => {
        this.setState({
          page: res.data.meta.current_page,
          totalPages: res.data.meta.last_page
        });

        dispatch({
          type: actions.GET_NOTIFICATIONS,
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

    this.getNotifications(search);
  }

  next = () => {
    let next = this.state.page + 1;
    if (next <= this.state.totalPages) {
      let search = getSearchUrlFromState(this.state);
      this.getNotifications(search + "page=" + next);
    }
  };

  previous = () => {
    let previous = this.state.page - 1;
    if (previous > 0) {
      let search = getSearchUrlFromState(this.state);
      this.getNotifications(search + "page=" + previous);
    }
  };

  renderBody = () => {
    if (this.state.isLoading) {
      return;
    }

    return this.props.notifications.map(m => {
      return (
        <tr key={m.id}>
          <td>{m.id}</td>
          <td>{m.title}</td>
          <td>{m.body}</td>
          <td>
            {m.user && <UserDetailsModel user={m.user} />}
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
    this.getNotifications(search);
  };

  render() {
    let { id, title, body, page, totalPages } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="2">
                    <i className="fa fa-align-justify" /> Notifications - Page {page} of{" "}
                    {totalPages}
                  </Col>

                  <Col md="1.5">
                    <CreateNotification {...this.props} />
                  </Col>

                  <Col md="5">
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
                        placeholder="Title"
                        name="title"
                        onChange={this.onChange}
                        value={title}
                      />
                      
                      <Input
                        type="text"
                        placeholder="Body"
                        name="body"
                        onChange={this.onChange}
                        value={body}
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
                      <th>Title</th>
                      <th>Body</th>
                      <th>User</th>
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
    notifications: state.notifications.notifications
  };
};

const mapDispatchToProps = () => {
  return {
    getNotifications: (token, search) => actions.getNotifications(token, search)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
