import React from 'react'

const toObject = (data) => {
  try {
    return JSON.parse(data)
  } catch {
    return {}
  }
}

export const Tracking = ({children, eventData}: any) => {
  const onClick = () => {
    const data = toObject(eventData)
    //@ts-ignore
    window.dataLayer?.push({'event': 'codeBlockClick', ...data})
  }

  return <div onClick={onClick}>
    {children}
  </div>
}

export default Tracking
