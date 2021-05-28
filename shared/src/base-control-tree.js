import { Component } from 'react';
import FormBuilderStore from './store.jsx';
import BuilderActions from './actions';

export default class BaseControlTree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            model: FormBuilderStore.getTemporaryData() || [],
            selectedKey: null,
        };

        FormBuilderStore.listen(this.onModelChanged);
        FormBuilderStore.listenTo(BuilderActions.showEditForm, this.onSelect);
    }

    onModelChanged = () => {
        let model = FormBuilderStore.getTemporaryData();
        
        this.setState({ model: model.filter(item => item["data-buildertype"] !== "__settings") });
    }

    onSelect = selectedKey => {
        this.setState({ selectedKey });
    }

    select = key => {   
        FormBuilderStore.select(key);
    }

}
