import {useComponentData} from "../../../../../utils/contexts/ComponenDataContext";
import {DropZone} from "../components/DropZone";
import {css} from "@emotion/css";

export const useInnerDropZone = (props: Record<string, any>) => {
    const {componentStore, definition} = useComponentData()

    const containers = definition.annotations.filter(value => value.isContainer);

    for (let container of containers) {
        if (!props[container.key]) {
            let visibleBindTo = container.bindTo ? componentStore.props[container.bindTo] : undefined

            props[container.key] =
                <DropZone
                    inner
                    bindTo={container.key}
                    visible={visibleBindTo}
                    isBefore={true}
                    className={innerDropZone}
                />
        }
    }
}

const innerDropZone = css`
  label: Empty;
  background-color: #9ab1ce;
  line-height: 50px;
`