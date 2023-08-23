import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faCheck from '@fortawesome/free-solid-svg-icons/faCheck.js'
import {useStore} from '@react-form-builder/core'
import {useState} from 'react'
import {Input, InputGroup} from 'rsuite'
import {useEditor} from '../../utils/useEditor'
import {FaIcon} from '../components/Icons'
import LabeledProperty from '../components/LabeledProperty'
import {useTranslationPart} from '../localization/hooks'
import {Hinted} from './Hinted'

/**
 * The property editor for the key property type.
 * @returns the React element.
 */
const KeyInput = () => {
  const viewerStore = useStore()
  const {value, onChange, annotation} = useEditor()
  const [canApply, setCanApply] = useState(false)
  const [valueToApply, setValueToApply] = useState(value)
  const getLabel = useTranslationPart('propertiesEditor')

  const validateUniqueKey = (key: string) =>
    0 === viewerStore.reduceScreen((acc, cd) => cd.key === key ? acc + 1 : acc, 0)
    && key.length > 0

  const inputOnChange = (inputValue: string) => {
    setCanApply(validateUniqueKey(inputValue))
    setValueToApply(inputValue)
  }

  const buttonOnClick = () => {
    if (canApply) {
      onChange(valueToApply)
      setCanApply(false)
    }
  }

  return (
    <LabeledProperty annotation={annotation}>
      <InputGroup>
        <Input
          value={valueToApply}
          onChange={inputOnChange}
          size={'xs'}
        />
        <Hinted hint={getLabel('applyKey')}>
          <InputGroup.Button
            disabled={!canApply}
            onClick={buttonOnClick}
            size="xs">
            <FaIcon icon={faCheck as unknown as IconDefinition}/>
          </InputGroup.Button>
        </Hinted>
      </InputGroup>
    </LabeledProperty>
  )
}

export {KeyInput}
