import React from 'react';
import { BaseFormViewer, isNotEmptyString } from 'optimajet-builder-shared';
import JSON5 from 'json5';
import DWKitReactNativeForm from '../builder/react-native/dwkit-react-native-form';
import { View, Image } from 'react-native';
import { Text, Button, Icon, Input } from '@ui-kitten/components';

export default class DWKitReactNativeFormViewer extends BaseFormViewer {

    getViewState() {
        return this.state.adaptiveViewType === 'desktop' ? 'mobile' : 'desktop';
    }

    render() {
        let data = [];
        let errors = undefined;
        try {
            data = JSON5.parse(this.state.data);
            if (isNotEmptyString(this.state.errors)) {
                errors = JSON5.parse(this.state.errors);
            }
        }
        catch (e) {
        }

        const topStyle = {
            paddingLeft: 30, 
            marginTop: 15, 
            marginBottom: 10, 
            flex: 1, 
            flexDirection: 'row'
        }

        const frameStyle = {
            backgroundImage: "url(/images/mobile-frame.png)",
            backgroundRepeat: "no-repeat",
            marginRight: 25
        }

        const frameChildStyle = {
            marginTop: 65,
            marginLeft: 35,
            marginRight: 30,
            marginBottom: 55,
            width: 480,
            height: 960,
            overflow: "scroll"
        }

        const textareaStyle = {
            marginBottom: 15,
        }

        

        const Header = props => <Text category='label' style={{fontSize: 15}} {...props}>{props.children}</Text>

        return (
            <View>
                {this.props.showHeader && <View style={topStyle}>
                    <View>
                        <Image source={{ uri: '/images/logoviewer.svg' }} style={{ width: 186, height: 30 }}/>
                    </View>
                    <View>
                        <Button children="Back to Builder" onPress={ () => { this.props.parent.showBuilder();}} size='small'/>    
                    </View>
                </View>}
                <View style={{flex: 1, flexDirection: 'row', padding: 25}} onDrag={() => this.forceUpdate()}>
                    <View style={frameStyle}>
                        <View style={frameChildStyle}>
                            <DWKitReactNativeForm
                                model={this.props.model}
                                data={data}
                                errors={errors}
                                eventFunc={this.eventFunc.bind(this)}
                                eventErrFunc={this.props.eventErrProcess}
                                getFormFunc={this.props.getFormFunc}
                                dataChanged={this.formDataChaged.bind(this)}
                                getAdditionalDataForControl={this.getAdditionalDataForControl.bind(this)}
                                downloadUrl={this.props.downloadUrl}
                                uploadUrl={this.props.uploadUrl}
                                externalControlList={this.props.externalControlList}
                                externalControlRender={this.props.externalControlRender}
                                adaptiveViewType={this.state.adaptiveViewType}
                            />
                        </View>
                    </View>
                    <View style={{width:"calc(100% - 580px"}}>
                        {/* <View>
                            <Text>Current state: {this.state.adaptiveViewType}.
                                Press to switch to {this.getViewState()}.</Text>
                            <Switch value={this.state.adaptiveViewType === 'desktop'}
                                    onValueChange={() => this.setState({ adaptiveViewType: this.getViewState() })}/>
                        </View> */}
                        <Header>Data</Header>
                        <Input
                            numberOfLines={11} 
                            multiline style={textareaStyle}
                            onChangeText={text => this.handleChange(null, {value: text})}
                            value={this.state.data}/>
                        <Header>Errors</Header>
                        <Input
                            numberOfLines={11} 
                            multiline style={textareaStyle}
                            onChangeText={text => this.handleChangeErrors(null, {value: text})}                           
                            value={this.state.errors}/>
                        <Header>Model</Header>
                        <Input
                            numberOfLines={11} 
                            multiline style={textareaStyle}
                            editable={false}
                            value={JSON5.stringify(this.props.model, null, 4)}/>
                        <Header>Events</Header>
                        <Input
                            multiline style={textareaStyle}
                            numberOfLines={11} 
                            editable={false} 
                            value={this.state.eventslog}/>
                    </View>
                </View>
            </View>
        );
    }

}
