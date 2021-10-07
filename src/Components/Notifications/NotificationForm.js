import React, {Component} from "react";

import {
  FormGroup,
  Input,
  Label,
  Col
} from 'reactstrap';

import UserSelect from "../Users/UserSelect";

class NotificationForm extends Component {

  state = {
    ...this.props
  };

  onChange = e => {
    const {onChange} = this.props;
    this.setState({
      [e.target.name]: e.target.value
    });
    onChange(e);
  };

  onUserhange = (users) => {
    if (users.length > 0) {
      const user = users[0];
      this.onChange({
        target: {
          name: "user_id",
          value: user.id,
        }
      });
    }
  }

  render(){
    const {title, body} = this.state;
    return (
      <React.Fragment>
        <FormGroup>
          <Label htmlFor="title">Title*</Label>
          <Input type="text" name="title" placeholder="Title" value={title} onChange={this.onChange} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="body">Body*</Label>
          <Input type="textarea" name="body" placeholder="Body" value={body} onChange={this.onChange} />
        </FormGroup>
       
        <FormGroup>
        <Label htmlFor="selectManagers">User</Label>
            <UserSelect name="Select user" users={[]} {...this.props} isMulti={false} onChange={this.onUserhange} placeholder="Select User" />
        </FormGroup>

      </React.Fragment>
    );
  }
}

export default NotificationForm;
