import React, { Component } from 'react';

import './App.css';
import FormBuilderDevBuilder from './form-builder-dev-builder';
import { View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import builderTheme from './theme/builder-theme';
import builderStyles from './builder-styles';
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
            model: undefined
        };
    }

    showBuilder(){
        if(this.state.mode == "builder")
            return;

        this.fbDevBuilder.formBuilder.setBuilderMode(true);
        this.setState({
            mode: "builder"
        })
    }

    showViewer(){
        if(this.state.mode == "viewer")
            return;

        const model = this.fbDevBuilder.formBuilder.getData();
        this.fbDevBuilder.formBuilder.setBuilderMode(false);
        this.setState({
            mode: "viewer",
            model
        })
    }

    render(){
        const formUrl = '/form-data/application-form.json';
        const dataUrl = '/form-data/application-form-data.json';

        var controlProps = {
            showHeader: true,
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
                            }} data={this.state.model}/>
                        </View>
                        {this.state.mode == "viewer" && 
                            <FormBuilderDevViewer {...controlProps}  formUrl={formUrl} dataUrl={dataUrl}
                            model={this.state.model}/>}
                    </View>
                </ApplicationProvider>
            </ThemeProvider>;
    }
}