import Reflux from 'reflux';

const BuilderActions = Reflux.createActions([
    'add',
    'showEditForm',
    'remove',
    'saveData',
    'save',
    'move',
    'insert',
    'changeItem'
]);

export default BuilderActions;
