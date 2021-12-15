import {define} from "../../features/annotation/define";

//TODO remove it? Or сделать копмонентом непривязанным к rsuite
const MyDiv = () => {

    return (
        <div>

        </div>
    );
}

export const root = define("root", MyDiv, {
})

