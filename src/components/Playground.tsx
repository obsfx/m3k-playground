import { useState, useRef, useEffect } from 'react'
import { FiPlay, FiBox } from 'react-icons/fi'
import styled from 'styled-components'
// @ts-ignore
import beautify from 'js-beautify'
import m3k from 'm3k'
import { Token } from 'm3k/build/types/token.types'
import { AST } from 'm3k/build/types/ast.types'
import 'typeface-inter'
import { Editor } from './Editor'

const PlaygroundWrapper = styled.div<{ width: string }>`
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
  max-width: ${(props) => props.width};
  box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 62%);
  border-radius: 5px;
  overflow: hidden;
`

const PlaygroundBodyWrapper = styled.div`
  display: flex;
`

const PlaygroundEditorSections = styled.div`
  width: 50%;
  height 100%;
  display: flex;
  flex-direction: column;
`

const PlaygroundEditorSectionWrapper = styled.div<{ height: string }>`
  display: flex;
  position: relative;
  height: calc(${(props) => props.height} / 2);
  overflow: hidden;
`

const PlaygroundEditorSectionTitle = styled.div`
  background-color: #98ffc9;
  padding: 3px 6px;
  border-radius: 5px;
  color: #0a0a0a;
  font-weight: 500;
  font-size: 11px;
  top: 50%;
  left: 5px;
  position absolute;
  z-index: 2;
  user-select: none;
  transform-origin: 0 0;
  transform: rotate(90deg) translate(-50%, -25px);
`

const EditorWrapper = styled.div`
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  background-color: #fffffe;
  position: relative;
  z-index: 1;
  color: #0a0a0a;
  font-size: 12px;
  font-weight: 500;
`

const PlaygroundBottomWrapper = styled.div`
  display: flex;
  overflow: hidden;
  background-color: #f5f5f5;
  justify-content: space-between;
`

const OutputWrapper = styled.div`
  border-left: 4px solid #e5e5e5;
  box-sizing: border-box;
  width: 50%;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
`

const CompileButton = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #0a0a0a;
  cursor: pointer;
  padding: 10px 16px;
  background-color: #98ffc9;
  display: flex;
  align-items: center;

  svg {
    padding-right: 6px;
  }

  &:hover {
    background-color: #5bffa9;
    box-shadow: 0px 0px 20px #05fe7c;
    z-index: 1;
  }

  &:active {
    background-color: #17fc84;
  }
`

const PlaygroundInfo = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #0a0a0a;
  padding: 10px 16px;
`

const PlaygroundInfoTitle = styled.div`
  display: flex;
  align-items: center;

  svg {
    padding-right: 6px;
  }
`

const PlaygroundGithub = styled.a`
  text-decoration: none;
  color: #929292;

  &:hover {
    color: #3c3a3a;
  }
`

const Error = styled.div`
  margin: 10px;
  color: red;
  border: 1px solid red;
  background-color: #ffe2e2;
  padding: 12px;
`

export const Playground: React.FC<{
  width: string
  height: string
  code: string
}> = ({ width, height, code }) => {
  const [source, setSource] = useState({ code })
  const [compiled, setCompiled] = useState({ code: '' })
  const [error, setError] = useState<{ name: string; message: string } | null>(null)

  const sourceEditor = useRef(null)

  const handleCompileButtonClick = () => {
    if (sourceEditor) {
      setSource({ code: (sourceEditor as any).current.getValue() })
    }
  }

  useEffect(() => {
    setError(null)
    try {
      const tokens: Token[] = m3k.tokenize(source.code)
      const ast: AST = m3k.parse(tokens)
      const transformedAST: AST = m3k.transform(ast)
      const code: string = m3k.generate(transformedAST)
      setCompiled({ code: beautify(code, { indent_size: 2, space_in_empty_paren: true }) })
    } catch (e) {
      setError(e)
    }
  }, [source])

  useEffect(() => {
    const evalCode = `
      const __document = document.getElementById('m3k-playground-output').contentWindow.document;
      __document.body.innerHTML = '';
      ${compiled.code.split('document').join('__document')}
      `

    try {
      // eslint-disable-next-line
      eval(evalCode)
    } catch (e) {
      setError(e)
    }
  }, [compiled])

  return (
    <PlaygroundWrapper width={width}>
      <PlaygroundBodyWrapper>
        <PlaygroundEditorSections>
          <PlaygroundEditorSectionWrapper height={height}>
            <PlaygroundEditorSectionTitle>Source</PlaygroundEditorSectionTitle>
            <EditorWrapper style={{ borderBottom: '4px solid #e5e5e5' }}>
              <Editor
                width="100%"
                height="100%"
                code={source.code}
                onMount={(editor) => {
                  sourceEditor.current = editor
                }}
              />
            </EditorWrapper>
          </PlaygroundEditorSectionWrapper>

          <PlaygroundEditorSectionWrapper height={height}>
            <PlaygroundEditorSectionTitle>Compiled JavaScript</PlaygroundEditorSectionTitle>
            <EditorWrapper>
              <Editor width="100%" height="100%" code={compiled.code} readOnly={true} />
            </EditorWrapper>
          </PlaygroundEditorSectionWrapper>
        </PlaygroundEditorSections>

        <OutputWrapper>
          {error ? (
            <Error>
              {error.name}: {error.message}
            </Error>
          ) : (
            <iframe id="m3k-playground-output" title="m3k playground"></iframe>
          )}
        </OutputWrapper>
      </PlaygroundBodyWrapper>

      <PlaygroundBottomWrapper>
        <ButtonsWrapper>
          <CompileButton onClick={handleCompileButtonClick}>
            <FiPlay />
            Compile & Run
          </CompileButton>
        </ButtonsWrapper>

        <PlaygroundInfo>
          <PlaygroundInfoTitle>
            <FiBox />
            m3k playground
          </PlaygroundInfoTitle>

          <PlaygroundGithub href="https://github.com/obsfx/m3k" target="_blank">
            github.com/obsfx/m3k
          </PlaygroundGithub>
        </PlaygroundInfo>
      </PlaygroundBottomWrapper>
    </PlaygroundWrapper>
  )
}
