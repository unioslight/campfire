# Snippets

Snippets can be added by opening your command dropdown (Ctrl + Shft + P on Windows) and entering "Configure User Snippets".
Snippets are specific to languages.

## Typescript

```Javascript
{
	{
	"Unios Typescript React component": {
		"prefix": "react",
		"body": [
			"/** @jsxImportSource theme-ui */",
			"import React from 'react'",
			"import { ThemeUICSSObject } from '@theme-ui/css';",
			"",
			"type $1Props = {",
			"     /**",
	  "     * Children content",
	  "     */",
	  "     children: React.ReactNode;",
			"}",
			"",
			"let ${1:element}Style: ThemeUICSSObject = {",
			"    ",
			"};",
			"",
			"export const $1: React.FC<$1Props> = (props) => {",
				"\treturn (",
					"\t\t<div sx={${1:element}Style}>",
						"\t\t\t",
					"\t\t</div>",
				"\t)",
			"}",
			"",
			"$1.defaultProps = {",
			"    ",
			"};"
		],
		"description": "Typescript React Component with named export"
	},
	"Storybook story": {
		"prefix": "story",
		"body": [
		  "import React from 'react';",
		  "",
		  "export default {",
		  "    title: 'Core/$1',",
		  "    component: ${1:Text},",
		  "};",
		  "",
		  "const Template = (args) => <$1{...args} />;",
		  "",
		  "export const Default = Template.bind({});",
		  "Default.args = {",
		  "    children: 'Typography example',",
		  "};"
		],
		"description": "Storybook story"
	  },

	  "Theme UI Style": {
		"prefix": "themeStyle",
		"body": [
		  "let ${1:element}Style: ThemeUICSSObject = {",
		  "    ",
		  "};"
		],
		"description": "Theme UI style object"
	  }
}
```
