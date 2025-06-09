import {namedObserver, useComponentData} from '@react-form-builder/core'
import type {ErrorInfo, ReactNode} from 'react'
import {Component} from 'react'

interface ComponentRenderErrorProps {
  error?: Error
  info?: ErrorInfo
}

const preStyle = {
  fontSize: 'small',
  marginTop: '0',
  marginLeft: 20,
}

const RawComponentRenderError = (props: ComponentRenderErrorProps) => {
  const componentData = useComponentData()
  return <div>
    <p>Component <code>{componentData.key}</code> render error: </p>
    <p>
      <strong>{props.error?.message}:</strong>
      <pre style={preStyle}>{props.error?.stack}</pre>
    </p>
    <p>
      <strong>Component stack</strong>:
      <pre style={preStyle}>{props.info?.componentStack}</pre>
    </p>
  </div>
}

const ComponentRenderError = namedObserver('ComponentRenderError', RawComponentRenderError)

/**
 * The ErrorBoundary component state.
 */
export interface ErrorBoundaryState {

  /**
   * Flag, if true, a rendering error occurred.
   */
  hasError: boolean

  /**
   * The rendering error.
   */
  error?: Error

  /**
   * The rendering error info.
   */
  info?: ErrorInfo
}

/**
 * The ErrorBoundary component properties.
 */
export interface ErrorBoundaryProps {
  /**
   * The React child node.
   */
  children: ReactNode
}

/**
 * The component for showing rendering errors.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

  state: ErrorBoundaryState = {hasError: false}

  /**
   * React method for catching errors.
   * @param error the error that was thrown.
   * @returns the component state.
   */
  static getDerivedStateFromError(error: any) {
    return {hasError: true, error}
  }

  /**
   * @inheritDoc
   */
  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({hasError: true, error, info})
  }

  /**
   * @inheritDoc
   */
  render() {
    if (this.state.hasError) {
      return <ComponentRenderError error={this.state.error} info={this.state.info}/>
    }

    return this.props.children
  }
}
