import React, { Component } from "react";

import {
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal,
  Table
} from "reactstrap";

class TextModel extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isOpen } = this.state;
    const {text, title} = this.props;

    return (
      <React.Fragment>
        <Button color="link" className="text-primary" onClick={this.toggle}>
          {title}
        </Button>
        <Modal isOpen={isOpen} toggle={this.toggle} className="modal-primary">
          <ModalHeader toggle={this.toggle}>
            <i className="fa fa-eye" /> {title}
          </ModalHeader>
          <ModalBody>
              <p>{text}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default TextModel;
