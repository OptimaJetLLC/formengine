import { FbEvent } from './fb-event';

// todo remove any
export interface FbProps {
    // todo any?
    row: any,

    handleChange: (row: any, e: FbEvent | null, data: any | null) => void;
}
