import {useContext} from "react";
import {useStore} from "../../utils/StoreContext";

export default () => {
    const store = useStore()
    var data = "data:text/json;charset=utf-8," + encodeURIComponent(store.stringifyForm());

    const link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', "form.json");
    document.body.appendChild(link);
    link.onclick = () => {
        document.body.removeChild(link);
    };
    link.click();
}
