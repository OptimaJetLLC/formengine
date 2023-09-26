import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faCheck from '@fortawesome/free-solid-svg-icons/faCheck.js'
import {useStore} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {useEffect, useState} from 'react'
import {Input, InputGroup} from 'rsuite'
import {FaIcon} from '../components/Icons'
import LabeledProperty from '../components/LabeledProperty'
import {useTranslationPart} from '../localization/hooks'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {Hinted} from './Hinted'

/**
 * The property editor for the key property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const KeyInput = observer((props: AnnotationEditorProps) => {
  const viewerStore = useStore()
  const {value, onChange, showError} = props
  const [canApply, setCanApply] = useState(false)
  const [valueToApply, setValueToApply] = useState(value)
  const getLabel = useTranslationPart('propertiesEditor')

  useEffect(() => {
    setValueToApply(value)
  }, [value])

  const validateUniqueKey = (key: string) =>
    0 === viewerStore.reduceScreen((acc: number, cd) => cd.key === key ? acc + 1 : acc, 0)
    && key.length > 0

  const inputOnChange = (inputValue: string) => {
    const isValid = validateUniqueKey(inputValue)
    if (!isValid) {
      const label = inputValue.length > 0 ? 'keyMustBeUnique' : 'keyMustNotBeEmpty'
      showError?.(getLabel(label))
    }
    if (isValid || inputValue === value) showError?.(undefined)
    setCanApply(isValid)
    setValueToApply(inputValue)
  }

  const buttonOnClick = () => {
    if (canApply) {
      onChange(valueToApply)
      setCanApply(false)
    }
  }

  return (
    <LabeledProperty {...props}>
      <InputGroup size={'xs'}>
        <Input value={valueToApply} onChange={inputOnChange}/>
        <Hinted hint={getLabel('applyKey')}>
          <InputGroup.Button disabled={!canApply} onClick={buttonOnClick}>
            <FaIcon icon={faCheck as unknown as IconDefinition}
                    color={canApply ? 'green' : undefined}/>
          </InputGroup.Button>
        </Hinted>
      </InputGroup>
    </LabeledProperty>
  )
})
