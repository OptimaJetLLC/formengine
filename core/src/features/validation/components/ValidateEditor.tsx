import _ from "lodash";
import {Button, Dropdown, Input} from "rsuite";
import {PropertyEditorProps} from "../../../api/types";
import {StringRules, ValueType} from "../const";

export const ValidateEditor = ({annotation, componentStore, onBlur, onChange, value}: PropertyEditorProps<any>) => {
    const schema = componentStore.validation

    if (!schema)
        return <div>
            <Dropdown style={{display: "flex"}}
                      renderToggle={(props, ref) => (
                          <Button {...props} ref={ref} block>
                              <h6> Choose your type </h6>
                          </Button>
                      )}>
                {
                    Object.keys(ValueType).map((type) => (
                        <Dropdown.Item
                            key={type}
                            children={type}
                            eventKey={type}
                            onSelect={(eventKey) => {
                                componentStore.validation = {type: eventKey, rules: {}}
                            }}
                        />
                    ))
                }
            </Dropdown>
        </div>


    //TODO для правил валидации проверять обязательность поля
    return <div>
        {schema.type && <h6>Your type is {schema.type}</h6>}

        {/*List of rules*/}
        {Object.keys(schema.rules).map(key => {
            const desc = _.find(StringRules, {key})

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
                                  renderToggle={(props, ref) => (
                                      <Button {...props} ref={ref} block>
                                          <h6> AddRule </h6>
                                      </Button>
                                  )}>
            {
                StringRules.map((rule) => (
                    <Dropdown.Item
                        key={rule.name}
                        children={rule.name}
                        eventKey={rule.key}
                        onSelect={(eventKey) => {
                            schema.rules[eventKey] = {}
                        }}
                    />
                ))
            }
        </Dropdown>}
    </div>
}

