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

        //FormBuilderStore.listen(this.modelChanged);
    }

    modelChanged = () => {
        let model = FormBuilderStore.getTemporaryData();
        this.setState({ model });
    }

    onSelect = selectedKey => {
        if (this.state.selectedKey !== selectedKey) this.setState({ selectedKey });
        this.select(selectedKey);
    }

    select = key => {        
        BuilderActions.showEditForm(key);
    }

}
