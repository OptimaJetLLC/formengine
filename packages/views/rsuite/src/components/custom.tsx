import { define, event } from "@react-form-builder/core";
import { useEffect, useState } from "react";

/**
 * React component
 * @param props sadsad
 * @param props.onLoad asd as
 * @returns asdsdas
 */
export function RsCustomComponent({onLoad}: {
  /**
   *
   */
  onLoad: (callback: (data: any) => void) => void;
}) {
  const [data, setData] = useState<any>();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(performance.now(), "effect in component");
    onLoad(321)
  }, [onLoad]);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export const RsCustomComponentDefinition = define(
  RsCustomComponent,
  "RsCustomComponent"
).props({
  onLoad: event,
});
