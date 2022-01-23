import {PropertyEditorProps} from "../../types";
import {Rows} from "../../../../components/UI/Containers";
import CSSList from "./components/CSSList";
import StandardStyles from "./components/StandardStyles";
import {StandardStylesDefinitions} from "../../../style";
import CSSBlock from "./components/CSSBlock";
import { useTranslation } from 'react-i18next';

const Style = ({componentStore}: PropertyEditorProps<Record<string, string>[] | undefined>) => {
    const { t } = useTranslation();

    //TODO mobx.createViewModel (непонятно как заставить работать с массивами) https://github.com/mobxjs/mobx-utils/issues/209
    return <Rows ml={"5px"} my={0}>
        <div>
            <h6>{t('style.size')}</h6>
            <StandardStyles componentStore={componentStore} stylesDefinition={SizeStyles}/>
        </div>
        <div>
            <h6>{t('style.indent')}</h6>
            <StandardStyles componentStore={componentStore} stylesDefinition={IndentStyles}/>
        </div>
        <div>
            <h6>{t('style.other')}</h6>
            <StandardStyles componentStore={componentStore} stylesDefinition={OtherStyles}/>
        </div>
        <div>
            <h6>{t('style.cssStyles')}</h6>
            <CSSList componentStore={componentStore}/>
        </div>
        <div>
            <h6 style={{marginBottom: 5}}>{t('style.cssStyleBlock')}</h6>
            <CSSBlock componentStore={componentStore}/>
        </div>
    </Rows>;
}

const pick = (object: any, keys: string[]) => {
    const result: any = {};
    keys.forEach(key => {
        if (object[key]) result[key] = object[key];
    })
    return result;
};
const SizeStyles = pick(StandardStylesDefinitions, ["Width", "Height"])
const IndentStyles = pick(StandardStylesDefinitions, ["Left", "Right", "Top", "Bottom"])
const OtherStyles = pick(StandardStylesDefinitions, ["Corner radius", "Rotation"])

export default Style;
