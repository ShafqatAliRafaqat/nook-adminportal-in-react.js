import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table
} from "reactstrap";
import Widget03 from "./Widgets/Widget03";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import * as actions from "./../Store/Actions/DashboardActions";
const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
const brandWarning = getStyle("--warning");
const brandDanger = getStyle("--danger");

// Card Chart 1
const cardChartData1 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandPrimary,
      borderColor: "rgba(255,255,255,.55)",
      data: [65, 59, 84, 84, 51, 55, 40]
    }
  ]
};

const cardBodyStyle = {
      minHeight: "100px",
    };
const cardStyle = {
      width: "110%",
    };

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent"
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent"
        }
      }
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5
        }
      }
    ]
  },
  elements: {
    line: {
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
};

// Card Chart 2
const cardChartData2 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandInfo,
      borderColor: "rgba(255,255,255,.55)",
      data: [1, 18, 9, 17, 34, 22, 11]
    }
  ]
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent"
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent"
        }
      }
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5
        }
      }
    ]
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
};

// Card Chart 3
const cardChartData3 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,255,255,.2)",
      borderColor: "rgba(255,255,255,.55)",
      data: [78, 81, 80, 45, 34, 12, 40]
    }
  ]
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        display: false
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
};

// Card Chart 4
const cardChartData4 = {
  labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,255,255,.3)",
      borderColor: "transparent",
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98]
    }
  ]
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  }
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: "facebook" },
  { data: [1, 13, 9, 17, 34, 41, 38], label: "twitter" },
  { data: [78, 81, 80, 45, 34, 12, 40], label: "linkedin" },
  { data: [35, 23, 56, 22, 97, 23, 64], label: "google" }
];

