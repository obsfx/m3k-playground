"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = __importDefault(require("@monaco-editor/react"));
require("typeface-ubuntu-mono");
exports.Editor = function (_a) {
    var width = _a.width, height = _a.height, code = _a.code, onMount = _a.onMount, readOnly = _a.readOnly;
    return (react_1.default.createElement(react_2.default, { width: width, height: height, theme: "light", defaultLanguage: "scheme", value: code, options: {
            fontSize: 14,
            fontFamily: 'Ubuntu Mono',
            minimap: {
                enabled: false,
            },
            readOnly: readOnly,
        }, onMount: onMount }));
};
