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
      show = _.isUndefined(show)
        ? this.state.show
        : show;
      buttons = buttons || this.buttons || [];

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
              {buttons.map(({label, handler, ...props}) => (
                <Button onClick={handler} {...props}>
                  {label}
                </Button>
              ))}
            </Modal.Footer>
          </Modal>
          
      );
    }
  }