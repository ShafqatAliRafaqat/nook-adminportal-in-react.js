import React, { Component } from "react";

import {
  Row, Col, Label, Input, FormGroup
} from 'reactstrap';
import UserSelect from "../Users/UserSelect";
import Select from 'react-select'
import { can } from '../../util/functions';

const spaceTypes = {
  "": "",
  'Shared': 'shared',
  'Independent': 'independent',
  'Service': 'service',
}

const statuses = {
  "": "",
  'Pending': 'pending',
  'In Progress': 'inProgress',
  'Approved': 'approved',
  'Rejected': 'rejected',
};

const types = {
  "": "",
  'House': 'house',
  'Flat': 'flat',
  'Independent Room': 'independentRoom',
  'Hostel Building': 'hostelBuilding',
  'Out House': 'outHouse',
  'Other': 'other',
}

const nookTypes = {
  "": "",
  'Male': 'male',
  'Female': 'female',
  'Both': 'both',
};

class NookForm extends Component {

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

  onFacilitiesChange = (facilities) => {
    let fes = facilities.map(f => f.value);
    this.onChange({
      target: {
        name: "facilities",
        value: fes,
      }
    });
  }

  onPartnerChange = (partners) => {
    
    if (partners.length > 0) {
      const partner = partners[0];
      this.onChange({
        target: {
          name: "partner_id",
          value: partner.id,
        }
      });
    }
  }

  renderFamilyNooks = () => {
    const {
      space_type,
      area,
      area_unit,
      inner_details,
      other,
      furnished,
      rent,
      security,
      agreementCharges,
      agreementTenure,
    } = this.state;
    if (space_type == 'independent') {
      return (
        <React.Fragment>
          <FormGroup>
            <Row>
              <Col xs="12" sm="4">
                <Label htmlFor="area">Area*</Label>
                <Input type="text" name="area" placeholder="Area" value={area} onChange={this.onChange} />
              </Col>
              <Col xs="12" sm="4">
                <Label htmlFor="area_unit">Area Unit*</Label>
                <Input type="select" name="area_unit" onChange={this.onChange} value={area_unit}>
                  <option value="">Select Area Unit</option>
                  <option value="Marla">Marla</option>
                  <option value="Sq feet">Sq feet</option>
                </Input>
              </Col>
              <Col xs="12" sm="4">
                <Label htmlFor="furnished">Furnished*</Label>
                <Input type="select" name="furnished" onChange={this.onChange} value={furnished}>
                  <option value="">Select Furnished</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </Input>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="3">
                <Label htmlFor="rent">Rent*</Label>
                <Input type="text" name="rent" placeholder="Rent" value={rent} onChange={this.onChange} />
              </Col>
              <Col xs="12" sm="3">
                <Label htmlFor="security">Security*</Label>
                <Input type="text" name="security" placeholder="Security" value={security} onChange={this.onChange} />
              </Col>
              <Col xs="12" sm="3">
                <Label htmlFor="agreementCharges">Agreement Charges*</Label>
                <Input type="text" name="agreementCharges" placeholder="Agreement Charges" value={agreementCharges} onChange={this.onChange} />
              </Col>
              <Col xs="12" sm="3">
                <Label htmlFor="agreementTenure">Agreement Tenure*</Label>
                <Input type="select" name="agreementTenure" onChange={this.onChange} value={agreementTenure}>
                  <option value="">Select Agreement Tenure</option>
                  <option value="6 Monhts">6 Monhts</option>
                  <option value="1 Year">1 Year</option>
                  <option value="1.5 Years">1.5 Years</option>
                  <option value="2 Years">2 Years</option>
                  <option value="2.5 Years">2.5 Years</option>
                  <option value="3 Years">3 Years</option>
                </Input>
              </Col>
            </Row>

            <Row>
              <Col xs="12" sm="6">
                <Label htmlFor="">Inner Details*</Label>
                <Input type="textarea" name="inner_details" placeholder="Inner Details" value={inner_details} onChange={this.onChange} />
              </Col>
              <Col xs="12" sm="6">
                <Label htmlFor="">Other Details*</Label>
                <Input type="textarea" name="other" placeholder="Other Details" value={other} onChange={this.onChange} />
              </Col>
            </Row>
          </FormGroup>
        </React.Fragment>
      );
    }
  }

