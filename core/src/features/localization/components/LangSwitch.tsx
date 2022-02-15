import {observer} from "mobx-react";
import {useTranslation} from "react-i18next";
import {useStore} from "../../../utils/StoreContext";
import {languages} from "../consts";
import {Dropdown} from "rsuite";
import React from "react";

export const LangSwitch = observer(() => {
    const {t} = useTranslation();
    const store = useStore();

    const children: any[] = [];
    languages.forEach((lang, index) => {
        children.push(<Dropdown.Item key={index} onSelect={() => store.language = lang} eventKey={lang.code}>
            {lang.name}
        </Dropdown.Item>);
    });

    return <Dropdown title={t('leftMenu.translation')}>
        {children}
    </Dropdown>;
});