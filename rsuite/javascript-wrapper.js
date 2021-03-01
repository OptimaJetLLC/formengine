import React from "react";
import ReactDOM from "react-dom";
import { RegisterLicense } from "optimajet-builder-shared";
import { FormBuilder, Form } from "./index";

window.OptimaJetFormBuilderLicense = function(key){
  RegisterLicense(key);
};

window.OptimaJetFormBuilder = function(settings){
  var me = this;
  this.Settings = settings;

  this.load = function(model){
    this.builder.load(model);
  };

  ReactDOM.render(
      <FormBuilder
        actions={settings.actions}
        getFormFunc={settings.getFormFunc}
        getAdditionalDataForControl={settings.getAdditionalDataForControl}
        ref={(builder) => { me.builder = builder; }}
        downloadUrl={settings.downloadUrl}
        uploadUrl={settings.uploadUrl}
        templates={settings.templates}
        />,
      settings.container
  );    
}

window.OptimaJetForm = function FormBuilder(settings){
  var me = this;
  this.Settings = settings;

  this.load = function(model){
    this.form.load(model);
  };

  this.getData = function(){
    return this.form.state.data;
  };

  this.setData = function(data){
    this.form.setData(data);
  };

  this.setModel = function(model){
    this.setState(model);
  };

  this.getModel = function(){
    return this.form.state.model;
  };


  this.print = function(title){
    this.form.print(title);
  };

  this.eventFunc = function(args){
    if(settings.onInitialData){
      if(Array.isArray(args.actions) && args.actions.includes("initSystem") && 
              args.parameters && args.parameters["initialData"])
        {
            var initialData = args.parameters["initialData"];
            settings.onInitialData(initialData);
        }
    }
    return settings.eventFunc && settings.eventFunc(args);
  }

  ReactDOM.render(
      <Form
        getFormFunc={settings.getFormFunc}
        getAdditionalDataForControl={settings.getAdditionalDataForControl}
        eventFunc={this.eventFunc}
        ref={(form) => { me.form = form }}
        downloadUrl={settings.downloadUrl}
        uploadUrl={settings.uploadUrl}
        dataChanged={(form, args) => {
          return settings.dataChanged && settings.dataChanged(form, args);
        }}
        />,
      settings.container
  );    
}

