import styled from '@emotion/styled'
import React, {ReactNode, useState} from 'react'
import {createPortal} from 'react-dom'

interface IframeProps {
  children: ReactNode
}

// todo unused
export const Iframe = ({children, ...props}: IframeProps) => {
  const [ref, setRef] = useState<HTMLIFrameElement | null>(null)

  const mountNode = ref?.contentWindow?.document?.body

  if (ref?.contentWindow) {
    ref.contentWindow.document.body.style.margin = 'auto'
  }

  return (
    <SIframe scrolling="no" {...props} ref={setRef}>
      {mountNode && createPortal(children, mountNode)}
    </SIframe>
  )
}

const SIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`