  render() {

    let {partner, type, space_type, gender_type, status, nookCode, description, facilities, video_url, number, country, state, city, zipCode, address, partner_id, securityPercentage, rooms,noOfBeds } = this.state;
    if(facilities != null){
      if (facilities.length != 0) {
        facilities = facilities.map(f => ({ value: f, label: f }));  
      }
    }
    const allFacilities = [
      "TV", "AC", "wifi",
      "Furniture", "Kitchen", "Kitchen Accessories",
      "Electronic Iron", "Gas Bill", "Water Bill",
      "Parking", "Transport", "Oven",
      "Cable", "Laundry", "Food",
      "Fridge", "Security Guard", "CCTV",
      "Water Filter", "UPS", "Lounge",
      "Hot Water", "House Keeping", "Generator",
    ].map(f => ({ value: f, label: f }));

    return (
      <React.Fragment>
        <FormGroup>
          <Row>

            <Col xs="12" sm="4">
              <Label htmlFor="space_type">Space Type*</Label>
              <Input type="select" name="space_type" onChange={this.onChange} value={space_type}>
                <option value="" >Select Space Type</option>
                <option value="shared" >Shared</option>
                <option value="independent" >Independent</option>
                <option value="service" >Service</option>
              </Input>
            </Col>

            <Col xs="12" sm="4">
              <Label htmlFor="type">Type*</Label>
              <Input type="select" name="type" onChange={this.onChange} value={type}>
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
            </Col>

            <Col xs="12" sm="4">
              <Label htmlFor="gender_type">Gender Type*</Label>
              <Input type="select" name="gender_type" onChange={this.onChange} value={gender_type}>
                <option value="" >Select Gender Type</option>
                <option value="male" >Male</option>
                <option value="female" >Female</option>
                <option value="both" >Both</option>
              </Input>
            </Col>
          </Row>
        </FormGroup>


        {this.renderFamilyNooks()}

        <FormGroup>
          <Row>
            <Col xs="12" sm="6">
              <Label htmlFor="nookCode">Nook Code*</Label>
              <Input type="text" name="nookCode" placeholder="Nook Code" value={nookCode} onChange={this.onChange} />
            </Col>

            <Col xs="12" sm="6">
              <Label htmlFor="status">Status*</Label>
              <Input type="select" name="status" onChange={this.onChange} value={status}>
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="inProgress">In Progress</option>
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
            <Col xs="12" sm="6">
              <Label htmlFor="video_url">Video Url*</Label>
              <Input type="text" name="video_url" placeholder="Video Url" value={video_url} onChange={this.onChange} />
            </Col>
            <Col xs="12" sm="6">
              <Label htmlFor="number">Number*</Label>
              <Input type="text" name="number" placeholder="e.g 03001234123" value={number} onChange={this.onChange} />
            </Col>
          </Row>
        </FormGroup>

        <FormGroup>
          <Row>
            <Col xs="12" sm="3">
              <Label htmlFor="country">Country*</Label>
              <Input type="text" name="country" placeholder="Country" value={country} onChange={this.onChange} />
            </Col>
            <Col xs="12" sm="3">
              <Label htmlFor="state">State*</Label>
              <Input type="state" name="state" placeholder="e.g Punjab" value={state} onChange={this.onChange} />
            </Col>
            <Col xs="12" sm="3">
              <Label htmlFor="city">City*</Label>
              <Input type="city" name="city" placeholder="e.g Lahore" value={city} onChange={this.onChange} />
            </Col>
            <Col xs="12" sm="3">
              <Label htmlFor="zipCode">Zip Code*</Label>
              <Input type="zipCode" name="zipCode" placeholder="e.g Zip Code" value={zipCode} onChange={this.onChange} />
            </Col>
          </Row>
        </FormGroup>


        <FormGroup>
          <Row>
            <Col xs="12" sm="8">
              <Label htmlFor="selectManagers">Partner</Label>
              <UserSelect name="Select Partner" users={(partner) ? [partner] : []} {...this.props} isMulti={false} onChange={this.onPartnerChange} placeholder="Select Partner" />
            </Col>
            {
              (space_type === 'shared') && (
                <Col xs="12" sm="4">
                  <Label htmlFor="securityPercentage">Security Percentage*</Label>
                  <Input type="number" name="securityPercentage" placeholder="e.g 200" value={securityPercentage} onChange={this.onChange} />
                </Col>
              )
            }
            {
              (space_type === 'service') && (
                <Col xs="12" sm="4">
                  <Label htmlFor="noOfBeds">No of Beds*</Label>
                  <Input type="number" name="noOfBeds" placeholder="Enter No Of Beds" value={noOfBeds} onChange={this.onChange} />
                </Col>
              )
            }
          </Row>
        </FormGroup>

        <FormGroup>
          <Row>
            <Col xs="12" sm="12">
              <Label htmlFor="facilities">Facilities</Label>
              <Select
                isMulti
                name="Facilities"
                className="basic-multi-select"
                classNamePrefix="select"
                defaultValue={facilities}
                options={allFacilities}
                onChange={this.onFacilitiesChange}
              />
            </Col>
          </Row>
        </FormGroup>

        <FormGroup>
          <Row>
            <Col xs="12" sm="12">
              <Label htmlFor="address">Address*</Label>
              <Input type="textarea" name="address" placeholder="Address" value={address} onChange={this.onChange} />
            </Col>
          </Row>
        </FormGroup>
      </React.Fragment>
    );
  }

}

export default NookForm;
