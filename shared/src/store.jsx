/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
/* eslint-disable no-mixed-operators */

import BaseControls from './base-controls';
import BuilderActions from './actions';

var Reflux = require('reflux');
const clone = require('clone');

let _data;
let _selected;
let _history = [];
let _historyPosition = -1;
const HISTORY_LIMIT = 100;

var FormBuilderStore = Reflux.createStore({
    init: function () {
        this.listenTo(BuilderActions.add, this.add);
        this.listenTo(BuilderActions.move, this.move);
        this.listenTo(BuilderActions.remove, this.remove);
        this.listenTo(BuilderActions.save, this.save);
        this.listenTo(BuilderActions.saveData, this._updateOrder);
        this.listenTo(BuilderActions.insert, this.insert);
        this.listenTo(BuilderActions.changeItem, this.changeItem);
        this.listenTo(BuilderActions.undo, this.undo);
        this.listenTo(BuilderActions.redo, this.redo);

        _data = [];
    },

    move: function (key, el) {
        if (el == undefined) {
            return;
        }

        var item = this.findItemByKey(key, _data);
        var sortedArray = this._excludeItemByKey(key, _data);

        if (el.attributes['name'] && el.attributes['name'].value === 'dropzone_footer') {
            sortedArray.push(item);
        }
        else if (el.attributes['name'] && el.attributes['name'].value === 'dropzone_header') {
            sortedArray.unshift(item);
        }
        else if (el.attributes['elementtoinsert'] != undefined) {
            var parentControl;
            var parentKey = el.attributes['elementtoinsert'];

            if (parentKey != undefined) {
                parentControl = this.findItemByKey(parentKey.value, sortedArray);
            }

            if (parentControl != undefined) {
                var placeholderAtt = el.attributes['placeholderkey'];
                let container = undefined;

                if (placeholderAtt === undefined) {
                    if (parentControl.children == undefined) {
                        parentControl.children = [];
                    }
                    container = parentControl.children;
                }
                else {
                    if (parentControl.placeholders === undefined) {
                        parentControl.placeholders = {};
                    }
                    if (parentControl.placeholders[placeholderAtt.value] == undefined) {
                        parentControl.placeholders[placeholderAtt.value] = [];
                    }
                    container = parentControl.placeholders[placeholderAtt.value];
                }

                if (el.attributes['name'] != undefined && el.attributes['name'].value.includes('dropzone_footer')) {
                    container.push(item);
                }
                else if (el.attributes['name'] != undefined && el.attributes['name'].value.includes('dropzone_header')) {
                    container.unshift(item);
                }
                else if (el.attributes['elementafter'] != undefined) {
                    let afterKey = el.attributes['elementafter'];
                    let afterControl = this.findItemByKey(afterKey.value, container);
                    container.splice(container.indexOf(afterControl), 0, item);
                }
                else if (el.attributes['elementbefore'] != undefined) {
                    let beforeKey = el.attributes['elementbefore'];
                    let beforeControl = this.findItemByKey(beforeKey.value, container);
                    container.splice(container.indexOf(beforeControl) + 1, 0, item);
                }
            }
            else {
                console.error('ERROR: element is not found', parentKey, item, el);
            }
        }
        else if (el.attributes['elementafter'] != undefined) {
            var control;
            var afterKey = el.attributes['elementafter'];
            if (afterKey != undefined) {
                control = this.findItemByKey(afterKey.value, sortedArray);
            }

            if (control != undefined) {
                sortedArray.splice(sortedArray.indexOf(control), 0, item);
            }
            else {
                console.error('ERROR: element is not found', afterKey, item, el);
            }
        }
        else if (el.attributes['elementbefore'] != undefined) {
            var control;
            var beforeKey = el.attributes['elementbefore'];
            if (beforeKey != undefined) {
                control = this.findItemByKey(beforeKey.value, sortedArray);
            }

            if (control != undefined) {
                sortedArray.splice(sortedArray.indexOf(control) + 1, 0, item);
            }
            else {
                console.error('ERROR: element is not found', beforeKey, item, el);
            }
        }

        this.setData(sortedArray);
        this.saveCurrentState();
    },

    insert: function (item, name, elementtoinsert, elementafter, placeholderKey) {
        if (!item) {
            return;
        }

        var sortedArray = _data;
        this.makeUniqueKeys(item, this.getAllKeys(sortedArray));

        if (name === 'dropzone_footer') {
            sortedArray.push(item);
        }
        else if (name === 'dropzone_header') {
            sortedArray.unshift(item);
        }
        else if (elementtoinsert) {
            var parentControl;
            parentControl = this.findItemByKey(elementtoinsert, sortedArray);

            if (parentControl != undefined) {
                let container = undefined;

                if (placeholderKey === undefined) {
                    if (parentControl.children == undefined) {
                        parentControl.children = [];
                    }
                    container = parentControl.children;
                }
                else {
                    if (parentControl.placeholders === undefined) {
                        parentControl.placeholders = {};
                    }
                    if (parentControl.placeholders[placeholderKey.value] == undefined) {
                        parentControl.placeholders[placeholderKey.value] = [];
                    }
                    container = parentControl.placeholders[placeholderKey.value];
                }

                if (name && name.includes('dropzone_footer')) {
                    container.push(item);
                }
                else if (name && name.includes('dropzone_header')) {
                    container.unshift(item);
                }
                else if (elementafter != undefined) {
                    var afterControl = this.findItemByKey(elementafter, container);
                    container.splice(container.indexOf(afterControl), 0, item);
                }
            }
            else {
                console.error('ERROR: element is not found', parentControl, item, elementtoinsert);
            }
        }
        else if (elementafter != undefined) {
            var control;
            control = this.findItemByKey(elementafter, sortedArray);

            if (control != undefined) {
                sortedArray.splice(sortedArray.indexOf(control), 0, item);
            }
            else {
                console.error('ERROR: element is not found', elementafter, item);
            }
        }

        this.setData(sortedArray);
        this.saveCurrentState();
    },

    _excludeItemByKey: function (key, data) {
        var sortedArray = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].key == key) {
                continue;
            }

            sortedArray.push(data[i]);

            if (data[i].children) {
                sortedArray[sortedArray.length - 1].children = this._excludeItemByKey(key, data[i].children);
            }

            if (data[i].placeholders != undefined) {
                for (let ph in data[i].placeholders) {
                    if (Array.isArray(data[i].placeholders[ph])) {
                        sortedArray[sortedArray.length - 1].placeholders[ph] = this._excludeItemByKey(
                            key,
                            data[i].placeholders[ph]
                        );
                    }
                }
            }
        }
        return sortedArray;
    },

    add: function (item, el) {
        var res = BaseControls.fillDefaultValues({
            key: this.getDefaultKey(item.key),
            'data-buildertype': item.builderType !== undefined ? item.builderType : item.key
        }, item.defaultValues);

        let settings = this.getByKey("__settings");
        if (settings && settings.pinned) {
            res.pinned = true;
        }

        if (el == undefined) {
            if (_data.length > 0 && _data[_data.length - 1]['data-buildertype'] === 'form') {
                var p = _data[_data.length - 1];
                if (p.children == undefined) {
                    p.children = [];
                }
                p.children.push(res);
            }
            else {
                _data.push(res);
            }
        }
        else if (el.attributes['name'] && el.attributes['name'].value === 'dropzone_footer') {
            _data.push(res);
        }
        else if (el.attributes['name'] && el.attributes['name'].value === 'dropzone_header') {
            _data.unshift(res);
        }
        else if (el.attributes['elementtoinsert'] != undefined) {
            var parentControl;
            var parentKey = el.attributes['elementtoinsert'];

            if (parentKey != undefined) {
                parentControl = this.findItemByKey(parentKey.value, _data);
            }

            if (parentControl != undefined) {
                var placeholderAtt = el.attributes['placeholderkey'];
                let container = undefined;

                if (placeholderAtt === undefined) {
                    if (parentControl.children == undefined) {
                        parentControl.children = [];
                    }
                    container = parentControl.children;
                }
                else {
                    if (parentControl.placeholders === undefined) {
                        parentControl.placeholders = {}
                    }
                    if (parentControl.placeholders[placeholderAtt.value] == undefined) {
                        parentControl.placeholders[placeholderAtt.value] = [];
                    }
                    container = parentControl.placeholders[placeholderAtt.value];
                }

                if (el.attributes['name'] != undefined && el.attributes['name'].value.includes('dropzone_footer')) {
                    container.push(res);
                }
                else if (el.attributes['name'] != undefined && el.attributes['name'].value.includes('dropzone_header')) {
                    container.unshift(res);
                }
                else if (el.attributes['elementafter'] != undefined) {
                    var afterKey = el.attributes['elementafter'];
                    var afterControl = this.findItemByKey(afterKey.value, container);
                    container.splice(container.indexOf(afterControl), 0, res);
                }
                else if (el.attributes['elementbefore'] != undefined) {
                    var beforeKey = el.attributes['elementbefore'];
                    var beforeControl = this.findItemByKey(beforeKey.value, container);
                    container.splice(container.indexOf(beforeControl) + 1, 0, res);
                }
            }
            else {
                console.error('ERROR: element is not found', parentKey, item, el);
            }
        }
        else if (el.attributes['elementafter'] != undefined) {
            var control;
            var afterKey = el.attributes['elementafter'];
            if (afterKey != undefined) {
                control = this.findItemByKey(afterKey.value, _data);
            }

            if (control != undefined) {
                _data.splice(_data.indexOf(control), 0, res);
            }
            else {
                console.error('ERROR: element is not found', afterKey, el);
            }
        }
        else if (el.attributes['elementbefore'] != undefined) {
            var control;
            var beforeKey = el.attributes['elementbefore'];
            if (beforeKey != undefined) {
                control = this.findItemByKey(beforeKey.value, _data);
            }

            if (control != undefined) {
                _data.splice(_data.indexOf(control) + 1, 0, res);
            }
            else {
                console.error('ERROR: element is not found', beforeKey, el);
            }
        }
        BuilderActions.treeChanged();
        this.saveCurrentState();
    },

    remove: function (item) {
        this.removeItemByKey(item.key, _data);
        BuilderActions.treeChanged();
        this.saveCurrentState();
    },

    copy: function (item) {
        var newItem = this.copyObj(item);
        this.insertAfterKey(newItem, item.key, _data);
        this.makeUniqueKeys(newItem);
        BuilderActions.treeChanged();
        this.saveCurrentState();
    },

    getData: function () {
        return _data;
    },

    _updateOrder: function (elements) {
        this.setData(elements);
    },

    getDefaultKey: function (name) {
        var index = 1;
        var tmp = name + '_' + index;

        let allKeys = this.getAllKeys(_data);
        for (var i = 0; i < allKeys.length; i++) {
            var item = allKeys[i];
            var tmp = name + '_' + index;
            if (item == tmp) {
                index++;
                i = -1;
            }
        }

        return tmp;
    },

    getAllKeys: function (items) {
        var res = [];
        if (items != undefined) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                res.push(item.key);
                if (item.children != undefined) {
                    var childkeys = this.getAllKeys(item.children);
                    res = res.concat(childkeys);
                }
                else if (item.placeholders != undefined) {
                    for (let ph in item.placeholders) {
                        if (Array.isArray(item.placeholders[ph])) {
                            let phkeys = this.getAllKeys(item.placeholders[ph]);
                            res = res.concat(phkeys);
                        }
                    }
                }
            }
        }

        return res;
    },

    getByKey: function (key) {
        return this.findItemByKey(key, _data);
    },

    findItemByKey: function (key, items) {
        if (!Array.isArray(items))
            return undefined;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.key == key) {
                return item;
            }
            else if (item.children != undefined) {
                var res = this.findItemByKey(key, item.children);
                if (res != undefined) {
                    return res;
                }
            }
            else if (item.placeholders != undefined) {
                for (let ph in item.placeholders) {
                    if (Array.isArray(item.placeholders[ph])) {
                        var res = this.findItemByKey(key, item.placeholders[ph]);
                        if (res != undefined) {
                            return res;
                        }
                    }
                }
            }
        }
        return undefined;
    },

    insertAfterKey: function (insertItem, key, items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.key == key) {
                items.splice(i + 1, 0, insertItem);
                return true;
            }

            if (item.children !== undefined) {
                if (this.insertAfterKey(insertItem, key, item.children)) {
                    return true;
                }
            }

            if (item.placeholders !== undefined) {
                for (let ph in item.placeholders) {
                    if (Array.isArray(item.placeholders[ph])) {
                        if (this.insertAfterKey(insertItem, key, item.placeholders[ph])) {
                            return true;
                        }
                    }
                }
            }
        }
        return undefined;
    },

    updateItemByKey: function (key, item) {
        var data = this.getByKey(key);
        if (!item)
            return;

        if (!data) {
            data = { key };
            this.insert(data, "dropzone_header");
        }

        for (var i in item) {
            data[i] = item[i];
        }

        if (key != item.key) {
            this.replaceDepensKeys(key, item.key);
        }

        this.saveCurrentState();
    },

    replaceDepensKeys: function (oldKey, newKey, items) {
        if (items == undefined) {
            items = _data;
        }

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (Array.isArray(item['events-onclick-targets'])) {
                var targets = item['events-onclick-targets'];
                for (var j = 0; j < targets.length; j++) {
                    if (targets[j] == oldKey) {
                        targets[j] = newKey;
                    }
                }
            }

            if (item.children != undefined) {
                this.replaceDepensKeys(oldKey, newKey, item.children);
            }

            if (item.placeholders !== undefined) {
                for (let ph in item.placeholders) {
                    if (Array.isArray(item.placeholders[ph])) {
                        this.replaceDepensKeys(oldKey, newKey, item.placeholders[ph]);
                    }
                }
            }
        }
    },

    removeItemByKey: function (key, items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.key == key) {
                items.splice(i, 1);
                break;
            }

            if (item.children != undefined) {
                this.removeItemByKey(key, item.children);
            }

            if (item.placeholders !== undefined) {
                for (let ph in item.placeholders) {
                    if (Array.isArray(item.placeholders[ph])) {
                        this.removeItemByKey(key, item.placeholders[ph]);
                    }
                }
            }
        }

        BuilderActions.treeChanged();
        this.saveCurrentState();
    },

    copyObj(obj) {
        if (null == obj || 'object' !== typeof obj) {
            return obj;
        }
        var copy = obj.constructor();

        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = this.copyObj(obj[attr]);
            }
        }
        return copy;
    },

    makeUniqueKeys(obj, allKeys) {
        var me = this;
        var buildertype = obj['data-buildertype'];
        if (buildertype) {
            if (obj.key && (!allKeys || allKeys && allKeys.includes(obj.key))) {
                obj.key = this.getDefaultKey(buildertype);
            }
        }

        if (Array.isArray(obj.children)) {
            obj.children.forEach(function (c) {
                me.makeUniqueKeys(c, allKeys);
            });
        }

        if (obj.placeholders !== undefined) {
            for (let ph in obj.placeholders) {
                if (Array.isArray(obj.placeholders[ph])) {
                    obj.placeholders[ph].forEach(function (c) {
                        me.makeUniqueKeys(c, allKeys);
                    });
                }
            }
        }
    },

    changeItem: function (key, changeset) {

        var model = this.getByKey(key);
        for (let p in changeset) {
            model[p] = changeset[p];
        }
        this.saveCurrentState();
    },    

    saveCurrentState() {
        if (_historyPosition < (_history?.length - 1)) {            
            _history.splice(_historyPosition + 1);
        }

        _history.push(this.copyObj(_data));
        ++_historyPosition;        

        if (_history?.length > HISTORY_LIMIT) {
            _history.splice(0, _history.length - HISTORY_LIMIT);
            _historyPosition = HISTORY_LIMIT - 1;
        }

        this.trigger(_data);
        BuilderActions.dataChanged();
    },

    setData: function (data) {
        _data = data;
        this.trigger(_data);
        BuilderActions.treeChanged();
        if (_history.length <= 0) {
            this.saveCurrentState();
            this.select(_data[1]?.key);
        }
    },

    canUndo() {
        return _historyPosition > 0;
    },

    canRedo() {
        return _historyPosition < (_history?.length - 1);
    },

    undo() {
        // retrieve cached data
        if (!this.canUndo()) {
            return;
        }
        --_historyPosition;
        _data = this.copyObj(_history[_historyPosition]);
        this.trigger(_data);
        BuilderActions.dataChanged();
    },

    redo() {
        // retrieve cached data
        if (!this.canRedo()) {
            return;
        }
        ++_historyPosition;
        _data = this.copyObj(_history[_historyPosition]);
        this.trigger(_data);
        BuilderActions.dataChanged();
    },

    select(key) {
        if (!key) return;
        _selected = key;
        BuilderActions.showEditForm(key);
    },

    getSelected() {
        return _selected;
    }
});

export default FormBuilderStore;
