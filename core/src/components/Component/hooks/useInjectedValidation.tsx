import {FieldProps} from "../../../features/validation/useValidation";
import {useEffect} from "react";

export function useInjectedValidation(events: Record<string, any>, eventActions: Record<string, any[]>, field: FieldProps) {
    useEffect(() => {
        if (eventActions["onChange"]) eventActions["onChange"].push(field.setValue)
        else events.onChange = field.setValue

        if (eventActions["onBlur"]) eventActions["onBlur"].push(() => field.setTouched())
        else events.onBlur = () => field.setTouched()

        //props.value = field.value
    }, [events])
}