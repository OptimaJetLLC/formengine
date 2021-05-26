import React from 'react';
import { Nav } from 'rsuite';
import { register } from 'optimajet-builder-shared';

class TabGrouo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: props.options.activeIndex || 0,
        };
    }

    onTabChange(index) {
        this.setState({
            activeIndex: index,
        })
        this.props.options.onTabChange(null, { activeIndex: index });
    }

    render() {
        const {options} = this.props;
        const {model} = options
        let className = "formbuilder-tabgroup";
        if(options.controlProps.className){
            className += " " + options.controlProps.className;
        }
    
        let obj = options.panes ? options.panes[this.state.activeIndex] : undefined;
        const activePane = obj ? obj.pane : undefined;
        let i = -1;
        return  <div {...options.controlProps} className={className}> 
            <Nav appearance={model?.tabular ? "tabs" : "subtle" }
                activeKey={this.state.activeIndex}
                justified={model?.fluid} 
                vertical={options.vertical} 
                onSelect={this.onTabChange.bind(this)}>
                {options.panes && options.panes.map((pane)=>{
                    i++;
                    return <Nav.Item key={pane.pane.psid} eventKey={i}>{pane.menuItem}</Nav.Item>    
                })}
            </Nav>   
            <div key={this.state.activeIndex} className="formbuilder-tabgroup-panel">
                {activePane && activePane.content}
            </div>
        </div>;

    }

}

register('tab-group', options => {
    return <TabGrouo {...options.props} options={options}/>;
});
