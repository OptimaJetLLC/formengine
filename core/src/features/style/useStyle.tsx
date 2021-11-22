import {ComponentStore} from "../../stores/ComponentStore";
import {useEffect} from "react";
import {autorun} from "mobx";
import _ from "lodash";
import {transformStyles} from "./transformStyles";

//TODO Optimize?
export function useStyle(componentStore: ComponentStore) {
    useEffect(() => {
        let disposer = autorun(() => {
            let styles = componentStore.styles
            if (_.isEmpty(styles)) return;
            componentStore.props.style = transformStyles(componentStore);
        })

        return () => disposer();
    }, []);
}