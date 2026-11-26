import React, {CSSProperties} from 'react'
import {GitHubLogo} from './GitHubLogo'

const containerStyle: CSSProperties = {
  display: 'flex',
  bottom: 15,
  flexDirection: 'column',
  gap: 10,
  textAlign: 'left',
  fontSize: '0.8rem',
  marginInlineStart: 17
}

const buttonStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: 10,
  alignItems: 'center',
  padding: 8,
  maxWidth: 214,
  borderRadius: 10,
  backgroundColor: 'rgb(138 138 138 / 12%)',
  color: 'inherit',
  fontFamily: 'var(--ifm-heading-font-family)'
}

const headerStyle: CSSProperties = {
  fontSize: 15,
  fontWeight: 700
}

export const GitHubButton = () => {
  return <div style={containerStyle}>
    <div style={{marginInlineStart: 2}}>
      <div style={headerStyle}>Stay in the know</div>
      <div>Quickly Build Drag-and-Drop Forms</div>
    </div>

    <a href="https://github.com/OptimaJetLLC/formengine" target="_blank" style={buttonStyle}>
      <GitHubLogo/>
      <span style={headerStyle}>Star us on GitHub</span>
    </a>
  </div>
}
