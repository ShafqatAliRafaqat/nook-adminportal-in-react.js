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
} from "reactstrap";
import DataTable from 'react-data-table-component';

import * as actions from "../../Store/Actions/ReceiptActions";

import { getSearchUrlFromState } from "../../util/functions";

const Export = ({ onExport }) => (
    <Button onClick={e => onExport(e.target.value)}>Export</Button>
);

class Receipts extends Component {
  state = {
    id: "",
    status: "",
    month: "",
    nookCode: "",
    space_type: "",
    number: "",
    email: "",
    type: '',
    page: 0,
    totalPages: 0,
    processing: false,
    isLoading: true,
    columns: [
        {
          name: 'ID',
          selector: 'id',
          sortable: true,
        },
        {
          name: 'Status',
          selector: 'status',
          sortable: true,
        },
        {
          name: 'Month',
          selector: 'month',
          sortable: true,
        },
        {
          name: 'Nook',
          selector: 'nook',
          sortable: true,
        },
        {
          name: 'UserId',
          selector: 'UserID',
          sortable: true,
        },
        {
          name: 'User',
          selector: 'user',
          sortable: true,
        },
        {
          name: 'Late day fine',
          selector: 'late_day_fine',
          sortable: true,
        },
        {
            name: 'Due Date',
            selector: 'due_date',
            sortable: true,
        },
        {
            name: 'Rent',
            selector: 'rent',
            sortable: true,
        },
        {
            name: 'Arrears',
            selector: 'arrears',
            sortable: true,
        },
        {
            name: 'E Units',
            selector: 'e_units',
            sortable: true,
        },
        {
            name: 'E Units cost',
            selector: 'e_unit_cost',
            sortable: true,
        },
        {
            name: 'Fine',
            selector: 'fine',
            sortable: true,
        },
        // {
        //     name: 'Extras',
        //     selector: 'extras',
        //     sortable: true,
        // },
        {
          name: 'Amount',
          selector: 'amount',
          sortable: true,
        },
        {
          name: 'Late Payment Charges',
          selector: 'latePaymentCharges',
          sortable: true,
        },
        {
          name: 'Total Amount',
          selector: 'total_amount',
          sortable: true,
        },
        {
          name: 'Received Amount',
          selector: 'received_amount',
          sortable: true,
        },
        {
          name: 'Remaining Payable',
          selector: 'remaining_payable',
          sortable: true,
        },
      ],
  };

  getReceipts = search => {
    this.setState({
      isLoading: true
    });

    let { getReceipts, dispatch, user, alertify } = this.props;

    getReceipts(user.accessToken, `${search}?all=1`)
      .then(res => {

        if(res.data.meta){
          this.setState({
            page: res.data.meta.current_page,
            totalPages: res.data.meta.last_page
          });
        }

        dispatch({
          type: actions.GET_RECEIPTS,
          payload: res.data.data
        });
      })
      .catch((error) => {
        const { response } = error;
        console.log('=================', error);
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

    this.getReceipts(search);
  }

  next = () => {
    let next = this.state.page + 1;
    if (next <= this.state.totalPages) {
      let search = getSearchUrlFromState(this.state);
      this.getReceipts(search + "page=" + next);
    }
  };

  previous = () => {
    let previous = this.state.page - 1;
    if (previous > 0) {
      let search = getSearchUrlFromState(this.state);
      this.getReceipts(search + "page=" + previous);
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  filter = () => {
    let search = getSearchUrlFromState(this.state);
    this.getReceipts(search);
  };

  // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
  convertArrayOfObjectsToCSV = (array) => {
    let result;
  
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(array[0]);
  
    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
  
    array.forEach(item => {
      let ctr = 0;
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter;
  
        result += item[key];
        
        ctr++;
      });
      result += lineDelimiter;
    });
  
    return result;
  }
  
   // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
   downloadCSV = (array) => {
    const link = document.createElement('a');
    let csv = this.convertArrayOfObjectsToCSV(array);
    if (csv == null) return;
  
    const filename = `receipts-${new Date().toString()}.csv`;
  
    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }
  
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }
  

  render() {
    let { id, status, page, totalPages, nookCode, space_type, number, email, month, columns } = this.state;

    const processedData = this.props.receipts.map(r => {

        const keys = Object.keys(r.extras || {});
    
        let total = 0;
        keys.forEach(key => {
            total += (r.extras[key])  
        });
        
        return {
            id:r.id,
            status:r.status,
            month:r.month,
            nook:r.nook ? r.nook.nookCode : '',
            UserID:r.user ? r.user.id : '',
            user:r.user ? r.user.name : '',
            late_day_fine:r.late_day_fine,
            due_date:r.due_date,
            rent:r.rent,
            arrears:r.arrears,
            e_units:r.e_units,
            e_unit_cost:r.e_unit_cost,
            fine:r.fine,
            extras:total,
            amount:r.amount,
            latePaymentCharges:r.latePaymentCharges,
            total_amount:r.total_amount,
            received_amount:r.received_amount,
            remaining_payable:r.remaining_payable,
        }
    });

    const actionsMemo = <Export onExport={() => this.downloadCSV(processedData)} />;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="2">
                    <i className="fa fa-align-justify" /> Receipts - Page {page}{" "}
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
                        <option value="draft">Draft</option>
                        <option value="unpaid">Unpaid</option>
                        <option value="in_progress">In Progress</option>
                        <option value="paid">Paid</option>
                      </Input>

                      <Input
                        type="select"
                        placeholder="Month"
                        name="month"
                        onChange={this.onChange}
                        value={month}
                      >
                        <option value="">Select Month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
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

                {(processedData.length > 0) && (
                  <DataTable
                    columns={columns}
                    data={processedData}
                    actions={actionsMemo}
                  />
                )}
                
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
    receipts: state.receipts.receipts
  };
};

const mapDispatchToProps = () => {
  return {
    getReceipts: (token, search) => actions.getReceipts(token, search),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Receipts);
