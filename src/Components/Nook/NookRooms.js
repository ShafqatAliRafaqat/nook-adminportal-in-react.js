import React, { Component } from "react";

import {
    Button, Input,
    FormGroup, Row, Col,
    Card, CardBody, Label
} from 'reactstrap';

class NookRooms extends Component {


    defaultRoom = {
        "capacity": "",
        "noOfBeds": "",
        "price_per_bed": "",
        "room_number": ""
    };

    state = {
        rooms: [
            ...(this.props.rooms || [])
        ],
    };

    componentDidMount() {
        const { addDefaultRoom } = this.props;
        if (addDefaultRoom) {
            this.setState({
                rooms: [{...this.defaultRoom}]
            }, this.updateRooms);
        }
    }


    updateRooms = () => {
        const { onRoomsChange } = this.props;
        if (onRoomsChange) {
            onRoomsChange(this.state.rooms);
        }
    }

    onChange = ({ target: { value, name } }, index) => {
        const { rooms } = this.state;
        const newRooms = rooms.map((p, i) => {
            if (index === i) {
                return {
                    ...p,
                    [name]: value
                };
            }
            return p;
        });
        this.setState({
            rooms: newRooms
        }, this.updateRooms);
    };

    addRoom = () => {
        const { rooms } = this.state;
        this.setState({
            rooms: [
                ...rooms,
                { ...this.defaultRoom }
            ]
        }, this.updateRooms);
    }

    removeRoom = (index) => {
        const { rooms } = this.state;
        const updateRooms = rooms.filter((v, i) => i !== index);
        this.setState({ rooms: updateRooms }, this.updateRooms);
    };

    render() {
        const { rooms } = this.state;
        return (
            <React.Fragment>
                <FormGroup>
                    <Row>
                        <Col sm={{ size: 1, offset: 11 }}>
                            <Button
                                color="success"
                                onClick={this.addRoom}
                                className="mr-1"
                            >
                                <i className="fa fa-plus" />
                            </Button>
                        </Col>
                    </Row>
                </FormGroup>

                {rooms.map((p, i) => {
                    return (
                        <Card key={i + 1}>
                            <CardBody>
                                <FormGroup>
                                    <Row>
                                        <Col sm={{ size: 2 }}>
                                            <p>Room # {i + 1}</p>
                                        </Col>
                                        <Col sm={{ size: 1, offset: 9 }}>
                                            <Button
                                                color="link"
                                                onClick={() => this.removeRoom(i)}
                                                className="mr-1 text-danger"
                                            >
                                                <i className="fa fa-times" />
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={{ size: 3 }}>
                                            <Label htmlFor="capacity">Room Type</Label>
                                            <Input
                                                type="number"
                                                name="capacity"
                                                value={p.capacity}
                                                placeholder="Room Type"
                                                onChange={e => this.onChange(e, i)}
                                            />
                                        </Col>
                                        <Col sm={{ size: 3 }}>
                                            <Label htmlFor="noOfBeds">No Of Beds</Label>
                                            <Input
                                                type="number"
                                                name="noOfBeds"
                                                value={p.noOfBeds}
                                                placeholder="No Of Beds"
                                                onChange={e => this.onChange(e, i)}
                                            />
                                        </Col>
                                        <Col sm={{ size: 3 }}>
                                            <Label htmlFor="price_per_bed">Price Per Bed</Label>
                                            <Input
                                                type="number"
                                                name="price_per_bed"
                                                value={p.price_per_bed}
                                                placeholder="Price Per Bed"
                                                onChange={e => this.onChange(e, i)}
                                            />
                                        </Col>
                                        <Col sm={{ size: 3 }}>
                                            <Label htmlFor="room_number">Room Number</Label>
                                            <Input
                                                type="text"
                                                name="room_number"
                                                value={p.room_number}
                                                placeholder="Room Number"
                                                onChange={e => this.onChange(e, i)}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </CardBody>
                        </Card>
                    );
                })}

            </React.Fragment>
        );
    }
}

export default NookRooms;
