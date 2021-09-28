
export interface AHeaderProps {
    main: {
        content: string
        subheader: string
    }
}

//TODO remove it
export const AHeader = (props : AHeaderProps ) => {

    return (
        <div style={{textAlign: 'center'}}>
            <h4>{props.main.content}</h4>
            <label>{props.main.subheader}</label>
        </div>
    );
}
