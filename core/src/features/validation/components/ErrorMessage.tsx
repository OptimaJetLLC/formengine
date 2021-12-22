import styled from "@emotion/styled";
import {FieldMetaProps} from "formik";


interface ErrorMessageProps extends FieldMetaProps<any>{
    className?: string
}

const element = (props: ErrorMessageProps) => {

    //if (!props.touched) return null
    if (!props.error) return null


    return <div className={props.className}>
        {props.error}
    </div>
}

const ErrorMessage = styled(element)`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

export {ErrorMessage}
