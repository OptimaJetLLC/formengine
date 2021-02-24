import React, { Component } from 'react';
import { Editor, EditorState, getDefaultKeyBinding, RichUtils } from 'draft-js';
import { Form } from 'semantic-ui-react';
import { convertFromHTML, convertToHTML } from 'draft-convert';

export default class RichTextEditorControl extends Component {

    constructor(props) {
        super(props);

        this.state = { editorState: EditorState.createEmpty() };

        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.value !== prevState.value) {

            let state = EditorState.createEmpty();
            try {
                const contentState = convertFromHTML(nextProps.value);
                state = EditorState.createWithContent(contentState);
            }
            catch (ex) {
            }
            return {
                value: nextProps.value,
                editorState: state
            }
        }
        return null;
    }

    render() {


        // else if (control === RichTextEditorControl) {
        //     res = <RichTextEditorControl {...props} additionalParams={{
        //         model, data, errors, children, handleEvent, parentItem, uploadUrl, downloadUrl
        //     }}/>;

        let me = this;
        const propsControl = {};
        const divProps = {};
        for (let p in this.props) {
            if (p === 'className' || p === 'style') {
                divProps[p] = this.props[p];
            }
            else {
                propsControl[p] = this.props[p];
            }
        }

        const model = this.props.additionalParams.model;
        const handleEvent = this.props.additionalParams.handleEvent;
        const parentItem = this.props.additionalParams.parentItem;

        propsControl.placeholder = model.placeholder;
        propsControl.onChange = this.onChange = function (editorState) {
            const content = editorState.getCurrentContent();
            let value = convertToHTML(content);
            me.setState({
                editorState,
                value: value
            });

            handleEvent({
                key: propsControl.name,
                propertyName: propsControl.propertyName,
                eventName: 'onChange',
                name: propsControl.name,
                value: value
            });
        };

        const className = 'dwkit-richtextcontrol RichEditor-root';
        if (divProps.className) {
            divProps.className += ' ' + className;
        }
        else {
            divProps.className = className;
        }

        const res = <div {...divProps}>
            {!propsControl.readOnly && <BlockStyleControls
                editorState={this.state.editorState}
                onToggle={this.toggleBlockType}
            />}
            {!propsControl.readOnly && <InlineStyleControls
                editorState={this.state.editorState}
                onToggle={this.toggleInlineStyle}
            />}
            <div onClick={this.focus}>
                <Editor
                    {...propsControl} editorState={this.state.editorState}
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    handleKeyCommand={this.handleKeyCommand}
                    keyBindingFn={this.mapKeyToEditorCommand}
                    ref="editor"
                    spellCheck={true}
                />
            </div>
        </div>;

        if (this.isForm(parentItem)) {
            return <Form.Field>
                <label>{model.label}</label>
                {res}
            </Form.Field>
        }
        else {
            return res;
        }
    }

    isForm(m) {
        return (m != null &&
            (m['data-buildertype'] === 'form' ||
                m['data-buildertype'] === 'formgroup'));
    }

    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _mapKeyToEditorCommand(e) {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(
                e,
                this.state.editorState,
                4, /* maxDepth */
            );
            if (newEditorState !== this.state.editorState) {
                this.onChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
            <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
        );
    }
}

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    //{label: 'H3', style: 'header-three'},
    // {label: 'H4', style: 'header-four'},
    // {label: 'H5', style: 'header-five'},
    // {label: 'H6', style: 'header-six'},
    //{label: 'Blockquote', style: 'blockquote'},
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
];
const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Code', style: 'CODE' },
];
const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};
