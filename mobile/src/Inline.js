import React, { Component } from 'react';
import FormBuilderDevBuilder from './form-builder-dev-builder';
import { View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import builderTheme from './theme/builder-theme';
import FormBuilderDevViewer from './form-builder-dev-viewer';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry  } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as themeMapping } from './theme/evaThemeMapping.json';
import { default as dwkitOrangeTheme } from './theme/dwkitOrangeTheme.json';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: "builder",
            model: []
        };
    }

    resetModel(){
        this.setState({
            model: []
        });

        this.fbDevBuilder.formBuilder.create();
    }

    getModel(){
        return this.fbDevBuilder.formBuilder.getData();
    }

    setModel(model){
        this.fbDevBuilder.formBuilder.loadData(model);
        const tmp = this.fbDevBuilder.formBuilder.getData();
        this.setState({
            model: tmp
        })
    }

    download(){
        this.fbDevBuilder.formBuilder.onDownload();
    }

    upload(element, callback){
        var me = this;
        this.fbDevBuilder.formBuilder.upload(element, function (model) {
            me.setState({
                model
            });
            callback && callback(model);
        });
    }

    showBuilder(){
        if(this.state.mode == "builder")
            return;

        this.setState({
            mode: "builder"
        })
    }

    showViewer(){
        if(this.state.mode == "viewer")
            return;

        const model = this.fbDevBuilder.formBuilder.getData();
        this.setState({
            mode: "viewer",
            model
        })
    }

    init({
        actions,
        getFormFunc,
        getFormList,
        getAdditionalDataForControl,
        localization,
        templates,
        externalControlList,
        externalControlRender,
        externalControlsOnly
    }){
        this.setState({
            actions,
            getFormFunc,
            getFormList,
            getAdditionalDataForControl,
            localization,
            templates,
            externalControlList,
            externalControlRender,
            externalControlsOnly
        })
    }

    render(){
        var controlProps = {
            showHeader: false,
            actions: this.state.actions,
            getFormFunc: this.state.getFormFunc,
            getFormList: this.state.getFormList,
            getAdditionalDataForControl: this.state.getAdditionalDataForControl,
            localization: this.state.localization,
            templates: this.state.templates,
            externalControlList: this.state.externalControlList,
            externalControlRender: this.state.externalControlRender,
            externalControlsOnly: this.state.externalControlsOnly,
            parent: this
        };

        return <ThemeProvider theme={builderTheme}>
            <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider {...eva} theme={dwkitOrangeTheme} customMapping={themeMapping}>
                    <View>
                        <View style={{display: (this.state.mode == "builder" ? "block" : "none") }}>
                            <FormBuilderDevBuilder 
                            {...controlProps}
                            ref={(el) => {
                                this.fbDevBuilder = el;
                            }}
                            parent={this} data={this.state.model}/>
                        </View>
                        {this.state.mode == "viewer" && 
                            <FormBuilderDevViewer {...controlProps} 
                            model={this.state.model}/>}
                    </View>
                </ApplicationProvider>
            </ThemeProvider>;
    }
}