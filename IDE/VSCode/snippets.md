# Snippets

Snippets can be added by opening your command dropdown (Ctrl + Shft + P on Windows) and entering "Configure User Snippets".
Snippets are specific to languages.

## Typescript

```Javascript
{
    "Unios Typescript React component": {
        "prefix": "react",
        "body": [
            "/** @jsxImportSource theme-ui */",
            "import React from 'react'",
            "import { ThemeUICSSObject } from '@theme-ui/css';",
            "import { Box, Flex, Text, Heading, Paragraph } from '@theme-ui/components';",
            "import Image from 'next/image';",
            "",
            "type $1Props = {",
            "     /** Children content */",
            "     children?: React.ReactNode;",
            "     /** Optional style override */",
            "     style?: ThemeUICSSObject;",
            "}",
            "",
            "const ${1:element}Style: ThemeUICSSObject = {",
            "    ",
            "};",
            "",
            "export const $1 = ({ children, style }: $1Props): JSX.Element => {",
                "\treturn (",
                    "\t\t<div sx={{...${1:element}Style, ...style}}>",
                        "\t\t\t{children}",
                    "\t\t</div>",
                "\t)",
            "}",
            "",
            "$1.defaultProps = {",
            "    ",
            "};",
            "",
            "$1.displayName = '$1'"
        ],
        "description": "Typescript React Component with named export"
    },
    "Unios Typescript React component (propless)": {
        "prefix": "react simple",
        "body": [
            "/** @jsxImportSource theme-ui */",
            "import React from 'react'",
            "import { ThemeUICSSObject } from '@theme-ui/css';",
            "import { Box, Flex, Text, Heading, Paragraph } from '@theme-ui/components';",
            "import Image from 'next/image';",
            "",
            "const ${1:element}Style: ThemeUICSSObject = {",
            "    ",
            "};",
            "",
            "export const $1 = (): JSX.Element => {",
                "\treturn (",
                    "\t\t<div sx={${1:element}Style}>",
                        "\t\t\t",
                    "\t\t</div>",
                "\t)",
            "}",
            "",
            "$1.displayName = '$1'"
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
          "    children: '$1 example',",
          "};"
        ],
        "description": "Storybook story"
      },

      "Theme UI Style": {
        "prefix": "themeStyle",
        "body": [
          "const ${1:element}Style: ThemeUICSSObject = {",
          "    ",
          "};"
        ],
        "description": "Theme UI style object"
      },

      "Animation Variants": {
        "prefix": "variants",
        "body": [
          "const variants = {${1:default}: {$3}, ${2:active}: {$3}};",
        ],
        "description": "Variants animation object"
      },

      "Configurator Context": {
        "prefix": "configcontext",
        "body": [
          "const configurator = useContext(ConfiguratorContext);",
        ],
        "description": "Configurator Context"
      },

      "Modal Context": {
        "prefix": "modalcontext",
        "body": [
          "const modal = useContext(ModalContext);",
          "const { setModalContent } = modal;"
        ],
        "description": "Modal Context"
      },

      "On Key Press": {
        "prefix": "keypresshandler",
        "body": [
            "const ${1:key}Pressed = useKeyPress(elementRef, '${2:key}');",
            "",
            "useEffect(() => {",
            "    if (${1:key}Pressed) {",
            "        //Do things",
            "    }",
            "}, [${1:key}Pressed]);",
        ],
        "description": "On Key Press handler"
      },

      "UseEffect Logger": {
        "prefix": "logger",
        "body": [
            "useEffect(() => {",
            "    console.log(`${1:value}`, ${1:value});",
            "}, [${1:value}]);"
        ],
        "description": "UseEffect logger for tracking value changes. Dev purposes only"
      },

      "React Hook Form": {
        "prefix": "react hook form",
        "body": [
            "const {",
            "    register,",
            "    handleSubmit,",
            "   formState: { errors },",
            "} = useForm();",
            "",
            "const onSubmit = (data) => {",
            "    console.log(data);",
            "};",
            "",
           	"/*",
            "return (",
            "    <form onSubmit={handleSubmit(onSubmit)}>",
            "        <Input",
            "            id=\"first-name\"",
            "            label=\"first Name\"",
            "            {...register('firstName', {",
            "                required: { value: true, message: 'required' },",
            "                maxLength: { value: 5, message: 'too long' },",
            "            })}",
            "        />",
            "        <FormValidationError error={errors.firstName} />",
            "        <Button type=\"submit\">",
            "            Submit",
            "        </Button>",
            "    </form>",
            ")",
            "*/",
        ],
        "description": "React hook form state"
      },
      "Register Form Input Prop": {
        "prefix": "registerinput",
        "body": [
            "{...register('${1:inputname}', {",
			"    required: { value: true, message: '${2:input label} is required' },",
			"})}"
        ],
        "description": "Prop for input components to register them in a react hook form"
      },




}



```
