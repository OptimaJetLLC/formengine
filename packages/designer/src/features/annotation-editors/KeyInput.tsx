import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faCheck from '@fortawesome/free-solid-svg-icons/faCheck.js'
import {namedObserver, useStore} from '@react-form-builder/core'
import type {KeyboardEvent} from 'react'
import {useCallback, useMemo, useState} from 'react'
import {Input, InputGroup} from 'rsuite'
import {FaIcon} from '../components/Icons'
import LabeledProperty from '../components/LabeledProperty'
import {useTranslationPart} from '../localization/hooks'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {Hinted} from './Hinted'

interface KeyInputProps extends AnnotationEditorProps {
  id?: string
}

const KeyInputGroup = (props: KeyInputProps) => {
  const viewerStore = useStore()
  const {id, value, onChange, showError} = props
  const [canApply, setCanApply] = useState(false)
  const [valueToApply, setValueToApply] = useState(value)
  const [prevValue, setPrevValue] = useState(value)
  const getLabel = useTranslationPart('propertiesEditor')

  if (value !== prevValue) {
    setPrevValue(value)
    setValueToApply(value)
    setCanApply(false)
  }

  const validateUniqueKey = useCallback((key: string) =>
    0 === viewerStore.reduceScreen((acc: number, cd) => cd.key === key ? acc + 1 : acc, 0)
    && key.length > 0, [viewerStore])

  const inputOnChange = useCallback((inputValue: string) => {
    const isValid = validateUniqueKey(inputValue)
    let error = undefined

    if (!isValid && inputValue !== value) {
      const label = inputValue.length > 0 ? 'keyMustBeUnique' : 'keyMustNotBeEmpty'
      error = getLabel(label)
    }

    showError?.(error)
    setCanApply(isValid)
    setValueToApply(inputValue)
  }, [value, getLabel, showError, validateUniqueKey])

  const buttonOnClick = useCallback(() => {
    if (canApply) {
      onChange(valueToApply)
      setCanApply(false)
    }
  }, [canApply, onChange, valueToApply])

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && canApply) {
      buttonOnClick()
    }
  }, [canApply, buttonOnClick])

  const applyKeyLabel = useMemo(() => getLabel('applyKey'), [getLabel])

  return (
    <InputGroup size={'xs'}>
      <Input id={id} value={valueToApply} onChange={inputOnChange} onKeyDown={handleKeyDown}/>
      <Hinted hint={applyKeyLabel}>
        <InputGroup.Button disabled={!canApply} onClick={buttonOnClick}>
          <FaIcon icon={faCheck as unknown as IconDefinition}
                  color={canApply ? 'green' : undefined}/>
        </InputGroup.Button>
      </Hinted>
    </InputGroup>
  )
}

/**
 * The property editor for the key property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
const RawKeyInput = (props: AnnotationEditorProps) => (
  <LabeledProperty {...props}>
    <KeyInputGroup {...props}/>
  </LabeledProperty>
)

export const KeyInput = namedObserver('KeyInput', RawKeyInput)
