# Snippets

Snippets can be added by opening your command dropdown (Ctrl + Shft + P on Windows) and entering "Configure User Snippets".
Snippets are specific to languages.

## Typescript

```Javascript
{
	// Place your snippets for typescriptreact here. Each snippet is defined under a snippet name and has a prefix, body and
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
	// same ids are connected.
	// Example:
	// "Print to console": {
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }

	"Unios Typescript React component": {
		"prefix": "unreact",
		"body": [
			"import React from 'react'",
			"",
			"type $1Props = {",
			"     /**",
	  "     * Children content",
	  "     */",
	  "     children: React.ReactNode;",
			"}",
			"",
			"export const $1 = (props: $1Props) => {",
				"\treturn (",
					"\t\t<div>",
						"\t\t\t",
					"\t\t</div>",
				"\t)",
			"}",
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
	  }
}


"Storybook story": {
	"prefix": "story",
	"body": [
	  "     /**",
	  "     * Children content",
	  "     */",
	  "     children: React.ReactNode;"
	],
	"description": "Storybook story"
  }
```
