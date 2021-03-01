const JSON5 = require("json5");
const { setState } = require("reflux");

function initDefaultState({model, data}) {
    if(!Array.isArray(model) || data === undefined)
        return;

    let settings;
    model.forEach(m => {
        if(m.key == "__settings"){
            settings = m;
        }
    });

    if(settings){
        if(settings.defaultvalues){
            let tmp
            try{                
                tmp = JSON5.parse(settings.defaultvalues);
            }
            catch{}

            if(tmp){
                for(let p in tmp){
                    data[p] = tmp[p];
                }
            }
        }
    }
    else{//depricated. it will be removed in the next version
        
        for(let i=0; i < model.length; i++){
            var key = model[i].propertyName ? model[i].propertyName : model[i].key;
            if(model[i]["defaultValue"] && !data[key]){
                data[key] = model[i]["defaultValue"];
            }

            if(Array.isArray(model[i].children)){
                initDefaultState({model: model[i].children, data});
            }

            if(model[i].placeholders !== undefined){
                for(let ps in model[i].placeholders){
                    initDefaultState({model: model[i].placeholders[ps], data});
                }
            }

            if(model[i]["data-buildertype"] === "customblock" && model[i].sourceType === "source" && model[i].source != undefined){
                var children = JSON5.parse(model[i].source);
                initDefaultState({model: children, data});
            }
        }
    }
}

function initDefaultStateFormUrl(data)
{
    if(data === undefined)
        data = {};

    var urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null){
           return null;
        }
        else {
           return decodeURI(results[1]) || 0;
        }
    };

    var defaultvalues = urlParam("defaultvalues");
    if(defaultvalues){
        var defaultvaluesJson = undefined;
        try{
            defaultvaluesJson = JSON5.parse(defaultvalues);
        }
        catch(ex){}
        if(defaultvaluesJson && typeof defaultvaluesJson === 'object'){
            for(var p in defaultvaluesJson){
                if(defaultvaluesJson[p] !== undefined)
                    data[p] = defaultvaluesJson[p];
            }
        }
    }
    return data;
}

function checkConditions({ model, data }) {
    let res = {
        hideControls: [],
        readOnlyControls: []
    };

    if(!model || !data){
        return res;
    }

    for(let i=0; i < model.length; i++){
        let condition = model[i]["other-visibleConition"];
        if(condition !== undefined && condition !== ""){
            let args = 'data';
            let body = 'return ' + condition;
            if (!new Function(args, body)(data)){
                res.hideControls.push(model[i].key);
            }
        }

        condition = model[i]["other-readOnlyConition"];
        if(condition !== undefined && condition !== ""){
            let args = 'data';
            let body = 'return ' + condition;
            if(new Function(args, body)(data)){
                res.readOnlyControls.push(model[i].key);
            }
        }

        if (Array.isArray(model[i].children)) {
            const c = checkConditions({ model: model[i].children, data });
          res = {
              hideControls: res.hideControls.concat(c.hideControls),
              readOnlyControls: res.readOnlyControls.concat(c.readOnlyControls)
          };
        }

        if(model[i].placeholders !== undefined){
            for (let ps in model[i].placeholders) {
                const c = checkConditions({ model: model[i].placeholders[ps], data });
                res = {
                    hideControls: res.hideControls.concat(c.hideControls),
                    readOnlyControls: res.readOnlyControls.concat(c.readOnlyControls)
                };
            }
        }

        if(model[i]["data-buildertype"] === "customblock" && model[i].sourceType === "source" && model[i].source != undefined){
            var children = JSON5.parse(model[i].source);
            const c = checkConditions({ model: children, data });
            res = {
                hideControls: res.hideControls.concat(c.hideControls),
                readOnlyControls: res.readOnlyControls.concat(c.readOnlyControls),
            };
        }
    }

    return res;
}

function validate ({ data, model }) {
    let isValid = true;
    let errors = {};

    let controls = getControlsForValidate(model);
    for (let i=0; i < controls.length; i++){
        let key = controls[i].propertyName ? controls[i].propertyName : controls[i].key;
        let error = validateControl(controls[i], data ? data[key] : undefined, data);
        if (error){
            errors[key] = error;
            isValid = false;
        }
    }
    return {
        valid: isValid,
        errors
    };
}

function getControlsForValidate(model){
    let controls = [];
    if(Array.isArray(model)){
        model.forEach(function(control){
            if(control["other-required"] === true ||
                (control["other-customValidation"] !== undefined && control["other-customValidation"] !== "")){
                controls.push(control);
            }

            if(control.children !== undefined && control.children.length > 0){
                let cs = getControlsForValidate(control.children);
                controls = controls.concat(cs);
            }

            if(control.placeholders !== undefined){
                for(let ps in control.placeholders){
                    let cs = getControlsForValidate(control.placeholders[ps]);
                    controls = controls.concat(cs);
                }
            }

            if(control["data-buildertype"] === "customblock" && control.sourceType === "source" && control.source != undefined){
                var children = JSON5.parse(control.source);
                let cs = getControlsForValidate(children);
                controls = controls.concat(cs);
            }
        });
    }

    return controls;
}

function validateControl(control, value, data){
    let error = undefined;
    if (control["other-required"] === true && (
        value === undefined || 
        value === null || 
        value === '' ||
        (control["data-buildertype"] === "collectioneditor" && Array.isArray(value) && value.length === 0)
    )){
        error = 'This field is required!';
    }
    else if (control["other-customValidation"] !== undefined && control["other-customValidation"] !== ""){
        let args = 'value, data';
        let body = 'return ' + control["other-customValidation"];
        let isValid = new Function(args, body)(value, data);
        if (typeof isValid === 'boolean'){
            if (isValid === false) {
                error = true;
            }
        }
        else{
            error = isValid;
        }
    }
    return error;
}

function updateEventsFormat(events){
    if (events.updated)
        return events;

    const isOldFormat = event => !!(event.actions || event.parameters || event.targets);

    Object.keys(events).forEach(eventName => {
        let e = events[eventName];
        if (isOldFormat(e)) {
            const eventParams = {
                actions: e.actions || [],
                parameters: e.parameters || [],
                targets: e.targets|| []
            };

            events[eventName] = {
                active: e.active || false,
                triggers: e.actions ? [eventParams] : undefined,
            };
        };
    });
    
    events.updated = true;

    return events;
}


module.exports = {initDefaultState, initDefaultStateFormUrl, validate, checkConditions, updateEventsFormat};