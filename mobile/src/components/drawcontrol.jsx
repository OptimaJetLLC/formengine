import { draw } from 'optimajet-builder-shared';

export default function drawcontrol(name, options){
    return draw(name, 
        { props: 
            { name: options.name, 
                value: options.value, 
                additionalParams: {
                    model: {}
                } 
            }, 
            controlProps: {}, 
            label: options.label, 
            onChange: options.onChange 
        });
    }
