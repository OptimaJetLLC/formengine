import React from 'react';
import { BaseFormBuilder, DropzoneContext } from 'optimajet-builder-shared';
import Toolbar from './toolbar';
import Preview from './preview';
import { Button, Toggle, Text } from '@ui-kitten/components';
import { TouchableWithoutFeedback, Image, View } from 'react-native';
import builderStyles from './builder-styles';
import ReactNativeEditForm from './builder/react-native-edit-form';
import DragView from './builder/dnd/drag-view.jsx';
import builderDragAndDropContext from './builder/drag-and-drop-builder-context';
import CustomBlockEditControl from './components/edit-control/custom-block-edit-control.jsx';
import controls from './builder/controls-for-builder';

export default class FormBuilder extends BaseFormBuilder {
    constructor(props) {
        super(props);
        this.controls = controls;
    }

    getHeader() {
        let local = {};//this.getCurrentLocalization();
        let extraButtons = [];
        if (this.props.extraHeaderButtons) {
            this.props.extraHeaderButtons.forEach(function (button) {
                extraButtons.push(
                    <View style={{marginLeft: 5}}>
                        <Button key={button.name} name={button.name} onPress={button.onClick} children={button.text} size='small'/>
                    </View>
                );
            });
        }

        const previewTextStyle = !this.state.dropzoneContext.isBuilder ? 'label' : 'c2';
        const builderTextStyle = this.state.dropzoneContext.isBuilder ? 'label' : 'c2';

        const topStyle = {
            paddingLeft: 30, 
            marginTop: 15, 
            marginBottom: 15, 
            flex: 1, 
            flexDirection: 'row'
        }

        return (<View style={topStyle}>
            <View>
                <Image source={{ uri: '/images/logo.svg' }} style={{ width: 186, height: 30 }}/>
            </View>
            <View style={{marginLeft: 5}}>
                <Button onPress={this.create.bind(this)} children={local.clearbutton} appearance='outline' size='small'/>
            </View>
            <View style={{marginLeft: 5}}>
                <Button onPress={this.onChooseFileUpload.bind(this)} children={local.uploadbutton} appearance='outline' size='small'/>
            </View>
            <View style={{marginLeft: 5}}>
                <Button onPress={this.onDownload.bind(this)} children={local.downloadbutton}  appearance='outline' size='small'/>
            </View>
            {extraButtons}
            <TouchableWithoutFeedback style={builderStyles.dwkitFormBuilderHeaderRight}
              onPress={() => this.switchBuilderMode(!this.state.dropzoneContext.isBuilder)}>
                <View style={builderStyles.dwkitFormBuilderHeaderRight}>

                    <Text category={builderTextStyle} style={{marginLeft: 10, marginBottom: 6, fontSize: 15, width: 60}}>Builder</Text>
                    <Toggle checked={this.state.dropzoneContext.isBuilder}
                            onChange={(state) => this.switchBuilderMode(state)}
                            status='primary'
                            appearance='switcher'
                            />
                    <Text category={previewTextStyle} style={{marginRight: 10, marginBottom: 6, fontSize: 15}}>Preview</Text>
                    {/* todo test form*/}
                    <form action="/" method="post" id="builderUploadForm" style={{ display: 'none' }}
                        onSubmit={this.onUpload.bind(this)}>
                        <input type="file" id="builderUploadFile" onChange={this.onChangeFileUpload.bind(this)}/>
                        <input type="submit" id="builderUploadSubmit"/>
                    </form>
                </View>
            </TouchableWithoutFeedback>
        </View>);
    }

    switchBuilderMode(state) {
        this.setBuilderMode(state);
        if (state === true) {
            builderDragAndDropContext.showZones();
            return;
        }
        builderDragAndDropContext.hideZones();
    }

    render() {
        const localization = {}; //this.getCurrentLocalization();
        // todo web onDragOver
        const builder = (
            <View style={builderStyles.dwkitFormBuilder} onDragOver={this.onDragOver}>
                <View style={builderStyles.dwkitFormBuilderContent}>
                    <Preview
                        getFormFunc={this.props.getFormFunc}
                        getFormFist={this.props.getFormFist}
                        getAdditionalDataForControl={this.props.getAdditionalDataForControl}
                        localization={localization.preview}
                        downloadUrl={this.props.downloadUrl}
                        uploadUrl={this.props.uploadUrl}
                        externalControlRender={this.props.externalControlRender}
                        externalControlList={this.props.externalControlList}
                        controls={this.controls}
                        buildermode={this.state.dropzoneContext.isBuilder}
                    />
                    <ReactNativeEditForm actions={this.props.actions} localization={localization.editforms}
                                              externalControlList={this.props.externalControlList}
                                              controls={this.controls}
                    />
                </View>
                <View style={builderStyles.dwkitFormBuilderToolbar}>
                    <Toolbar localization={localization.toolbar} templates={this.props.templates}
                             externalControlList={this.props.externalControlList}
                             externalControlsOnly={this.props.externalControlsOnly}
                             controls={this.controls} editControl={CustomBlockEditControl}
                    />
                </View>
            </View>);

        const fullBuilder = this.props.showHeader ? (<View>{this.getHeader()}{builder}</View>) : builder;

        return (<DropzoneContext.Provider value={this.state.dropzoneContext}>
            <DragView>
                {fullBuilder}
            </DragView>
        </DropzoneContext.Provider>);
    }

}
