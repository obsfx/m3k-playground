"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var fi_1 = require("react-icons/fi");
var styled_components_1 = __importDefault(require("styled-components"));
// @ts-ignore
var js_beautify_1 = __importDefault(require("js-beautify"));
var m3k_1 = __importDefault(require("m3k"));
require("typeface-inter");
var Editor_1 = require("./Editor");
var PlaygroundWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-family: 'Inter', sans-serif;\n  box-sizing: border-box;\n  max-width: ", ";\n  box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 62%);\n  border-radius: 5px;\n  overflow: hidden;\n"], ["\n  font-family: 'Inter', sans-serif;\n  box-sizing: border-box;\n  max-width: ", ";\n  box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 62%);\n  border-radius: 5px;\n  overflow: hidden;\n"])), function (props) { return props.width; });
var PlaygroundBodyWrapper = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
var PlaygroundEditorSections = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 50%;\n  height 100%;\n  display: flex;\n  flex-direction: column;\n"], ["\n  width: 50%;\n  height 100%;\n  display: flex;\n  flex-direction: column;\n"])));
var PlaygroundEditorSectionWrapper = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  position: relative;\n  height: calc(", " / 2);\n  overflow: hidden;\n"], ["\n  display: flex;\n  position: relative;\n  height: calc(", " / 2);\n  overflow: hidden;\n"])), function (props) { return props.height; });
var PlaygroundEditorSectionTitle = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  background-color: #98ffc9;\n  padding: 3px 6px;\n  border-radius: 5px;\n  color: #0a0a0a;\n  font-weight: 500;\n  font-size: 11px;\n  top: 50%;\n  left: 5px;\n  position absolute;\n  z-index: 2;\n  user-select: none;\n  transform-origin: 0 0;\n  transform: rotate(90deg) translate(-50%, -25px);\n"], ["\n  background-color: #98ffc9;\n  padding: 3px 6px;\n  border-radius: 5px;\n  color: #0a0a0a;\n  font-weight: 500;\n  font-size: 11px;\n  top: 50%;\n  left: 5px;\n  position absolute;\n  z-index: 2;\n  user-select: none;\n  transform-origin: 0 0;\n  transform: rotate(90deg) translate(-50%, -25px);\n"])));
var EditorWrapper = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: 100%;\n  padding: 16px;\n  box-sizing: border-box;\n  background-color: #fffffe;\n  position: relative;\n  z-index: 1;\n  color: #0a0a0a;\n  font-size: 12px;\n  font-weight: 500;\n"], ["\n  width: 100%;\n  padding: 16px;\n  box-sizing: border-box;\n  background-color: #fffffe;\n  position: relative;\n  z-index: 1;\n  color: #0a0a0a;\n  font-size: 12px;\n  font-weight: 500;\n"])));
var PlaygroundBottomWrapper = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: flex;\n  overflow: hidden;\n  background-color: #f5f5f5;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  overflow: hidden;\n  background-color: #f5f5f5;\n  justify-content: space-between;\n"])));
var OutputWrapper = styled_components_1.default.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  border-left: 4px solid #e5e5e5;\n  box-sizing: border-box;\n  width: 50%;\n\n  iframe {\n    width: 100%;\n    height: 100%;\n    border: none;\n  }\n"], ["\n  border-left: 4px solid #e5e5e5;\n  box-sizing: border-box;\n  width: 50%;\n\n  iframe {\n    width: 100%;\n    height: 100%;\n    border: none;\n  }\n"])));
var ButtonsWrapper = styled_components_1.default.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
var CompileButton = styled_components_1.default.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  font-size: 14px;\n  font-weight: 500;\n  color: #0a0a0a;\n  cursor: pointer;\n  padding: 10px 16px;\n  background-color: #98ffc9;\n  display: flex;\n  align-items: center;\n\n  svg {\n    padding-right: 6px;\n  }\n\n  &:hover {\n    background-color: #5bffa9;\n    box-shadow: 0px 0px 20px #05fe7c;\n    z-index: 1;\n  }\n\n  &:active {\n    background-color: #17fc84;\n  }\n"], ["\n  font-size: 14px;\n  font-weight: 500;\n  color: #0a0a0a;\n  cursor: pointer;\n  padding: 10px 16px;\n  background-color: #98ffc9;\n  display: flex;\n  align-items: center;\n\n  svg {\n    padding-right: 6px;\n  }\n\n  &:hover {\n    background-color: #5bffa9;\n    box-shadow: 0px 0px 20px #05fe7c;\n    z-index: 1;\n  }\n\n  &:active {\n    background-color: #17fc84;\n  }\n"])));
var PlaygroundInfo = styled_components_1.default.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  font-size: 12px;\n  font-weight: 500;\n  color: #0a0a0a;\n  padding: 10px 16px;\n"], ["\n  font-size: 12px;\n  font-weight: 500;\n  color: #0a0a0a;\n  padding: 10px 16px;\n"])));
var PlaygroundInfoTitle = styled_components_1.default.div(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n\n  svg {\n    padding-right: 6px;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n\n  svg {\n    padding-right: 6px;\n  }\n"])));
var PlaygroundGithub = styled_components_1.default.a(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  text-decoration: none;\n  color: #929292;\n\n  &:hover {\n    color: #3c3a3a;\n  }\n"], ["\n  text-decoration: none;\n  color: #929292;\n\n  &:hover {\n    color: #3c3a3a;\n  }\n"])));
var Error = styled_components_1.default.div(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  margin: 10px;\n  color: red;\n  border: 1px solid red;\n  background-color: #ffe2e2;\n  padding: 12px;\n"], ["\n  margin: 10px;\n  color: red;\n  border: 1px solid red;\n  background-color: #ffe2e2;\n  padding: 12px;\n"])));
exports.Playground = function (_a) {
    var width = _a.width, height = _a.height, code = _a.code;
    var _b = react_1.useState({ code: code }), source = _b[0], setSource = _b[1];
    var _c = react_1.useState({ code: '' }), compiled = _c[0], setCompiled = _c[1];
    var _d = react_1.useState(null), error = _d[0], setError = _d[1];
    var sourceEditor = react_1.useRef(null);
    var handleCompileButtonClick = function () {
        if (sourceEditor) {
            setSource({ code: sourceEditor.current.getValue() });
        }
    };
    react_1.useEffect(function () {
        setError(null);
        try {
            var tokens = m3k_1.default.tokenize(source.code);
            var ast = m3k_1.default.parse(tokens);
            var transformedAST = m3k_1.default.transform(ast);
            var code_1 = m3k_1.default.generate(transformedAST);
            setCompiled({ code: js_beautify_1.default(code_1, { indent_size: 2, space_in_empty_paren: true }) });
        }
        catch (e) {
            setError(e);
        }
    }, [source]);
    react_1.useEffect(function () {
        var evalCode = "\n      const __document = document.getElementById('m3k-playground-output').contentWindow.document;\n      __document.body.innerHTML = '';\n      " + compiled.code.split('document').join('__document') + "\n      ";
        try {
            // eslint-disable-next-line
            eval(evalCode);
        }
        catch (e) {
            setError(e);
        }
    }, [compiled]);
    return (react_1.default.createElement(PlaygroundWrapper, { width: width },
        react_1.default.createElement(PlaygroundBodyWrapper, null,
            react_1.default.createElement(PlaygroundEditorSections, null,
                react_1.default.createElement(PlaygroundEditorSectionWrapper, { height: height },
                    react_1.default.createElement(PlaygroundEditorSectionTitle, null, "Source"),
                    react_1.default.createElement(EditorWrapper, { style: { borderBottom: '4px solid #e5e5e5' } },
                        react_1.default.createElement(Editor_1.Editor, { width: "100%", height: "100%", code: source.code, onMount: function (editor) {
                                sourceEditor.current = editor;
                            } }))),
                react_1.default.createElement(PlaygroundEditorSectionWrapper, { height: height },
                    react_1.default.createElement(PlaygroundEditorSectionTitle, null, "Compiled JavaScript"),
                    react_1.default.createElement(EditorWrapper, null,
                        react_1.default.createElement(Editor_1.Editor, { width: "100%", height: "100%", code: compiled.code, readOnly: true })))),
            react_1.default.createElement(OutputWrapper, null, error ? (react_1.default.createElement(Error, null,
                error.name,
                ": ",
                error.message)) : (react_1.default.createElement("iframe", { id: "m3k-playground-output", title: "m3k playground" })))),
        react_1.default.createElement(PlaygroundBottomWrapper, null,
            react_1.default.createElement(ButtonsWrapper, null,
                react_1.default.createElement(CompileButton, { onClick: handleCompileButtonClick },
                    react_1.default.createElement(fi_1.FiPlay, null),
                    "Compile & Run")),
            react_1.default.createElement(PlaygroundInfo, null,
                react_1.default.createElement(PlaygroundInfoTitle, null,
                    react_1.default.createElement(fi_1.FiBox, null),
                    "m3k playground"),
                react_1.default.createElement(PlaygroundGithub, { href: "https://github.com/obsfx/m3k", target: "_blank" }, "github.com/obsfx/m3k")))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14;
