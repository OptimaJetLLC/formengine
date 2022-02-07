import {Button, Dropdown, Input} from "rsuite";
import {PropertyEditorProps} from "../../annotation/types";
import {StringRules} from "../rules/StringRules";
import {StringRuleKey, ValueType} from "../types";
import { useTranslation } from 'react-i18next';
import {RefObject} from "react";

export const ValidateEditor = ({annotation, componentStore, onBlur, onChange, value}: PropertyEditorProps<any>) => {
    const schema = componentStore.validation;
    const { t } = useTranslation();

    if (!schema) {
        return <div>
            <Dropdown style={{ display: "flex" }}
                      renderToggle={(props: any, ref: any) => (
                          <Button {...props} ref={ref} block>
                              <h6>{t('validation.chooseValidation')}</h6>
                          </Button>
                      )}>
                {
                    Object.keys(ValueType).map((type) => (
                        <Dropdown.Item
                            key={type}
                            children={type}
                            eventKey={type}
                            onSelect={(eventKey) => {
                                componentStore.validation = { type: eventKey, rules: {} }
                            }}
                        />
                    ))
                }
            </Dropdown>
        </div>
    }

    //TODO для правил валидации проверять обязательность поля
    return <div>
        {schema.type && <h6>Your type is {schema.type}</h6>}

        {/*List of rules*/}
        {Object.keys(schema.rules).map(key => {
            const desc = StringRules[key as StringRuleKey]

            if (!desc) return null

            return <div key={key}>
                <h6>{desc.name}</h6>
                {desc.params.map((param) => {
                    return <div key={param.name}>
                        <label>{param.name}</label>
                        <Input key={param.name} value={schema.rules[key][param.name]}
                               onChange={value => schema.rules[key][param.name] = value}/>
                    </div>
                })}
            </div>
        })}

        {schema.type && <Dropdown style={{display: "flex"}}
                                  renderToggle={(props: any, ref: any) => (
                                      <Button {...props} ref={ref} block>
                                          <h6> {t('validation.addRule')} </h6>
                                      </Button>
                                  )}>
            {schema.type === ValueType.string ?
                Object.entries(StringRules).map(([key, rule]) => (
                    <Dropdown.Item
                        key={rule.name}
                        children={rule.name}
                        eventKey={key}
                        onSelect={(eventKey) => {
                            schema.rules[eventKey] = {}
                        }}
                    />
                )) : <>
                    <Dropdown.Item>Need TODO</Dropdown.Item>
                    <Dropdown.Item>This work only for string now</Dropdown.Item>
                </>
            }
        </Dropdown>}
    </div>
}

