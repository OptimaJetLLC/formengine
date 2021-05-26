import { draw } from 'optimajet-builder-shared';

export default function drawcontrol(name, { placeholder, value, style, label, onChange, ...options}){
    let model = options.model ? options.model : {};

    if(placeholder){
        model.placeholder = placeholder;
    }
    return draw(name, 
        { props: 
            { name: options.name, 
                value: value, 
                additionalParams: {
                    model
                } 
            }, 
            model,
            controlProps: {
                style: style
            },
            label: label, 
            onChange: onChange,
            ...options
        });
}
