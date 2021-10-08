import {define} from "../utils/define";
import {Container} from "rsuite";

//TODO property what say it is a container and can have children. Create smth like reactnode property?
export const container = define("Container", Container, {
    children: undefined
})
