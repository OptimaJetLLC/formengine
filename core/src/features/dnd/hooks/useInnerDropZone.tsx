import {useComponentData} from "../../../utils/ComponenDataContext";
import {DropZone} from "../components/DropZone";
import {css} from "@emotion/css";

export const useInnerDropZone = (props: Record<string, any>) => {
    const {componentStore, definition} = useComponentData()

    const containers = definition.annotations.filter(value => value.isContainer);

    for (let container of containers) {
        if (!props[container.key]) {
            let bindTo = container.bindTo ? componentStore.props[container.bindTo] : container.key

            props[container.key] =
                <DropZone
                    inner
                    bindTo={bindTo}
                    isBefore={true}
                    className={css`
                      label: Empty;
                      background-color: #9ab1ce;
                      line-height: 50px;
                    `
                    }/>
        }
    }
}