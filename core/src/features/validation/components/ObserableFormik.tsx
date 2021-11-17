import {withFormik} from "formik";
import {store} from "../../../stores/Store";
import {observable} from "mobx";
import {Form} from "./Form";

export const ObservableFormik = withFormik({
    mapPropsToValues: () => store.currentNode!.data.props,
    mapPropsToStatus: () => observable({}),
    mapPropsToErrors: () => observable({}),
    mapPropsToTouched: () => observable({}),
    handleSubmit: (values, {setSubmitting}) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },
})(Form)