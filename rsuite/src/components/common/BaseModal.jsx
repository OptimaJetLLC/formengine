import React from "react";
import {Button, Modal } from "rsuite";

export default class BaseModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: true
      };
    }   

    onCancel = () => {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
      this.setState({ show: false });
    }

    render() {
      let { show, buttons, title, content, onCancel, ...props } = this.props;
      show = show ?? this.state.show;
      buttons = buttons || this.buttons || [];
      if (buttons[0] && !(buttons[0]?.type)) {
        buttons = buttons.map(({label, handler, ...props}) => (
          <Button onClick={handler} {...props}>
            {label}
          </Button>
        ))
      }

      return (
        <Modal backdrop={true} show={show} onHide={this.onCancel} {...props}>
            <Modal.Header>
              <Modal.Title>
                {this.title || this.props.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.content || this.props.content}
            </Modal.Body>
            <Modal.Footer>
              {buttons}
            </Modal.Footer>
          </Modal>
          
      );
    }
  }