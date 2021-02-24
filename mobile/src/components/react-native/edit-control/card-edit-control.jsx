import React from 'react';
import BaseEditControl from './base-edit-control.jsx';
import DWKitInput from './dwkit/dwkit-input.jsx';

export default class CardEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleTextChange.bind(this.props.parent);

        return (<>
            <DWKitInput label={this.getLocalValue('namefield', 'Name', 'cardform')} value={data.key} onChange={handleChange('key')}/>
            <DWKitInput label={this.getLocalValue('header', 'Header', "cardform")} value={data.header} onChange={handleChange('header')}/>
            <DWKitInput label={this.getLocalValue('subheader', 'Subheader', "cardform")} value={data.subheader} onChange={handleChange('subheader')}/>
            {/* <DWKitInput label={this.getLocalValue('imgurlfield', 'Image URL', "cardform")} value={data.imgurl} onChange={handleChange('imgurl')}/> */}
        </>);
    }

}
