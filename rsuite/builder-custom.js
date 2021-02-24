import React from "react";
import ReactDOM from "react-dom";
import { FormBuilder } from "./index";
import { FormBuilderControls, Window } from "./index";
import { NewControlSetting } from "./samples/controls/customcontrolsample";
import $ from "jquery";
import { RegisterLicense } from "optimajet-builder-shared";

//RegisterLicense("<your license key>");


function getform(formname)
{
  var formurl = formname + ".json";
  var source = $.ajax({
    url: formurl,
    async: false,
  }).responseJSON;
  return source;
}

function getAdditionalDataForControl(control,
    {startIndex, pageSize, filters, sort, model},
    callback)
  {
    if(control.props["data-buildertype"] == "dictionary"){
      if(model == undefined){
        model = "item";
      }
      var items = [];
        for(var i = 0 ; i < 3; i++){
          var obj = {};
          obj.key = model + "_" + i;
          obj.text = model + "_" + i;
          obj.value = i;
          items.push(obj);
        }
        callback({items});
    }
    else{
      var rowsCount = 5;
      var items = [];
      for(var i = 0 ; i < pageSize; i++){
        var obj = {};
        if(control.props.columns == undefined){
          obj["col1"] = "col1_" + (Number(startIndex) + Number(i));
          obj["col2"] = "col2_" + (Number(startIndex) + Number(i));
          obj["col3"] = "col3_" + (Number(startIndex) + Number(i));
        }
        else{
          control.props.columns.forEach(function(c){
            obj[c.key] = c.key + "_" + (Number(startIndex) + Number(i));
          });
        }
        items.push(obj);
      }
      callback({startIndex, pageSize, rowsCount, items});
    }
  }

var actions= [
  {text: "validate", icon: "browser"},
  {text:'refresh', icon: "browser"},
  {text:'save', icon: "browser"},
  {text:'saveandexit', icon: "browser"},
  {text:'cancel', icon: "browser"},
  {text:'recalc', icon: "browser"},
  {text:'add', icon: "browser"},
  {text:'edit', icon: "browser"},
  {text:'delete', icon: "browser"},
];

//********************
//Getting a list of default controls
//********************
//var items = FormBuilderControls.getItems();

//********************
//Remove two controls
//FormBuilderControls.removeItems(['container', 'form'])
//********************

//********************
//Add a customs control
//********************
let separator = {separator: true, title: "CustomControls"};
FormBuilderControls.addItem(separator, 0);
FormBuilderControls.addItem(NewControlSetting, 1);

//Custom controls set
// FormBuilderControls.setItems([
//    separator, 
//    NewControlSetting]
// );

var formbuilder;
ReactDOM.render(
    <FormBuilder
      showHeader={true}
      actions={actions}
      getFormFunc={getform}
      getAdditionalDataForControl={getAdditionalDataForControl}
      ref={(builder) => { formbuilder = builder; }}
      downloadUrl="download.html?file="
      uploadUrl="upload.html?file="
      />,
    document.getElementById('container')
);

formbuilder.load('./samples/forms/form-customcontrols');
