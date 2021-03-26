import { draw } from 'optimajet-builder-shared';

export default function drawcontrol(name, options){
    let model = options.model ? options.model : {};

    if(options.placeholder){
        model.placeholder = options.placeholder;
    }
    return draw(name, 
        { props: 
            { name: options.name, 
                value: options.value, 
                additionalParams: {
                    model
                } 
            }, 
            model,
            controlProps: {
                style: options.style
            },
            label: options.label, 
            onChange: options.onChange 
        });
}
