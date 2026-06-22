import {define} from '@react-form-builder/core'
import {useCallback, useEffect, useState} from 'react'

const ThrowErrorComponent = () => {
  const [error, setError] = useState(false)

  const clickError = useCallback(() => {
    throw new Error('event error')
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(true)
    }, 1500)
    return () => clearTimeout(timeout)
  }, [])

  if (error) throw new Error('Unexpected error')
  return <div onClick={clickError}>I'm fine!</div>
}

export const throwErrorComponent = define(ThrowErrorComponent, 'ThrowErrorComponent')
  .name('ThrowErrorComponent')
  .category('Error')
