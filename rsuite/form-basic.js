import Form from './src/form';
import React from 'react';
import ReactDOM from 'react-dom';
import { RegisterLicense } from "optimajet-builder-shared";

//RegisterLicense("<your license key>");

const data = {
    title: 'Test application',    
    type: 2,
    comment: 'This is a test application for John Doe'
};

let errors = {};

const form = <Form
    data={data}
    modelurl="/samples/forms/application-form.json"
    errors={errors}
    dataChanged={(form, { key, value }) => {
        data[key] = value;
    }}
    eventFunc={(args) => {
        if(Array.isArray(args.actions) && args.actions.includes("initSystem") && 
            args.parameters && args.parameters["initialData"])
        {
            var initialData = args.parameters["initialData"];
            for(var field in initialData){
                if(!data[field]){
                    data[field] = initialData[field];
                }
            }
        }
    }}
    getAdditionalDataForControl={(control, { startIndex, pageSize, filters, sort, model }, callback) => {
        console.log('getAdditionalDataForControl');
    }}
    hideControls={[]}
    readOnlyControls={[]}
    readOnly={false}
    uploadUrl={''}
    downloadUrl={''}
    autoCheckConditions={true}
    autoValidate={true}    
/>;

ReactDOM.render(form, document.getElementById('container'));