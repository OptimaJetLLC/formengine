import Reflux from 'reflux';

const BuilderActions = Reflux.createActions([
    'add',
    'showEditForm',
    'remove',
    'saveData',
    'save',
    'move',
    'insert',
    'changeItem',
    'undo',
    'redo',
    'select'
]);

export default BuilderActions;
