import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
*,
*::after,
*::before {
    box-sizing: border-box;
}

html,
body {
    height: 100%;
}

html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
}

body {
    font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Open Sans', sans-serif;
    margin: 0px;
    background-color: rgb(31, 32, 40);
    color: rgb(191, 195, 217);
    font-size: 17px;
    -webkit-tap-highlight-color: transparent;
}

@media (min-width: 768px) {
    body {
        font-size: 18px;
    }
}

p,
li {
    line-height: 1.6;
}

a:hover {
    text-decoration: underline;
}

a {
    color: rgb(124, 187, 255);
    text-decoration: none;
}

hr {
    border-right: none;
    border-bottom: none;
    border-left: none;
    border-image: initial;
    border-top: 1px solid rgba(0, 16, 64, 0.15);
    margin: 50px 0px;
    height: 0;
    overflow: visible;
}

.prismjs {
    white-space: pre;
    color: rgb(191, 195, 217);
    text-shadow: rgb(0 0 0 / 30%) 0px 1px;
    line-height: 2;
	display: inline-block;
	min-width: 100%;
	overflow: hidden;
}

.token.function.maybe-class-name,
.token.function {
    color: #65bcff;
}

.token.tag.attr-value,
.token.inserted-sign.inserted,
.token.string {
    color: #c3e88d;
}

.token.punctuation,
.token.tag.punctuation,
.token.imports.punctuation {
    color: #86e1fc;
}

.token.deleted-sign.deleted,
.token.tag {
    color: #ff757f;
}

.token.keyword,
.token.keyword.control-flow,
.token.tag.attr-name,
.token.operator {
    color: #c099ff;
}

.token.maybe-class-name,
.token.class-name,
.token.imports {
    color: #ffc777;
}

.token.boolean,
.token.number {
    color: #ff966c;
}

.token.comment {
    color: #7a88cf;
}

.token.builtin,
.token.regex,
.token.script.language-javascript.literal-property.property {
    color: #4fd6be;
}
`;
