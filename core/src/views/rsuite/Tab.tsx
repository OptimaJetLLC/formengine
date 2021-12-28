import {define} from "../../features/annotation/define";
import {Nav} from "rsuite";
import {useState} from "react";

//TODO
const Tab = () => {
    const [active, setActive] = useState('home');

    return (
        <Nav activeKey={active} onSelect={setActive} >
            <Nav.Item eventKey="home">
                Home
            </Nav.Item>
            <Nav.Item eventKey="news">News</Nav.Item>
            <Nav.Item eventKey="solutions">Solutions</Nav.Item>
            <Nav.Item eventKey="products">Products</Nav.Item>
            <Nav.Item eventKey="about">About</Nav.Item>
        </Nav>

    );
}

export const tab = define("Tab", Tab, {})

