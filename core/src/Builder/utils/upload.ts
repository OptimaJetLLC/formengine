import {useContext} from "react";
import {useStore} from "../../utils/StoreContext";

export default () => {
    const store = useStore()
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {

        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];

        // setting up the reader
        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            var content: string = readerEvent.target?.result as string ?? ""; // this is the content!

            store.parseForm(content)
        }

    }

    input.click();
}
