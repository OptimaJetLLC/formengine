import React from "react";
import {Button, Icon, Modal } from "rsuite";
import BaseModal from "./BaseModal"

export default class Confirm extends BaseModal {
    constructor(props) {
      super(props);
      this.buttons = [
        { label: WFEServerLang.button.ok, handler: this.onConfirm, appearance: "primary" },        
      ];
      if (!props.onlyOK){
        this.buttons.push(
          { label: WFEServerLang.button.cancel, handler: this.onCancel, appearance: "subtle" }
        );
      }
      this.title = this.props.title || <>
        <Icon
          icon="remind"
          style={{
            color: '#ffb300',
            fontSize: 18
          }}/>&nbsp; Confirm
      </>;
    }
    
    onConfirm = () => {
      if (this.props.onConfirm) {
        this.props.onConfirm();
      }
      this.setState({ show: false });
    }
  }