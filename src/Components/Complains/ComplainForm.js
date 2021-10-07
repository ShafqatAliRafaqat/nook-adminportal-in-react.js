import React, { Component } from "react";

import {
  Row, Col, Label, Input, FormGroup, Button
} from 'reactstrap';
import UserSelect from "../Users/UserSelect";
import Select from 'react-select'
import { can } from '../../util/functions';

class ComplainForm extends Component {

  state = {
    ...this.props,
  };

  onChange = e => {
    const { onChange } = this.props;
    this.setState({
      [e.target.name]: e.target.value
    });
    onChange(e);
  };

  ability = p => {
    let { permissions: prs } = this.props;
    return can(p, prs);
  };

//   onPartnerChange = (partners) => {
//     if (partners.length > 0) {
//       const partner = partners[0];
//       this.onChange({
//         target: {
//           name: "partner_id",
//           value: partner.id,
//         }
//       });
//     }
//   }
  onUserChange = (users) => {
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
  onImageChange = e => {

    const file = e.target.files[0];
     
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  };
  _handleReaderLoaded = (e) =>{
      let binaryString = e.target.result;
      this.onChange({
        target: {
          name: "image",
          value: btoa(binaryString)
        }
      });
  }
  inputClick = () => {
    this.fInput.click()
  };

  render() {

    let { type, status, description, partner_id, user_id, image} = this.state;
    let image_path = (image)?"data:image/png;base64,"+image:'';
    const {upBtnSize} = this.props;
    return (
      <React.Fragment>
        <FormGroup>
          <Row>

            <Col xs="12" sm="6">
              <Label htmlFor="type">Type*</Label>
              <Input type="select" name="type" onChange={this.onChange} value={type}>
                <option value="">Select type</option>
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
            </Col>
            <Col xs="12" sm="6">
              <Label htmlFor="status">Status*</Label>
              <Input type="select" name="status" onChange={this.onChange} value={status}>
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </Input>
            </Col>
          </Row>
        </FormGroup>

        <FormGroup>
          <Row>
            <Col xs="12" sm="12">
              <Label htmlFor="description">Description</Label>
              <Input type="textarea" name="description" placeholder="Description" value={description} onChange={this.onChange} />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs="12" sm="12">
              <Label htmlFor="selectManagers">Complain From</Label>
              <UserSelect name="Select User" users={(this.props.partner) ? [this.props.partner] : []} {...this.props} isMulti={false} onChange={this.onUserChange} placeholder="Complain From" />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row className='uploadArea' onClick={this.inputClick}>
            <input style={{display:'none'}} type="file" onChange={this.onImageChange} ref={fInput => this.fInput = fInput} accept=".jpeg, .png, .jpg"/>
            <Col xs="6" sm="6" className="text-center">
              <Button block color="success" size={upBtnSize}  className="btn-pill mt-3"> <i className="fa fa-upload"/> Upload</Button>
              <p style={{color:"#6D7987",fontSize:"12px", marginTop:"5px"}}>Size 400x200</p>
            </Col>
            <Col xs="6" sm="6" className="text-center">
                <img className="img img-responsive" style={{width:'100%'}} src={image_path}/>
            </Col>
          </Row>
        </FormGroup>
      </React.Fragment>
    );
  }

}

export default ComplainForm;
