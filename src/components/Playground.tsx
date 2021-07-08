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
  color: #ffffff;
`

const PlaygroundBottomWrapper = styled.div`
  display: flex;
  overflow: hidden;
  background-color: #f5f5f5;
  justify-content: space-between;
`

const OutputWrapper = styled.div`
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

export const Playground: React.FC<{
  width: string
  height: string
  code: string
}> = ({ width, height, code }) => {
  const [source, setSource] = useState(code)
  const [compiled, setCompiled] = useState('')

  const sourceEditor = useRef(null)

  const compile = () => {
    if (sourceEditor) {
      setSource((sourceEditor as any).current.getValue())
    }
  }

  useEffect(() => {
    const tokens: Token[] = m3k.tokenize(source)
    const ast: AST = m3k.parse(tokens)
    const transformedAST: AST = m3k.transform(ast)
    const code: string = m3k.generate(transformedAST)
    setCompiled(beautify(code, { indent_size: 2, space_in_empty_paren: true }))
  }, [source])

  useEffect(() => {
    const evalCode = `
      const __document = document.getElementById('m3k-playground-output').contentWindow.document;
      __document.body.innerHTML = '';
      ${compiled.split('document').join('__document')}
    `

    eval(evalCode)
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
                code={source}
                onMount={(editor) => {
                  sourceEditor.current = editor
                }}
              />
            </EditorWrapper>
          </PlaygroundEditorSectionWrapper>

          <PlaygroundEditorSectionWrapper height={height}>
            <PlaygroundEditorSectionTitle>Compiled JavaScript</PlaygroundEditorSectionTitle>
            <EditorWrapper>
              <Editor width="100%" height="100%" code={compiled} readOnly={true} />
            </EditorWrapper>
          </PlaygroundEditorSectionWrapper>
        </PlaygroundEditorSections>

        <OutputWrapper>
          <iframe id="m3k-playground-output" title="m3k playground"></iframe>
        </OutputWrapper>
      </PlaygroundBodyWrapper>

      <PlaygroundBottomWrapper>
        <ButtonsWrapper>
          <CompileButton onClick={compile}>
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
