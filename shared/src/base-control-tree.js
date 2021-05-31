import { Component } from 'react';
import FormBuilderStore from './store.jsx';
import BuilderActions from './actions';

export default class BaseControlTree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            model: FormBuilderStore.getData() || [],
            selectedKey: null,
        };

        FormBuilderStore.listenTo(BuilderActions.treeChanged, this.onTreeChanged);
        FormBuilderStore.listenTo(BuilderActions.showEditForm, this.onSelect);
    }

    onTreeChanged = () => {
        let model = FormBuilderStore.getData();
        
        this.setState({ model: model.filter(item => item["data-buildertype"] !== "__settings") });
    }

    onSelect = selectedKey => {
        this.setState({ selectedKey });
    }

    select = key => {   
        FormBuilderStore.select(key);
    }

}