const makeSocialBoxData = dataSetNo => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        backgroundColor: "rgba(255,255,255,.1)",
        borderColor: "rgba(255,255,255,.55)",
        pointHoverBackgroundColor: "#fff",
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label
      }
    ]
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        display: false
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: "New Clients"
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: "Recurring Clients"
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: "Pageviews"
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: "Organic"
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: "CTR"
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: "Bounce Rate"
  }
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    datasets: [
      {
        backgroundColor: "transparent",
        borderColor: variant ? variant : "#c2cfd6",
        data: dataset.data,
        label: dataset.label
      }
    ]
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  },
  legend: {
    display: false
  }
};

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: [
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su"
  ],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      data: data1
    },
    {
      label: "My Second dataset",
      backgroundColor: "transparent",
      borderColor: brandSuccess,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      data: data2
    },
    {
      label: "My Third dataset",
      backgroundColor: "transparent",
      borderColor: brandDanger,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3
    }
  ]
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: "index",
    position: "nearest",
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return {
          backgroundColor:
            chart.data.datasets[tooltipItem.datasetIndex].borderColor
        };
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }
    ]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      shared      : '',
      family      : '',
      radioSelected: 2
    };
  }
  getData = () => {
    this.setState({
      isLoading: true
    });

    let { getData, dispatch, user, alertify } = this.props;

    getData(user.accessToken)
      .then(res => {
        this.setState({
          shared: res.data.shared,
          family: res.data.family
        });

        dispatch({
          type: actions.GET_DASHBOARD,
          payload: res.data
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
    this.getData();
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  render() {
    const {shared , family} = this.state;
    return (
      <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12" lg="12" className="mb-2">
          <h3> Shared Nooks</h3>
        </Col>
      </Row>
        <Row>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/nooks?space_type=shared`}>
            <Card style={cardStyle} className="text-white bg-info">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{shared.allBeds}</div>
                <div>Total Beds</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
            <Link to={`/nooks?space_type=shared&status=approved`}>
            <Card style={cardStyle} className="text-white bg-success" >
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{shared.rentedBeds}</div>
                <div>Occupied Beds</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
            <Link to={`/nooks?space_type=shared`}>
            <Card style={cardStyle} className="text-white bg-danger">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{shared.vacantBeds}</div>
                <div>Vacant Beds</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/bookings?space_type=shared&status=pending`}>
            <Card style={cardStyle} className="text-white bg-warning">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{shared.pendingBooking}</div>
                <div>Pending Bookings</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/bookings?space_type=shared&status=in_progress`}>
            <Card style={cardStyle} className="text-white bg-info">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{shared.inProgressBooking}</div>
                <div>In Progress Bookings</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to="#">
            <Card style={cardStyle} className="text-white bg-success">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{shared.inProgressVisits}</div>
                <div>In Progress Visits</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/complains?space_type=shared&status=pending`}>
            <Card style={cardStyle} className="text-white bg-danger">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{shared.pendingsComplaints}</div>
                <div>Pending Complaints</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/complains?space_type=shared&status=in_progress`}>
            <Card style={cardStyle} className="text-white bg-warning">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{shared.inProgressComplaints}</div>
                <div>In Progress Complaints</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/notices?space_type=shared&status=pending`}>
            <Card style={cardStyle} className="text-white bg-info">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{shared.pendingsNotice}</div>
                <div>Pending Notices</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/notices?space_type=shared&status=in_progress`}>
            <Card style={cardStyle} className="text-white bg-success">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{shared.inProgressNotice}</div>
                <div>In Progress Notices</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/shifts?space_type=shared&status=pending`}>
            <Card style={cardStyle} className="text-white bg-danger">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{shared.pendingsShifts}</div>
                <div>Pending Shifts</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/shifts?space_type=shared&status=in_progress`}>
            <Card style={cardStyle} className="text-white bg-warning">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{shared.inProgressShifts}</div>
                <div>In Progress Shifts</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to="#">
            <Card style={cardStyle} className="text-white bg-info">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{shared.pendingVisits}</div>
                <div>Pending Visits</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/transactions?space_type=shared`}>
            <Card style={cardStyle} className="text-white bg-success">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">Rs.{shared.payment}</div>
                <div>Payment</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
        </Row>
        <Row>
        <Col xs="12" sm="12" lg="12" className="mb-2">
        <h3>  Family Nooks</h3>
        </Col> 
      </Row>
        <Row>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/nooks?space_type=independent`}>
            <Card style={cardStyle} className="text-white bg-info">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{family.allNooks}</div>
                <div>Total Nooks</div>
              </CardBody>          
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/nooks?space_type=independent&status=approved`}>
            <Card style={cardStyle} className="text-white bg-success">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{family.rentedNooks}</div>
                <div>Occupied Nooks</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/nooks?space_type=independent`}>
            <Card style={cardStyle} className="text-white bg-danger">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{family.vacantNooks}</div>
                <div>Vacant Nooks</div>
              </CardBody>          
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/bookings?space_type=independent&status=pending`}>
            <Card style={cardStyle} className="text-white bg-warning">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{family.pendingNooks}</div>
                <div>Pending Booking</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/bookings?space_type=independent&status=in_progress`}>
            <Card style={cardStyle} className="text-white bg-info">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{family.inProgressNooks}</div>
                <div>In Progress Booking</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to="#">
            <Card style={cardStyle} className="text-white bg-success">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{family.inProgressVisits}</div>
                <div>In Progress Visits</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/complains?space_type=independent&status=pending`}>
            <Card style={cardStyle} className="text-white bg-danger">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{family.pendingsComplaints}</div>
                <div>Pending Complaints</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/complains?space_type=independent&status=in_progress`}>
            <Card style={cardStyle} className="text-white bg-warning">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{family.inProgressComplaints}</div>
                <div>In Progress Complaints</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/notices?space_type=independent&status=pending`}>
            <Card style={cardStyle} className="text-white bg-info">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{family.pendingsNotice}</div>
                <div>Pending Notices</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/notices?space_type=independent&status=in_progress`}>
            <Card style={cardStyle} className="text-white bg-success">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{family.inProgressNotice}</div>
                <div>In Progress Notices</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/shifts?space_type=independent&status=pending`}>
            <Card style={cardStyle} className="text-white bg-danger">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{family.pendingsShifts}</div>
                <div>Pending Shifts</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/shifts?space_type=independent&status=in_progress`}>
            <Card style={cardStyle} className="text-white bg-warning">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{family.inProgressShifts}</div>
                <div>In Progress Shifts</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to="#">
            <Card style={cardStyle} className="text-white bg-info">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">{family.pendingVisits}</div>
                <div>Pending Visits</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
          <Col xs="4" sm="2" lg="2">
          <Link to={`/transactions?space_type=independent`}>
            <Card style={cardStyle} className="text-white bg-success">
              <CardBody className="pb-0 text-center" style={cardBodyStyle}>
                <div className="text-value">Rs.{family.payment}</div>
                <div>Payment</div>
              </CardBody>
            </Card>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    shared: state.shared
  };
};

const mapDispatchToProps = () => {
  return {
    getData: (token) => actions.getData(token)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);