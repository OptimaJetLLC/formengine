import React from 'react';
import Slider from 'react-slick';
import { Button, Loader } from 'semantic-ui-react';
import { isDefined, isUndefined, register, RepeaterControl } from 'optimajet-builder-shared';

register('repeater', options => {

    function renderItems(data, rowsCount, addContainer) {
        const me = options.me;
        let res = [];
        let index = 0;
        if (Array.isArray(data) && data.length > 0) {
            data.forEach(function (item) {
                let itemElement = renderItem(index, item, !index && me.props.controlProps.buildermode);
                if (isDefined(itemElement)) {
                    if (addContainer) {
                        res.push(<div key={index}>{itemElement}</div>);
                    }
                    else {
                        res.push(itemElement);
                    }
                }

                index++;
            });
        }
        else if (options.props.controlProps.buildermode) {
            let itemElement = renderItem(index, {}, index === 0);
            if (isDefined(itemElement)) {
                if (addContainer) {
                    res.push(<div>{itemElement}</div>);
                }
                else {
                    res.push(itemElement);
                }
            }
        }
        else if (!options.state.loading && options.isServerMode) {
            let buttonLabel = options.props.noRecordsLabel;
            if (isUndefined(buttonLabel) || buttonLabel == '') {
                buttonLabel = 'No records. Refresh...';
            }

            let button = <div key="norecords" className="dwkit-repeater-norecords"><Button
                onClick={options.loadNextPage}>{buttonLabel}</Button></div>;
            res.push(button);
        }

        if (!options.state.loading && options.isServerMode && rowsCount > data.length && data.length > 0) {
            let buttonLabel = options.props.loadButtonLabel;
            if (isUndefined(buttonLabel) || buttonLabel == '') {
                buttonLabel = 'Load more...';
            }

            let button = <div key="loadmore" className="dwkit-repeater-loadmore"><Button
                onClick={options.loadNextPage}>{buttonLabel}</Button></div>;
            res.push(button);
        }

        return res;
    }

    function renderItem(index, item, includeDropzone) {
        //Checking visible condition in builder mode
        if (!options.props.controlProps.buildermode) {
            if (options.props['item-visibleCondition'] !== '' &&
                options.props['item-visibleCondition'] !== undefined &&
                options.props['item-visibleCondition'] !== null) {
                let args = 'data';
                let body = 'return ' + options.props['item-visibleCondition'];
                try {
                    if (!new Function(args, body)(item)) {
                        return undefined;
                    }
                }
                catch (e) {
                    return undefined;
                }
            }
        }

        let element = undefined;
        const createBuilderDropzone = options.props.controlProps.createBuilderDropzone;

        if (isDefined(options.props.placeholders) &&
            Array.isArray(options.props.placeholders[options.psTemplate]) &&
            options.props.placeholders[options.psTemplate].length > 0) {
            let model = options.props.placeholders[options.psTemplate];
            if (isDefined(model)) {
                element = (
                    <RepeaterControl key={index} parent={options.me} model={model} psTemplate={options.psTemplate}
                                     item={item} controlProps={options.props.controlProps}
                                     includeDropzone={includeDropzone}
                                     errors={Array.isArray(options.props.error) ? options.props.error[index] : undefined}
                                     index={index} handleChange={options.handleChange} data={options.props.data}
                                     parentItem={options.props.model}
                    />);
            }
        }
        else if (includeDropzone && createBuilderDropzone) {
            element = createBuilderDropzone(
                'repeater_dropzone_footer',
                options.props.model.key,
                undefined,
                undefined,
                options.psTemplate
            );
        }

        return element;
    }

    let className = 'dwkit-repeater';
    if (options.props.className) {
        className += ' ' + options.props.className;
    }

    if (options.isServerMode) {
        if (options.state.firstLoad) {
            options.state.firstLoad = false;
            options.loadNextPage();
            return (<div className={className} style={options.props.style}>
                {options.state.loading && <Loader active inline='centered'/>}
            </div>);
        }
    }

    if (options.props.slider && options.state.items.length > 0) {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (<div className={className} style={options.props.style}>
            <Slider {...settings}>
                {renderItems(options.state.items, options.state.rowsCount, true)}
            </Slider>
            {options.state.loading && <Loader active inline='centered'/>}
        </div>);
    }

    return (<div className={className} style={options.props.style}>
        {renderItems(options.state.items, options.state.rowsCount)}
        {options.state.loading && <Loader active inline='centered'/>}
    </div>);
});
