import React from 'react'
import MonacoEditor from '@monaco-editor/react'
import 'typeface-ubuntu-mono'

export const Editor: React.FC<{
  width: string
  height: string
  code: string
  onMount?: (editor: any) => void
  readOnly?: boolean
}> = ({ width, height, code, onMount, readOnly }) => {
  return (
    <MonacoEditor
      width={width}
      height={height}
      theme="light"
      defaultLanguage="scheme"
      value={code}
      options={{
        fontSize: 14,
        fontFamily: 'Ubuntu Mono',
        minimap: {
          enabled: false,
        },
        readOnly,
      }}
      onMount={onMount}
    />
  )
}
